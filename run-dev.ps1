$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

$port = 8080
$outLog = Join-Path $PSScriptRoot "dev-server.out.log"
$errLog = Join-Path $PSScriptRoot "dev-server.err.log"

$existing = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($existing) {
  Write-Host "HRMS dev server is already running on http://localhost:$port/"
  exit 0
}

if (Test-Path $outLog) {
  Remove-Item $outLog -Force
}

if (Test-Path $errLog) {
  Remove-Item $errLog -Force
}

Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "dev") -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -RedirectStandardOutput $outLog -RedirectStandardError $errLog | Out-Null

Start-Sleep -Seconds 2

$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  Write-Host "HRMS dev server started on http://localhost:$port/"
  Write-Host "If needed, check $outLog and $errLog for logs."
  exit 0
}

Write-Host "The server did not bind to port $port. Check $outLog and $errLog for details."
exit 1
