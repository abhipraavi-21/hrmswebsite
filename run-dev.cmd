@echo off
setlocal
cd /d "%~dp0"

echo Starting HRMS dev server on http://localhost:8080/
echo Logs will be written to dev-server.out.log and dev-server.err.log.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0run-dev.ps1"
