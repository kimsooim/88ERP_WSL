#!/bin/bash

MESSAGE="$1"
EMAIL="ann.88toy@gmail.com"

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

# 이메일 전송
echo "$BODY" | mail -s "$SUBJECT" "$EMAIL"

echo "이메일 알림 전송 완료: $MESSAGE → $EMAIL"
