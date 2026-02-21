@echo off
echo ========================================
echo Restarting BNPL Guardian Backend
echo ========================================
echo.
echo Stopping any existing Python processes...
taskkill /F /IM python.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Starting backend with new filtering logic...
echo.
start cmd /k "python app.py"
echo.
echo Backend started in new window!
echo Check the console for filtering logs.
echo.
pause
