@echo off
title Sanjeevan Medical Centre - Production Preview
echo ========================================================
echo Serving Sanjeevan Medical Centre Website at http://localhost:3000
echo ========================================================
set "PATH=%~dp0tools\node;%PATH%"
call npm run preview -- --port 3000 --host
pause
