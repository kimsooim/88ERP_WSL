#!/bin/bash
# 88ERP 운영 서버 배포 스크립트
# 개발 서버(88ERP_WSL) → 운영 서버(88ERP_server) 배포

set -e  # 에러 발생시 중단

echo "🚀 88ERP 운영 서버 배포 시작..."

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# 서버 정보
PROD_HOST="192.168.32.128"
PROD_USER="root"
PROD_PATH="/root/88ERP"
PROD_REPO="https://github.com/kimsooim/88ERP_server.git"
DEV_REPO="https://github.com/kimsooim/88ERP_WSL.git"

# 1. 로컬 변경사항 확인
echo "📋 로컬 변경사항 확인중..."
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}❌ 커밋되지 않은 변경사항이 있습니다!${NC}"
    echo "먼저 변경사항을 커밋하고 푸시하세요."
    exit 1
fi

# 2. 최신 코드 푸시
echo "📤 GitHub에 최신 코드 푸시중..."
git push origin main

# 3. 운영 서버에 SSH로 배포
echo "🔄 운영 서버에 배포중..."
ssh ${PROD_USER}@${PROD_HOST} << 'ENDSSH'
    set -e
    
    echo "📍 운영 서버에서 작업 시작..."
    
    # 프로젝트 디렉토리로 이동
    cd /root/88ERP
    
    # 이전 백업 생성
    echo "💾 이전 버전 백업중..."
    docker-compose exec web-dashboard npm run build || true
    
    # 최신 코드 가져오기
    echo "🔽 최신 코드 다운로드중..."
    git pull origin main
    
    # Docker 이미지 재빌드 및 실행
    echo "🐳 Docker 컨테이너 재시작중..."
    docker-compose down
    docker-compose up -d --build
    
    # 서비스 상태 확인
    echo "🏥 헬스체크 진행중..."
    sleep 15
    
    # 웹 대시보드 확인
    if curl -f http://localhost:3000/api/health; then
        echo "✅ 웹 대시보드 정상 동작중"
    else
        echo "❌ 웹 대시보드 응답 없음"
        docker-compose logs web-dashboard --tail 50
        exit 1
    fi
    
    # 컨테이너 상태 출력
    echo "📊 현재 컨테이너 상태:"
    docker-compose ps
    
    echo "🎉 배포 완료!"
ENDSSH

echo -e "${GREEN}✅ 운영 서버 배포가 성공적으로 완료되었습니다!${NC}"
echo "🌐 접속 주소: http://${PROD_HOST}:3000"