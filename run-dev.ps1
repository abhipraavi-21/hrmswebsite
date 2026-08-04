$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

$frontendPort = 8080
$apiPort = 3001
$frontendOutLog = Join-Path $PSScriptRoot "dev-server.out.log"
$frontendErrLog = Join-Path $PSScriptRoot "dev-server.err.log"
$apiOutLog = Join-Path $PSScriptRoot "api-server.out.log"
$apiErrLog = Join-Path $PSScriptRoot "api-server.err.log"
$nodePath = (Get-Command node -ErrorAction Stop).Source
$viteEntry = Join-Path $PSScriptRoot "node_modules\\vite\\bin\\vite.js"
$apiEntry = Join-Path $PSScriptRoot "server\\index.js"

function Start-ManagedProcess {
  param(
    [int]$Port,
    [string]$FilePath,
    [string[]]$Arguments,
    [string]$OutLog,
    [string]$ErrLog,
    [string]$Label,
    [string]$Url
  )

  $existing = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  if ($existing) {
    Write-Host "$Label is already running on $Url"
    return
  }

  if (Test-Path $OutLog) {
    Remove-Item $OutLog -Force
  }

  if (Test-Path $ErrLog) {
    Remove-Item $ErrLog -Force
  }

  Start-Process -FilePath $FilePath -ArgumentList $Arguments -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -RedirectStandardOutput $OutLog -RedirectStandardError $ErrLog | Out-Null

  Start-Sleep -Seconds 2

  $listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  if ($listener) {
    Write-Host "$Label started on $Url"
    Write-Host "If needed, check $OutLog and $ErrLog for logs."
    return
  }

  Write-Host "$Label did not bind to port $Port. Check $OutLog and $ErrLog for details."
}

Start-ManagedProcess -Port $apiPort -FilePath $nodePath -Arguments @($apiEntry) -OutLog $apiOutLog -ErrLog $apiErrLog -Label "Blog API server" -Url "http://localhost:$apiPort/"
Start-ManagedProcess -Port $frontendPort -FilePath $nodePath -Arguments @($viteEntry, "dev", "--host", "127.0.0.1", "--port", "$frontendPort", "--strictPort") -OutLog $frontendOutLog -ErrLog $frontendErrLog -Label "HRMS frontend" -Url "http://localhost:$frontendPort/"
