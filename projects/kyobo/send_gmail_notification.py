#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
교보문고 자동화 Gmail 이메일 알림 스크립트
기존 mail 명령어를 대체하여 Gmail SMTP를 통한 이메일 전송
"""

import smtplib
import sys
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import argparse

# Gmail SMTP 설정
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def send_gmail_notification(sender_email, sender_password, recipient_email, 
                          subject, message, attachment_path=None):
    """
    Gmail SMTP를 통한 이메일 전송 함수
    
    Args:
        sender_email (str): 발신자 Gmail 주소
        sender_password (str): Gmail 앱 패스워드
        recipient_email (str): 수신자 이메일 주소
        subject (str): 이메일 제목
        message (str): 이메일 내용
        attachment_path (str, optional): 첨부파일 경로
    
    Returns:
        bool: 전송 성공 여부
    """
    try:
        # 이메일 메시지 생성
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        
        # 이메일 본문 추가
        msg.attach(MIMEText(message, 'plain', 'utf-8'))
        
        # 첨부파일이 있는 경우
        if attachment_path and os.path.exists(attachment_path):
            with open(attachment_path, "rb") as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
            
            encoders.encode_base64(part)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename= {os.path.basename(attachment_path)}'
            )
            msg.attach(part)
        
        # Gmail SMTP 서버 연결 및 전송
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # TLS 암호화 시작
        server.login(sender_email, sender_password)
        
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        print(f"✅ 이메일 전송 성공: {recipient_email}")
        return True
        
    except Exception as e:
        print(f"❌ 이메일 전송 실패: {str(e)}")
        return False

def create_kyobo_notification_message(status, timestamp, log_path=None, output_path=None):
    """
    교보문고 자동화 상태에 맞는 이메일 메시지 생성
    
    Args:
        status (str): 실행 상태 (SUCCESS, ERROR, WARNING)
        timestamp (str): 실행 시간
        log_path (str, optional): 로그 파일 경로
        output_path (str, optional): 결과 파일 경로
    
    Returns:
        str: 이메일 메시지 내용
    """
    
    status_emoji = {
        'SUCCESS': '✅',
        'ERROR': '❌', 
        'WARNING': '⚠️'
    }
    
    message = f"""
📊 교보문고 자동화 실행 결과 알림

{status_emoji.get(status, '📋')} 상태: {status}
⏰ 실행 시간: {timestamp}
🖥️ 시스템: Docker 컨테이너 (kyobo-1750809602)

📁 파일 위치:
- 로그: Y:\\1kyobo\\docker\\logs\\
- 결과: Y:\\1kyobo\\docker\\output\\

"""
    
    if status == 'SUCCESS':
        message += """
🎉 교보문고 데이터 처리가 성공적으로 완료되었습니다.
📈 결과 파일을 확인해주세요.
"""
    elif status == 'ERROR':
        message += """
🚨 교보문고 자동화 실행 중 오류가 발생했습니다.
📋 로그 파일을 확인하여 문제를 해결해주세요.
"""
    elif status == 'WARNING':
        message += """
⚠️ 교보문고 자동화가 완료되었으나 주의사항이 있습니다.
📋 로그 파일을 확인해주세요.
"""
    
    message += f"""

--
88ERP 교보문고 자동화 시스템
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    
    return message

def main():
    """메인 함수 - 명령행 인자 처리"""
    parser = argparse.ArgumentParser(description='교보문고 자동화 Gmail 알림')
    parser.add_argument('--status', required=True, choices=['SUCCESS', 'ERROR', 'WARNING'],
                        help='실행 상태')
    parser.add_argument('--timestamp', default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        help='실행 시간')
    parser.add_argument('--recipient', required=True,
                        help='수신자 이메일 주소')
    parser.add_argument('--sender', default='your-gmail@gmail.com',
                        help='발신자 Gmail 주소')
    parser.add_argument('--password', required=True,
                        help='Gmail 앱 패스워드')
    parser.add_argument('--attachment',
                        help='첨부파일 경로 (선택사항)')
    
    args = parser.parse_args()
    
    # 이메일 제목 생성
    subject = f"[88ERP] 교보문고 자동화 {args.status} - {args.timestamp}"
    
    # 이메일 메시지 생성
    message = create_kyobo_notification_message(
        status=args.status,
        timestamp=args.timestamp
    )
    
    # 이메일 전송
    success = send_gmail_notification(
        sender_email=args.sender,
        sender_password=args.password,
        recipient_email=args.recipient,
        subject=subject,
        message=message,
        attachment_path=args.attachment
    )
    
    # 결과에 따른 종료 코드
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    # 환경변수에서 설정 읽기 (선택사항)
    GMAIL_USER = os.getenv('GMAIL_USER', 'your-gmail@gmail.com')
    GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD', '')
    RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', 'ann.88toy@gmail.com')
    
    # 직접 실행 시 테스트
    if len(sys.argv) == 1:
        print("📧 교보문고 Gmail 알림 스크립트 테스트")
        print("\n사용법:")
        print("python send_gmail_notification.py --status SUCCESS --recipient ann.88toy@gmail.com --password YOUR_APP_PASSWORD")
        print("\n환경변수 설정 예시:")
        print("export GMAIL_USER='your-gmail@gmail.com'")
        print("export GMAIL_PASSWORD='your-app-password'")
        print("export RECIPIENT_EMAIL='ann.88toy@gmail.com'")
        
        # 간단한 테스트 메시지
        if GMAIL_PASSWORD:
            test_message = create_kyobo_notification_message('SUCCESS', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            print("\n📧 테스트 이메일 전송 중...")
            send_gmail_notification(
                sender_email=GMAIL_USER,
                sender_password=GMAIL_PASSWORD,
                recipient_email=RECIPIENT_EMAIL,
                subject="[TEST] 교보문고 Gmail 알림 테스트",
                message=test_message
            )
    else:
        main()