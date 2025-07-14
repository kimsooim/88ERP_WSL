# 88ERP 배포 가이드

## 개요
개발 환경에서 운영 서버(192.168.32.128)로 자동 배포하는 방법입니다.

## 배포 방법

### 방법 1: 수동 배포 (즉시 사용 가능)
```bash
# 실행 권한 부여
chmod +x scripts/deploy-prod.sh

# 배포 실행
./scripts/deploy-prod.sh
```

### 방법 2: GitHub Actions 자동 배포 (설정 필요)

#### 1. GitHub Secrets 설정
GitHub 저장소 → Settings → Secrets에서 추가:
- `PROD_HOST`: 192.168.32.128
- `PROD_USER`: root
- `PROD_SSH_KEY`: SSH 개인키 내용

#### 2. SSH 키 생성 (아직 없는 경우)
```bash
# 개발 컴퓨터에서
ssh-keygen -t rsa -b 4096 -f ~/.ssh/88erp_deploy_key

# 공개키를 운영 서버에 추가
ssh-copy-id -i ~/.ssh/88erp_deploy_key.pub root@192.168.32.128
```

#### 3. 자동 배포 트리거
- main 브랜치에 push하면 자동 배포
- 또는 GitHub Actions 탭에서 수동 실행

### 방법 3: VS Code에서 한 번에 배포

#### 1. VS Code 작업 설정
`.vscode/tasks.json` 파일 생성:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Deploy to Production",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/deploy-prod.sh",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

#### 2. 단축키로 배포
- `Ctrl+Shift+B` (Windows/Linux)
- `Cmd+Shift+B` (Mac)

## 운영 서버 초기 설정

### 1. Docker 설치 (Rocky Linux)
```bash
# Docker 설치
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Docker 시작
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. 프로젝트 클론
```bash
cd /root
git clone https://github.com/kimsooim/88ERP_WSL.git 88ERP
cd 88ERP
```

### 3. 환경 변수 설정
```bash
# .env 파일 생성
cp .env.example .env

# 필수 값 설정
vim .env
# DB_PASSWORD=강력한비밀번호
# REDIS_PASSWORD=강력한비밀번호
# NEXTAUTH_SECRET=openssl rand -base64 32 결과값
```

### 4. 첫 실행
```bash
# 운영용 Docker Compose 실행
docker compose -f docker-compose.prod.yml up -d
```

## 배포 프로세스

1. **개발 완료** → 로컬에서 테스트
2. **커밋 & 푸시** → git commit & push
3. **배포 실행** → 스크립트 실행 또는 자동 트리거
4. **헬스체크** → 자동으로 서비스 상태 확인
5. **완료 알림** → 배포 성공/실패 표시

## 롤백 방법

### 빠른 롤백
```bash
# 운영 서버에서
cd /root/88ERP
git log --oneline -5  # 이전 커밋 확인
git checkout <이전커밋해시>
docker-compose -f docker-compose.prod.yml up -d --build
```

### Docker 이미지로 롤백
```bash
# 이전 이미지로 롤백
docker-compose -f docker-compose.prod.yml down
docker tag 88erp-web-dashboard:latest 88erp-web-dashboard:backup
docker-compose -f docker-compose.prod.yml up -d
```

## 모니터링

### 로그 확인
```bash
# 실시간 로그
docker-compose -f docker-compose.prod.yml logs -f

# 특정 서비스 로그
docker logs 88erp_web_dashboard -f --tail 100
```

### 상태 확인
```bash
# 컨테이너 상태
docker-compose -f docker-compose.prod.yml ps

# 리소스 사용량
docker stats
```

## 트러블슈팅

### 포트 충돌
```bash
# 사용중인 포트 확인
sudo lsof -i :3000
```

### 디스크 공간 부족
```bash
# Docker 정리
docker system prune -a
```

### 데이터베이스 연결 실패
```bash
# DB 로그 확인
docker logs 88erp_db

# DB 재시작
docker-compose -f docker-compose.prod.yml restart db
```

## 보안 권장사항

1. **환경 변수**
   - 절대 .env 파일을 Git에 커밋하지 않기
   - 강력한 비밀번호 사용

2. **방화벽**
   ```bash
   # 필요한 포트만 열기
   firewall-cmd --permanent --add-port=80/tcp
   firewall-cmd --permanent --add-port=443/tcp
   firewall-cmd --reload
   ```

3. **SSL 인증서**
   - Let's Encrypt 사용 권장
   - nginx 설정에 SSL 추가

4. **정기 백업**
   ```bash
   # 데이터베이스 백업
   docker exec 88erp_db pg_dump -U postgres 88erp > backup_$(date +%Y%m%d).sql
   ```