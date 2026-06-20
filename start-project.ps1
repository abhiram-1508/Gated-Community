param(
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$client = Join-Path $root "client"

Write-Host "Smart Community Management System" -ForegroundColor Cyan
Write-Host "Project root: $root"

if (-not $SkipInstall) {
  Write-Host "`nChecking backend dependencies..." -ForegroundColor Yellow
  if (-not (Test-Path (Join-Path $root "node_modules"))) {
    Write-Host "Installing backend dependencies..."
    Push-Location $root
    npm install
    Pop-Location
  } else {
    Write-Host "Backend dependencies already installed." -ForegroundColor Green
  }

  Write-Host "`nChecking frontend dependencies..." -ForegroundColor Yellow
  if (-not (Test-Path (Join-Path $client "node_modules"))) {
    Write-Host "Installing frontend dependencies..."
    Push-Location $client
    npm install
    Pop-Location
  } else {
    Write-Host "Frontend dependencies already installed." -ForegroundColor Green
  }
}

Write-Host "`nStarting backend and frontend..." -ForegroundColor Yellow

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-ExecutionPolicy", "Bypass",
  "-Command",
  "cd `"$root`"; npm run dev"
)

Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-ExecutionPolicy", "Bypass",
  "-Command",
  "cd `"$client`"; npm run dev"
)

Write-Host "`nBackend:  http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "`nIf PowerShell blocks scripts, run:" -ForegroundColor DarkGray
Write-Host "powershell -ExecutionPolicy Bypass -File .\start-project.ps1" -ForegroundColor DarkGray
