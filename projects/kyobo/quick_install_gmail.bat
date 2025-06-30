@echo off
echo 📧 교보문고 Gmail 알림 빠른 설치

REM Y: 드라이브로 이동
Y:
cd \1kyobo\docker

REM 백업 폴더 생성
mkdir backup_%date:~0,4%%date:~5,2%%date:~8,2%

REM 기존 스크립트 백업
if exist send_email_notification.sh (
    copy send_email_notification.sh backup_%date:~0,4%%date:~5,2%%date:~8,2%\
    echo ✅ 기존 스크립트 백업 완료
)

REM 새 스크립트 복사
copy "C:\88ERP-Fresh\send_gmail_notification.py" .
echo ✅ Python 스크립트 복사 완료

REM 설정 파일 생성
echo # Gmail 설정 파일 > email_config.env
echo GMAIL_USER=your-gmail@gmail.com >> email_config.env
echo GMAIL_PASSWORD=your-16-digit-app-password >> email_config.env
echo RECIPIENT_EMAIL=ann.88toy@gmail.com >> email_config.env
echo ✅ 설정 파일 생성 완료

REM 새 래퍼 스크립트 생성
echo #!/bin/bash > send_email_notification.sh
echo source "$(dirname "$0")/email_config.env" >> send_email_notification.sh
echo STATUS=${1:-SUCCESS} >> send_email_notification.sh
echo TIMESTAMP=${2:-$(date '+%%Y-%%m-%%d %%H:%%M:%%S')} >> send_email_notification.sh
echo python3 "$(dirname "$0")/send_gmail_notification.py" --status "$STATUS" --timestamp "$TIMESTAMP" --recipient "$RECIPIENT_EMAIL" --sender "$GMAIL_USER" --password "$GMAIL_PASSWORD" >> send_email_notification.sh

echo ✅ 설치 완료!
echo.
echo 📋 다음 작업:
echo 1. email_config.env 파일 편집
echo 2. Gmail 정보 입력
echo 3. 테스트: python3 send_gmail_notification.py --status SUCCESS --recipient ann.88toy@gmail.com --sender your-gmail@gmail.com --password your-app-password
pause