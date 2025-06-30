@echo off
echo 📧 교보문고 Gmail 알림 설치 시작

REM Y: 드라이브 접근 확인
if not exist "Y:\1kyobo\docker" (
    echo ❌ Y:\1kyobo\docker 폴더에 접근할 수 없습니다.
    echo 네트워크 드라이브가 연결되었는지 확인해주세요.
    pause
    exit /b 1
)

REM Y: 드라이브로 이동
Y:
cd \1kyobo\docker

echo 📁 현재 위치: %CD%

REM 백업 폴더 생성
set BACKUP_DIR=backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%
mkdir "%BACKUP_DIR%"
echo ✅ 백업 폴더 생성: %BACKUP_DIR%

REM 기존 파일들 백업
if exist "run_kyobo_automation.sh" (
    copy "run_kyobo_automation.sh" "%BACKUP_DIR%\"
    echo ✅ 기존 run_kyobo_automation.sh 백업 완료
)

if exist "send_email_notification.sh" (
    copy "send_email_notification.sh" "%BACKUP_DIR%\"
    echo ✅ 기존 send_email_notification.sh 백업 완료
)

REM 새 파일들 복사
copy "C:\88ERP-Fresh\updated_run_kyobo_automation.sh" "run_kyobo_automation.sh"
copy "C:\88ERP-Fresh\send_gmail_notification.py" "send_gmail_notification.py"
echo ✅ 새 스크립트 복사 완료

REM 실행 권한 설정 (WSL에서)
wsl chmod +x /mnt/y/1kyobo/docker/run_kyobo_automation.sh
wsl chmod +x /mnt/y/1kyobo/docker/send_gmail_notification.py
echo ✅ 실행 권한 설정 완료

REM 테스트 실행
echo 🧪 Gmail 알림 테스트 실행 중...
python "C:\88ERP-Fresh\test_gmail_now.py"

echo.
echo ✅ 설치 완료!
echo 📋 설치된 파일:
echo   - run_kyobo_automation.sh (Gmail 알림 포함)
echo   - send_gmail_notification.py (Gmail 전송 스크립트)
echo.
echo 🧪 테스트 방법:
echo   wsl /mnt/y/1kyobo/docker/run_kyobo_automation.sh
echo.
echo 📅 crontab 설정 (매일 오전 9시):
echo   0 9 * * * /mnt/y/1kyobo/docker/run_kyobo_automation.sh
echo.
pause