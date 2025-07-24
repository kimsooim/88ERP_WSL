#!/bin/bash
# 호스트에서 실행되는 배포 스크립트

set -e

echo "🚀 호스트에서 배포 시작..."

# 1. 코드 동기화
echo "1️⃣ 코드 동기화 중..."
cd /home/sp1/88ERP
bash scripts/sync-to-prod-repo.sh

# 2. 운영 서버에 배포
echo "2️⃣ 운영 서버에 배포 중..."
ssh -i ~/.ssh/88erp_deploy_key -o StrictHostKeyChecking=no server@183.102.56.171 '/home/server/SERVER/scripts/deploy-receiver.sh'

# 3. 헬스체크
echo "3️⃣ 헬스체크 중..."
sleep 15
curl -f https://db.88toy.co.kr/api/health

# 4. 배포 상태 확인
echo "4️⃣ 배포 상태 확인 중..."
ssh -i ~/.ssh/88erp_deploy_key -o StrictHostKeyChecking=no server@183.102.56.171 'docker ps | grep 88erp'

echo "✅ 배포 완료!"