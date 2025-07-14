# 88ERP 배포 플로우

## 저장소 구조
- **개발 서버**: https://github.com/kimsooim/88ERP_WSL (현재 컴퓨터)
- **운영 서버**: https://github.com/kimsooim/88ERP_server (192.168.32.128)

## 배포 방법

### 방법 1: 전체 자동 배포 (권장)
```bash
# 개발 서버에서 실행
cd /home/sp1/88ERP
./scripts/deploy-full.sh
```

이 스크립트가 하는 일:
1. 개발 서버 코드를 88ERP_WSL에 푸시
2. 필요한 파일만 88ERP_server 저장소로 복사
3. 운영 서버에 SSH로 접속해서 자동 배포

### 방법 2: 단계별 수동 배포

#### Step 1: 운영 서버 저장소로 동기화
```bash
# 개발 서버에서
./scripts/sync-to-prod-repo.sh
```

#### Step 2: 운영 서버에서 배포
```bash
# 운영 서버에 SSH 접속
ssh root@192.168.32.128

# 코드 업데이트
cd /root/88ERP
git pull origin main

# Docker 재시작
docker-compose up -d --build
```

### 방법 3: GitHub Actions 자동 배포
개발 서버(88ERP_WSL)의 main 브랜치에 push하면:
1. 자동으로 88ERP_server 저장소로 코드 동기화
2. 운영 서버에 자동 배포

## 파일 동기화 내역
개발 → 운영으로 복사되는 파일:
- `projects/web-dashboard/` - 웹 대시보드 전체
- `docker-compose.prod.yml` → `docker-compose.yml`
- `Dockerfile.prod` → `Dockerfile`
- `.dockerignore`
- `.env.example`

## 첫 배포 시 운영 서버 설정

```bash
# 운영 서버에서
cd /root

# 운영 저장소 클론
git clone https://github.com/kimsooim/88ERP_server.git 88ERP
cd 88ERP

# 환경 변수 설정
cp .env.example .env
vim .env
# 필수 설정:
# - DB_PASSWORD=안전한비밀번호
# - NEXTAUTH_SECRET=$(openssl rand -base64 32)
# - REDIS_PASSWORD=안전한비밀번호

# 첫 실행
docker-compose up -d
```

## 배포 확인
```bash
# 로컬에서 확인
curl http://192.168.32.128:3000

# 로그 확인
ssh root@192.168.32.128 'cd /root/88ERP && docker-compose logs -f'
```

## 롤백 방법
```bash
# 운영 서버에서
cd /root/88ERP
git log --oneline -5
git checkout <이전커밋>
docker-compose up -d --build
```