#!/bin/bash
# 운영서버에서 실행할 자동 배포 체크 스크립트

set -e

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

DEPLOY_DIR="/home/server/SERVER"
DEPLOY_FLAG_FILE="$DEPLOY_DIR/.deploy_now"

echo -e "${YELLOW}🔍 배포 확인 중...${NC}"

cd $DEPLOY_DIR

# GitHub에서 최신 커밋 확인
git fetch origin main

LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    echo -e "${GREEN}✨ 새로운 배포 발견!${NC}"
    echo -e "${YELLOW}📥 코드 업데이트 중...${NC}"
    
    # 코드 업데이트
    git pull origin main
    
    # Docker 재시작
    echo -e "${YELLOW}🐳 Docker 서비스 재시작 중...${NC}"
    docker-compose down
    docker-compose up -d --build
    
    echo -e "${GREEN}✅ 배포 완료!${NC}"
    echo "배포 시간: $(date)" > $DEPLOY_FLAG_FILE
else
    echo -e "${YELLOW}📌 변경사항 없음${NC}"
fi