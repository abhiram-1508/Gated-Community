param(
  [switch]$SkipInstall,
  [switch]$SkipSeed
)

$ErrorActionPreference = "Stop"

$sampleDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $sampleDir
$clientDir = Join-Path $rootDir "client"
$sampleDb = "smart_community_sample"
$mongoUri = "mongodb://localhost:27017/$sampleDb"
$localMongoData = Join-Path $sampleDir "mongo-data"
$localMongoLogDir = Join-Path $sampleDir "mongo-log"
$localMongoLog = Join-Path $localMongoLogDir "mongod.log"

function Test-PortOpen {
  param(
    [string]$HostName,
    [int]$Port
  )

  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $connect = $client.BeginConnect($HostName, $Port, $null, $null)
    $connected = $connect.AsyncWaitHandle.WaitOne(1000, $false)
    if ($connected) {
      $client.EndConnect($connect)
      $client.Close()
      return $true
    }
    $client.Close()
  } catch {
    return $false
  }

  return $false
}

function Wait-ForPort {
  param(
    [string]$HostName,
    [int]$Port,
    [int]$TimeoutSeconds = 20
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  while ((Get-Date) -lt $deadline) {
    if (Test-PortOpen -HostName $HostName -Port $Port) {
      return $true
    }
    Start-Sleep -Seconds 1
  }

  return $false
}

function Ensure-MongoDb {
  if (Test-PortOpen -HostName "127.0.0.1" -Port 27017) {
    Write-Host "MongoDB is already running." -ForegroundColor Green
    return
  }

  $mongodExe = Get-ChildItem -Path "C:\Program Files\MongoDB" -Recurse -Filter mongod.exe -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName

  $mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
  if ($mongoService) {
    Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
    try {
      Start-Service -Name "MongoDB"
    } catch {
      Write-Host ""
      Write-Host "MongoDB needs Administrator permission to start." -ForegroundColor Yellow
      Write-Host "Approve the Windows prompt if it appears." -ForegroundColor Yellow
      try {
        Start-Process powershell -Verb RunAs -Wait -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "Start-Service -Name MongoDB"
      } catch {
        Write-Host "Could not open the Administrator prompt for MongoDB." -ForegroundColor Red
      }
    }

    if (Wait-ForPort -HostName "127.0.0.1" -Port 27017 -TimeoutSeconds 30) {
      Write-Host "MongoDB service started." -ForegroundColor Green
      return
    }
  }

  if ($mongodExe) {
    Write-Host "Starting local demo MongoDB process..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $localMongoData | Out-Null
    New-Item -ItemType Directory -Force -Path $localMongoLogDir | Out-Null

    Start-Process -FilePath $mongodExe -ArgumentList @(
      "--dbpath", "`"$localMongoData`"",
      "--logpath", "`"$localMongoLog`"",
      "--logappend",
      "--bind_ip", "127.0.0.1",
      "--port", "27017"
    ) -WindowStyle Minimized

    if (Wait-ForPort -HostName "127.0.0.1" -Port 27017 -TimeoutSeconds 30) {
      Write-Host "Local demo MongoDB started." -ForegroundColor Green
      return
    }
  }

  Write-Host ""
  Write-Host "MongoDB is not running on localhost:27017." -ForegroundColor Red
  Write-Host "Install MongoDB Community Server or start your MongoDB service, then run .\Sample\demo.ps1 again." -ForegroundColor Yellow
  exit 1
}

Write-Host ""
Write-Host "Starting Smart Community demo mode" -ForegroundColor Cyan
Write-Host "Demo database: $sampleDb" -ForegroundColor DarkCyan
Write-Host ""

Ensure-MongoDb

if (-not $SkipInstall) {
  if (-not (Test-Path (Join-Path $rootDir "node_modules"))) {
    Write-Host "Installing backend packages..." -ForegroundColor Yellow
    Push-Location $rootDir
    npm install
    Pop-Location
  }

  if (-not (Test-Path (Join-Path $clientDir "node_modules"))) {
    Write-Host "Installing frontend packages..." -ForegroundColor Yellow
    Push-Location $clientDir
    npm install
    Pop-Location
  }
}

$env:MONGO_URI = $mongoUri
$env:CLIENT_URL = "http://localhost:3000"
$env:JWT_ACCESS_SECRET = "sample_access_secret_for_demo_only"
$env:JWT_REFRESH_SECRET = "sample_refresh_secret_for_demo_only"
$env:NODE_ENV = "development"
$env:PORT = "5000"

if (-not $SkipSeed) {
  Write-Host "Preparing duplicate sample data..." -ForegroundColor Yellow
  Push-Location $rootDir
  node ".\Sample\seed-sample.js"
  Pop-Location
}

$backendCommand = @"
`$env:MONGO_URI='$mongoUri'
`$env:CLIENT_URL='http://localhost:3000'
`$env:JWT_ACCESS_SECRET='sample_access_secret_for_demo_only'
`$env:JWT_REFRESH_SECRET='sample_refresh_secret_for_demo_only'
`$env:NODE_ENV='development'
`$env:PORT='5000'
Set-Location '$rootDir'
npm run dev
"@

$frontendCommand = @"
`$env:VITE_API_URL='/api/v1'
`$env:VITE_SOCKET_URL='http://localhost:5000'
Set-Location '$clientDir'
npm run dev
"@

Write-Host "Opening backend and frontend demo windows..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $backendCommand -WindowStyle Normal

Write-Host "Waiting for backend health check..." -ForegroundColor Yellow
$backendReady = $false
for ($i = 0; $i -lt 25; $i++) {
  try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing -TimeoutSec 2
    if ($response.StatusCode -eq 200) {
      $backendReady = $true
      break
    }
  } catch {
    Start-Sleep -Seconds 1
  }
}

if (-not $backendReady) {
  Write-Host ""
  Write-Host "Backend did not become ready on http://localhost:5000." -ForegroundColor Red
  Write-Host "Check the backend PowerShell window for the exact error." -ForegroundColor Yellow
  exit 1
}

Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $frontendCommand -WindowStyle Normal

Write-Host ""
Write-Host "Demo mode is ready." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Demo logins, password for all: password123" -ForegroundColor Cyan
Write-Host "  Admin:    admin.sample@smartcommunity.com"
Write-Host "  Resident: resident.sample@smartcommunity.com"
Write-Host "  Guard:    guard.sample@smartcommunity.com"
Write-Host "  Staff:    staff.sample@smartcommunity.com"
Write-Host ""
Write-Host "For real synced data, close these demo windows and run .\start-project.ps1" -ForegroundColor DarkGray
