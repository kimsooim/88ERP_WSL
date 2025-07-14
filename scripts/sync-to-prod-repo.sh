#!/bin/bash
# 개발 서버에서 운영 서버 저장소로 코드 동기화

set -e

echo "🔄 개발 서버 → 운영 서버 저장소 동기화 시작..."

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

# 임시 디렉토리 생성
TEMP_DIR="/tmp/88erp_deploy_$(date +%s)"
mkdir -p $TEMP_DIR

echo "📥 운영 서버 저장소 클론중..."
cd $TEMP_DIR
git clone https://github.com/kimsooim/88ERP_server.git 88ERP_server
cd 88ERP_server

# 기존 파일 삭제 (git 관련 제외)
echo "🗑️  기존 파일 정리중..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' -exec rm -rf {} +

# 개발 서버 파일 복사 (필요한 것만)
echo "📋 필요한 파일 복사중..."
cp -r /home/sp1/88ERP/projects/web-dashboard ./projects/
cp -r /home/sp1/88ERP/docker-compose.prod.yml ./docker-compose.yml
cp -r /home/sp1/88ERP/Dockerfile.prod ./Dockerfile
cp -r /home/sp1/88ERP/.dockerignore ./
cp -r /home/sp1/88ERP/.env.example ./
cp -r /home/sp1/88ERP/README.Docker.md ./README.md

# nginx 설정 추가 (있다면)
if [ -d "/home/sp1/88ERP/nginx" ]; then
    cp -r /home/sp1/88ERP/nginx ./
fi

# 배포 관련 스크립트
mkdir -p scripts
cat > scripts/start.sh << 'EOF'
#!/bin/bash
# 운영 서버 시작 스크립트
docker-compose down
docker-compose up -d --build
docker-compose logs -f
EOF

chmod +x scripts/start.sh

# Git 커밋 및 푸시
echo "📤 변경사항 커밋 및 푸시중..."
git add -A
git commit -m "🚀 Deploy from development server - $(date +'%Y-%m-%d %H:%M:%S')" || true
git push origin main

# 임시 디렉토리 삭제
cd /
rm -rf $TEMP_DIR

echo -e "${GREEN}✅ 운영 서버 저장소 동기화 완료!${NC}"
echo -e "${YELLOW}📌 다음 단계:${NC}"
echo "1. 운영 서버에 SSH 접속: ssh root@192.168.32.128"
echo "2. 코드 업데이트: cd /root/88ERP && git pull"
echo "3. 서비스 재시작: docker-compose up -d --build"