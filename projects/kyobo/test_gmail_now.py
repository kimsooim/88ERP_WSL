#!/usr/bin/env python3
# 즉시 Gmail 테스트 스크립트

import smtplib
from email.mime.text import MIMEText
from datetime import datetime

def quick_test():
    print("📧 Gmail 즉시 테스트")
    print("=" * 50)
    
    # 발신자 정보 하드코딩
    sender = "ann.88toy@gmail.com"
    password = "vagriilpkveeugfo"
    recipient = "ann.88toy@gmail.com"
    
    # 테스트 메시지
    subject = "[TEST] 교보문고 Gmail 알림 테스트"
    message = f"""
📊 교보문고 자동화 테스트 메시지

✅ Gmail SMTP 연결 테스트 성공!
⏰ 테스트 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
🖥️ 시스템: 88ERP 교보문고 자동화

이 메시지가 수신되면 Gmail 설정이 완료된 것입니다.

--
88ERP Gmail 알림 시스템
"""
    
    try:
        # Gmail SMTP 전송
        msg = MIMEText(message, 'plain', 'utf-8')
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = recipient
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        
        print("✅ 테스트 이메일 전송 성공!")
        print(f"📧 {recipient}로 테스트 메일을 확인하세요.")
        
    except Exception as e:
        print(f"❌ 전송 실패: {e}")
        print("\n🔧 문제 해결:")
        print("1. Gmail 앱 패스워드가 정확한지 확인")
        print("2. 2단계 인증이 활성화되어 있는지 확인")
        print("3. 앱 패스워드 공백 제거 확인")

if __name__ == "__main__":
    quick_test()