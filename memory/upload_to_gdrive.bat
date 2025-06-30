@echo off
chcp 65001 > nul
title Google Drive Upload Tool
echo.
echo ==========================================
echo     Google Drive Upload Tool
echo ==========================================
echo.

cd /d "C:\88ERP-Fresh\memory"

echo Uploading latest file to Google Drive...
echo.

python upload_to_gdrive.py

echo.
echo ==========================================
echo Done! Press any key to close...
echo ==========================================
pause > nul