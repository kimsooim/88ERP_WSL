#!/bin/bash
# 배포 테스트 스크립트

echo "🧪 배포 연결 테스트 시작..."

# 1. 코드 동기화 테스트
echo "1️⃣ 코드 동기화 테스트"
bash /home/sp1/88ERP/scripts/sync-to-prod-repo.sh

# 2. SSH 연결 테스트
echo "2️⃣ SSH 연결 테스트"
ssh -i ~/.ssh/88erp_deploy_key -o ConnectTimeout=10 server@183.102.56.171 'echo "SSH 연결 성공: $(whoami)@$(hostname)"'

# 3. 배포 스크립트 존재 확인
echo "3️⃣ 배포 스크립트 확인"
ssh -i ~/.ssh/88erp_deploy_key -o ConnectTimeout=10 server@183.102.56.171 'ls -la /home/server/SERVER/scripts/deploy-receiver.sh'

# 4. 간단한 배포 테스트
echo "4️⃣ 간단한 명령 테스트"
ssh -i ~/.ssh/88erp_deploy_key -o ConnectTimeout=10 server@183.102.56.171 'cd /home/server/SERVER && pwd && git status'

echo "✅ 테스트 완료"