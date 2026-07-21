@echo off
setlocal
cd /d "%~dp0"

echo Starting HRMS dev server on http://localhost:8080/
echo If the browser does not open automatically, copy the URL above.

call npm.cmd run dev
