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

ssh root@192.168.32.128 << 'ENDSSH'
    set -e
    
    echo "📍 운영 서버 작업 시작..."
    
    # 88ERP_server 저장소가 없으면 클론
    if [ ! -d "/root/88ERP" ]; then
        echo "📥 운영 서버 저장소 최초 설정..."
        cd /root
        git clone https://github.com/kimsooim/88ERP_server.git 88ERP
        cd 88ERP
        
        # 환경 변수 설정
        if [ ! -f ".env" ]; then
            cp .env.example .env
            echo "⚠️  .env 파일을 설정해주세요!"
        fi
    else
        # 기존 저장소 업데이트
        cd /root/88ERP
        echo "🔄 최신 코드 가져오는 중..."
        git pull origin main
    fi
    
    # Docker 컨테이너 재시작
    echo "🐳 Docker 컨테이너 재시작..."
    docker-compose down
    docker-compose up -d --build
    
    # 헬스체크
    echo "🏥 서비스 상태 확인..."
    sleep 15
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ 웹 대시보드 정상 동작!"
    else
        echo "❌ 웹 대시보드 응답 없음"
        docker-compose logs --tail 50
        exit 1
    fi
    
    # 최종 상태
    echo "📊 컨테이너 상태:"
    docker-compose ps
    
    echo "🎉 배포 완료!"
ENDSSH

echo -e "${GREEN}✅ 전체 배포가 성공적으로 완료되었습니다!${NC}"
echo "🌐 접속 주소: http://192.168.32.128:3000"
echo "📝 로그 확인: ssh root@192.168.32.128 'cd /root/88ERP && docker-compose logs -f'"