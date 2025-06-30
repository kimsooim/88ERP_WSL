@echo off
echo 📧 교보문고 send_email_notification.sh 교체

REM Y: 드라이브로 이동
Y:
cd \1kyobo\docker

echo 📁 현재 위치: %CD%

REM 기존 파일 백업
if exist "send_email_notification.sh" (
    copy "send_email_notification.sh" "send_email_notification.sh.backup_%date:~0,4%%date:~5,2%%date:~8,2%"
    echo ✅ 기존 send_email_notification.sh 백업 완료
)

REM 새 Gmail 버전으로 교체
copy "C:\88ERP-Fresh\new_send_email_notification.sh" "send_email_notification.sh"
echo ✅ Gmail 버전으로 교체 완료

REM 실행 권한 설정
wsl chmod +x /mnt/y/1kyobo/docker/send_email_notification.sh

echo.
echo ✅ 교체 완료!
echo 🧪 테스트 방법:
echo   Y:\1kyobo\docker\send_email_notification.sh "테스트 메시지"
echo.
echo 🚀 교보문고 자동화 실행:
echo   Y:\1kyobo\docker\run_kyobo_automation.sh
echo.
pause