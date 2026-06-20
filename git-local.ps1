param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$GitArgs
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
& git --git-dir="$repoRoot\.git-work" --work-tree="$repoRoot" @GitArgs
