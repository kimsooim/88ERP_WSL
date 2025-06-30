@echo off
echo 📧 교보문고 send_email_notification.sh Gmail 버전으로 수정

REM Y: 드라이브로 이동
Y:
cd \1kyobo\docker

echo 📁 현재 위치: %CD%

REM 기존 파일 백업 (타임스탬프 포함)
if exist "send_email_notification.sh" (
    copy "send_email_notification.sh" "send_email_notification.sh.backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%"
    echo ✅ 기존 파일 백업 완료
)

REM 수정된 Gmail 버전으로 교체
copy "C:\88ERP-Fresh\modified_send_email_notification.sh" "send_email_notification.sh"
echo ✅ Gmail SMTP 버전으로 교체 완료

REM 실행 권한 설정
wsl chmod +x /mnt/y/1kyobo/docker/send_email_notification.sh
echo ✅ 실행 권한 설정 완료

echo.
echo 🧪 즉시 테스트:
bash send_email_notification.sh "📧 Gmail 연동 테스트 메시지"

echo.
echo ✅ 수정 완료!
echo 📋 변경사항:
echo   - mail 명령어 → Gmail SMTP Python 스크립트
echo   - 기존 메시지 형식 유지
echo   - ann.88toy@gmail.com 앱 패스워드 사용
echo.
echo 🚀 이제 교보문고 자동화 실행:
echo   bash run_kyobo_automation.sh
echo.
pause