@echo off
echo 📊 교보문고 자동화 테스트 실행

REM Y: 드라이브로 이동
Y:
cd \1kyobo\docker

echo 📁 현재 위치: %CD%
echo 📋 파일 목록:
dir *.sh

echo.
echo 🚀 교보문고 자동화 실행 중...
echo ⏰ 시작 시간: %date% %time%

REM 기존 자동화 스크립트 실행
bash run_kyobo_automation.sh

echo.
echo ✅ 실행 완료
echo ⏰ 완료 시간: %date% %time%
echo.
echo 📧 Gmail로 알림이 전송되었는지 확인해주세요!
pause