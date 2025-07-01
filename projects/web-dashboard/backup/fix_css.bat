@echo off
echo Fixing CSS issues...
echo.

echo 1. Clearing Next.js cache...
rmdir /s /q "\\wsl.localhost\Ubuntu\home\sp1\88ERP\projects\web-dashboard\.next" 2>nul

echo 2. Restarting server...
wsl bash -c "cd /home/sp1/88ERP/projects/web-dashboard && pkill -f 'next dev' || true"
timeout /t 2 >nul

echo 3. Starting fresh server...
wsl bash -c "cd /home/sp1/88ERP/projects/web-dashboard && npm run dev > dev.log 2>&1 &"

echo.
echo Done! Please refresh your browser with Ctrl+F5
echo.
timeout /t 5 >nul
start http://localhost:3000
pause