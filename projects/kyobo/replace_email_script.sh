#!/bin/bash
# 교보문고 기존 이메일 스크립트를 Gmail Python 스크립트로 교체

DOCKER_PATH="Y:/1kyobo/docker"
BACKUP_DIR="$DOCKER_PATH/backup_$(date +%Y%m%d_%H%M%S)"

echo "🔄 교보문고 이메일 스크립트 교체 시작..."

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR"

# 기존 스크립트 백업
if [ -f "$DOCKER_PATH/send_email_notification.sh" ]; then
    echo "📦 기존 스크립트 백업 중..."
    cp "$DOCKER_PATH/send_email_notification.sh" "$BACKUP_DIR/"
    echo "✅ 백업 완료: $BACKUP_DIR/send_email_notification.sh"
fi

# 새 Python 스크립트 복사
echo "📋 새 Gmail Python 스크립트 설치 중..."
cp send_gmail_notification.py "$DOCKER_PATH/"
chmod +x "$DOCKER_PATH/send_gmail_notification.py"

# 환경변수 설정 파일 생성
cat > "$DOCKER_PATH/email_config.env" << 'EOF'
# Gmail 설정 - 실제 값으로 변경 필요
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=ann.88toy@gmail.com

# 알림 설정
KYOBO_PROJECT_NAME=교보문고자동화
KYOBO_CONTAINER_NAME=kyobo-1750809602
EOF

# 새로운 이메일 전송 래퍼 스크립트 생성
cat > "$DOCKER_PATH/send_email_notification.sh" << 'EOF'
#!/bin/bash
# 교보문고 Gmail 알림 래퍼 스크립트 (Python 버전)

# 환경변수 로드
source "$(dirname "$0")/email_config.env"

# 기본값 설정
STATUS=${1:-SUCCESS}
TIMESTAMP=${2:-$(date '+%Y-%m-%d %H:%M:%S')}
ATTACHMENT=${3:-}

# Python Gmail 스크립트 실행
python3 "$(dirname "$0")/send_gmail_notification.py" \
    --status "$STATUS" \
    --timestamp "$TIMESTAMP" \
    --recipient "$RECIPIENT_EMAIL" \
    --sender "$GMAIL_USER" \
    --password "$GMAIL_PASSWORD" \
    ${ATTACHMENT:+--attachment "$ATTACHMENT"}

exit $?
EOF

chmod +x "$DOCKER_PATH/send_email_notification.sh"

echo "✅ 스크립트 교체 완료!"
echo ""
echo "📋 설정 파일 위치: $DOCKER_PATH/email_config.env"
echo "🔧 다음 단계:"
echo "1. $DOCKER_PATH/email_config.env 파일에서 Gmail 정보 수정"
echo "2. Gmail 앱 패스워드 설정"
echo "3. 테스트 실행: $DOCKER_PATH/send_email_notification.sh SUCCESS"
echo ""
echo "🧪 테스트 명령어:"
echo "cd $DOCKER_PATH"
echo "./send_email_notification.sh SUCCESS '$(date)'"