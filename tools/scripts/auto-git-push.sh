#!/bin/bash

# 파일 변경 감지하고 자동으로 Git push
echo "Git 자동 push 시작..."

while true; do
    # 변경사항 확인
    if [[ $(git status --porcelain) ]]; then
        echo "변경사항 발견! 커밋 중..."
        git add .
        git commit -m "Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"
        git push
        echo "Push 완료!"
    fi
    
    # 5분마다 체크
    sleep 300
done