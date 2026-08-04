@echo off
setlocal
cd /d "%~dp0"

echo Starting HRMS frontend on http://localhost:8080/
echo Starting Blog API on http://localhost:3001/
echo Logs will be written to dev-server.out.log, dev-server.err.log, api-server.out.log, and api-server.err.log.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0run-dev.ps1"
