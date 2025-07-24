#!/bin/bash
# 운영서버 자동 배포 스크립트
# 이 스크립트를 운영서버의 /home/server/SERVER/scripts/ 에 복사하세요

set -e

# 설정
DEPLOY_DIR="/home/server/SERVER"
LOG_FILE="/home/server/deploy.log"
LOCK_FILE="/tmp/88erp_deploy.lock"

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

# 로그 함수
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# 중복 실행 방지
if [ -f "$LOCK_FILE" ]; then
    log "⚠️  배포가 이미 진행 중입니다."
    exit 0
fi

trap "rm -f $LOCK_FILE" EXIT
touch $LOCK_FILE

log "🔍 배포 확인 시작..."

cd $DEPLOY_DIR

# GitHub에서 최신 정보 가져오기
git fetch origin main --tags 2>&1 | tee -a $LOG_FILE

# 현재 커밋과 원격 커밋 비교
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    log "✨ 새로운 배포 발견!"
    
    # 변경사항 확인
    log "📋 변경사항:"
    git log --oneline HEAD..origin/main | tee -a $LOG_FILE
    
    # 코드 업데이트
    log "📥 코드 업데이트 중..."
    git pull origin main 2>&1 | tee -a $LOG_FILE
    
    # Docker 이미지 빌드 및 재시작
    log "🐳 Docker 서비스 재시작 중..."
    docker-compose down 2>&1 | tee -a $LOG_FILE
    docker-compose up -d --build 2>&1 | tee -a $LOG_FILE
    
    # 서비스 상태 확인
    sleep 10
    if docker-compose ps | grep -q "Up"; then
        log "✅ 배포 성공!"
        
        # 배포 완료 알림 (선택사항)
        echo "88ERP 배포 완료: $(date)" > /home/server/last_deploy.txt
    else
        log "❌ 배포 실패! Docker 컨테이너 상태를 확인하세요."
        docker-compose ps | tee -a $LOG_FILE
        exit 1
    fi
else
    log "📌 변경사항 없음 (현재: ${LOCAL_COMMIT:0:7})"
fi

# Lock 파일 제거
rm -f $LOCK_FILE