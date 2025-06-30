#!/bin/bash
# Gmail SMTP를 사용한 이메일 알림 스크립트 (교보문고 자동화용)

MESSAGE="$1"
EMAIL="ann.88toy@gmail.com"
GMAIL_USER="ann.88toy@gmail.com"
GMAIL_PASSWORD="vagriilpkveeugfo"

if [ -z "$MESSAGE" ]; then
    MESSAGE="교보문고 자동화 알림"
fi

# 이메일 제목과 내용 설정
SUBJECT="🤖 나스자동화 알림"
BODY="📢 나스자동화 시스템 알림

$MESSAGE

📅 실행 시간: $(date +'%Y-%m-%d %H:%M:%S')
🖥️ 서버: ds920 (192.168.0.84)
📂 저장 위치: /volume1/2bot/1kyobo/input/

---
88TOY 나스자동화 시스템
교보문고 매출 데이터 자동 수집"

# Python Gmail 스크립트로 이메일 전송
python3 -c "
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

def send_gmail():
    sender = '$GMAIL_USER'
    password = '$GMAIL_PASSWORD'
    recipient = '$EMAIL'
    subject = '$SUBJECT'
    body = '''$BODY'''
    
    try:
        msg = MIMEText(body, 'plain', 'utf-8')
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = recipient
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        
        print('✅ Gmail 전송 성공')
        return True
        
    except Exception as e:
        print(f'❌ Gmail 전송 실패: {e}')
        return False

send_gmail()
"

echo "Gmail 알림 전송 완료: $MESSAGE → $EMAIL"