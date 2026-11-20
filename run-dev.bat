@echo off
title Sanjeevan Medical Centre - Dev Server
echo ========================================================
echo Starting Sanjeevan Medical Centre Website (Vite + React)
echo ========================================================
set "PATH=%~dp0tools\node;%PATH%"
call npm run dev -- --host
pause
