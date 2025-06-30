#!/bin/bash
# 교보문고 Gmail 알림 의존성 설치 스크립트

echo "📦 Python 이메일 의존성 설치 중..."

# Python 패키지 설치
pip3 install --upgrade pip
pip3 install secure-smtplib

echo "✅ 의존성 설치 완료"

# 스크립트 실행 권한 부여
chmod +x send_gmail_notification.py

echo "🔧 실행 권한 설정 완료"

# 테스트 스크립트 생성
cat > test_email.sh << 'EOF'
#!/bin/bash
# 교보문고 Gmail 알림 테스트 스크립트

echo "📧 Gmail 알림 테스트 시작..."

# 환경변수 설정 (실제 값으로 변경 필요)
export GMAIL_USER="your-gmail@gmail.com"
export GMAIL_PASSWORD="your-app-password"  
export RECIPIENT_EMAIL="ann.88toy@gmail.com"

# 테스트 실행
python3 send_gmail_notification.py \
    --status SUCCESS \
    --timestamp "$(date '+%Y-%m-%d %H:%M:%S')" \
    --recipient "$RECIPIENT_EMAIL" \
    --sender "$GMAIL_USER" \
    --password "$GMAIL_PASSWORD"

echo "📧 테스트 완료"
EOF

chmod +x test_email.sh

echo "🧪 테스트 스크립트 생성 완료: test_email.sh"

# 기존 스크립트 백업 및 교체 가이드 출력
echo ""
echo "📋 다음 단계:"
echo "1. Gmail 앱 패스워드 생성"
echo "2. send_email_notification.sh 백업"
echo "3. 새 Python 스크립트로 교체"
echo "4. 환경변수 설정"
echo "5. 테스트 실행"