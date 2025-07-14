#!/bin/bash
# 전체 배포 프로세스 (동기화 + 배포)

set -e

echo "🚀 88ERP 전체 배포 프로세스 시작..."

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

# 1단계: 개발 서버 변경사항 커밋
echo -e "${YELLOW}[1/4]${NC} 개발 서버 변경사항 확인..."
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}❌ 커밋되지 않은 변경사항이 있습니다!${NC}"
    echo "변경사항을 먼저 커밋해주세요:"
    git status -s
    exit 1
fi

# 개발 서버 저장소에 푸시
echo -e "${YELLOW}[2/4]${NC} 개발 서버 저장소에 푸시..."
git push origin main

# 2단계: 운영 서버 저장소로 동기화
echo -e "${YELLOW}[3/4]${NC} 운영 서버 저장소로 코드 동기화..."
bash /home/sp1/88ERP/scripts/sync-to-prod-repo.sh

# 3단계: 운영 서버에 배포
echo -e "${YELLOW}[4/4]${NC} 운영 서버에 배포 시작..."

ssh server@183.102.56.171 << 'ENDSSH'
    set -e
    
    echo "📍 운영 서버 작업 시작..."
    
    # 배포 리시버 스크립트 실행
    if [ -f "/home/server/SERVER/scripts/deploy-receiver.sh" ]; then
        echo "🚀 배포 스크립트 실행..."
        /home/server/SERVER/scripts/deploy-receiver.sh
    else
        echo "❌ 배포 스크립트를 찾을 수 없습니다."
        echo "수동 배포를 진행합니다..."
        
        # 수동 배포
        cd /home/server/SERVER
        git pull origin main
        docker-compose down
        docker-compose up -d --build
    fi
    
    echo "🎉 배포 완료!"
ENDSSH

echo -e "${GREEN}✅ 전체 배포가 성공적으로 완료되었습니다!${NC}"
echo "🌐 접속 주소: https://db.88toy.co.kr"
echo "📝 로그 확인: ssh server@183.102.56.171 'cd /home/server/SERVER && docker-compose logs -f'"