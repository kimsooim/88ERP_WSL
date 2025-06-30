#!/bin/bash
# 교보문고 자동화 실행 스크립트 (Gmail 알림 연동)

# 설정
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
OUTPUT_DIR="$SCRIPT_DIR/output"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$LOG_DIR/kyobo_automation_$(date +%Y%m%d).log"

# Gmail 설정 (test_gmail_now.py에서 확인된 정보)
GMAIL_USER="ann.88toy@gmail.com"
GMAIL_PASSWORD="vagriilpkveeugfo"
RECIPIENT_EMAIL="ann.88toy@gmail.com"

# 디렉토리 생성
mkdir -p "$LOG_DIR"
mkdir -p "$OUTPUT_DIR"

# 로그 시작
echo "[$TIMESTAMP] 교보문고 자동화 시작" | tee -a "$LOG_FILE"

# Gmail 알림 함수
send_gmail_notification() {
    local status="$1"
    local message="$2"
    local attachment="$3"
    
    python3 -c "
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os
from datetime import datetime

def send_email(status, custom_message='', attachment_path=None):
    sender = '$GMAIL_USER'
    password = '$GMAIL_PASSWORD'
    recipient = '$RECIPIENT_EMAIL'
    
    # 상태별 이모지
    status_emoji = {'SUCCESS': '✅', 'ERROR': '❌', 'WARNING': '⚠️'}
    
    # 이메일 제목 및 내용
    subject = f'[88ERP] 교보문고 자동화 {status} - $TIMESTAMP'
    
    email_body = f'''
📊 교보문고 자동화 실행 결과

{status_emoji.get(status, '📋')} 상태: {status}
⏰ 실행 시간: $TIMESTAMP
🖥️ 컨테이너: kyobo-1750809602
📁 로그 위치: $LOG_DIR
📁 결과 위치: $OUTPUT_DIR

{custom_message}

--
88ERP 교보문고 자동화 시스템
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
'''
    
    try:
        msg = MIMEMultipart()
        msg['From'] = sender
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        # 첨부파일 처리
        if attachment_path and os.path.exists(attachment_path):
            with open(attachment_path, 'rb') as f:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename= {os.path.basename(attachment_path)}')
            msg.attach(part)
        
        # Gmail SMTP 전송
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        
        print(f'✅ Gmail 알림 전송 성공: {status}')
        return True
        
    except Exception as e:
        print(f'❌ Gmail 알림 전송 실패: {e}')
        return False

# 함수 실행
send_email('$status', '$message', '$attachment')
"
}

# 시작 알림 전송
send_gmail_notification "WARNING" "🚀 교보문고 자동화가 시작되었습니다."

# 기존 교보문고 자동화 로직 실행
echo "[$TIMESTAMP] Docker 컨테이너 실행 중..." | tee -a "$LOG_FILE"

# Docker 컨테이너 실행 (기존 로직)
CONTAINER_NAME="kyobo-1750809602"

# 컨테이너가 이미 실행 중인지 확인
if docker ps | grep -q "$CONTAINER_NAME"; then
    echo "[$TIMESTAMP] 기존 컨테이너 정지 중..." | tee -a "$LOG_FILE"
    docker stop "$CONTAINER_NAME"
fi

# 새 컨테이너 실행
echo "[$TIMESTAMP] 새 컨테이너 실행 중..." | tee -a "$LOG_FILE"

# 교보문고 데이터 처리 실행 (실제 명령어로 교체 필요)
if docker run --name "$CONTAINER_NAME" --rm \
    -v "$OUTPUT_DIR:/app/output" \
    -v "$LOG_DIR:/app/logs" \
    kyobo-automation:latest; then
    
    # 성공 시
    SUCCESS_MESSAGE="🎉 교보문고 데이터 처리가 성공적으로 완료되었습니다.
📈 결과 파일을 확인해주세요."
    
    echo "[$TIMESTAMP] 자동화 성공 완료" | tee -a "$LOG_FILE"
    
    # 성공 알림 (결과 파일 첨부)
    RESULT_FILE="$OUTPUT_DIR/kyobo_result_$(date +%Y%m%d).csv"
    if [ -f "$RESULT_FILE" ]; then
        send_gmail_notification "SUCCESS" "$SUCCESS_MESSAGE" "$RESULT_FILE"
    else
        send_gmail_notification "SUCCESS" "$SUCCESS_MESSAGE"
    fi
    
else
    # 실패 시
    ERROR_MESSAGE="🚨 교보문고 자동화 실행 중 오류가 발생했습니다.
📋 로그 파일을 확인하여 문제를 해결해주세요.
📁 로그 위치: $LOG_FILE"
    
    echo "[$TIMESTAMP] 자동화 실행 실패" | tee -a "$LOG_FILE"
    
    # 실패 알림 (로그 파일 첨부)
    send_gmail_notification "ERROR" "$ERROR_MESSAGE" "$LOG_FILE"
fi

echo "[$TIMESTAMP] 교보문고 자동화 완료" | tee -a "$LOG_FILE"