# 운영 서버 배포 버튼 설정 가이드

## 운영 서버 정보
- IP: 183.102.56.171
- 도메인: db.88toy.co.kr
- 접속 가능 서비스:
  - 웹 대시보드: http://db.88toy.co.kr (또는 http://183.102.56.171)
  - n8n 자동화: http://db.88toy.co.kr:5678

## 운영 서버 컨테이너 구성
- `88erp-nginx`: 웹서버/리버스 프록시 (포트 80/443)
- `88erp-webapp`: Next.js 웹 대시보드 (포트 3000)
- `88erp-n8n`: 워크플로우 자동화 (포트 5678)
- `88erp-postgres`: PostgreSQL DB (포트 5432)
- `88erp-redis`: Redis 캐시 (포트 6379)

## 개발 서버에서 운영 서버로 배포하기

### 1. SSH 키 설정 확인
개발 서버에서 운영 서버로 SSH 접속이 가능해야 합니다:
```bash
# 개발 서버에서 테스트
ssh root@183.102.56.171 'echo "SSH 연결 성공"'
```

만약 비밀번호를 요구한다면:
```bash
# SSH 키 생성 및 복사
ssh-keygen -t rsa -b 4096 -f ~/.ssh/88erp_deploy_key
ssh-copy-id -i ~/.ssh/88erp_deploy_key.pub root@183.102.56.171
```

### 2. 개발 서버에서 배포 실행
웹 대시보드에서:
1. http://localhost:3000/admin/servers 접속
2. "운영 서버에 배포" 버튼 클릭

또는 터미널에서:
```bash
cd /home/sp1/88ERP
./scripts/deploy-full.sh
```

### 3. 배포 프로세스
1. 개발 서버 코드를 88ERP_server GitHub에 동기화
2. SSH로 운영 서버 접속
3. 운영 서버에서 git pull
4. Docker 컨테이너 재시작
5. 헬스체크 (http://db.88toy.co.kr/api/health)

## 운영 서버에 필요한 설정

### 1. API 헬스체크 엔드포인트
`/root/88ERP/projects/web-dashboard/app/api/health/route.ts` 파일 생성:
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: '88ERP Production Server',
    environment: 'production',
  });
}
```

### 2. nginx 설정 확인
nginx가 `/api/health` 요청을 webapp 컨테이너로 프록시하는지 확인:
```nginx
location /api {
    proxy_pass http://88erp-webapp:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 3. Docker Compose 확인
운영 서버의 docker-compose.yml에서 컨테이너명이 맞는지 확인:
- 88erp-webapp (웹 대시보드)
- 88erp-nginx (리버스 프록시)

## 배포 후 확인사항
1. 웹 대시보드 접속: http://db.88toy.co.kr
2. 컨테이너 상태: `docker ps | grep 88erp`
3. 로그 확인: `docker logs 88erp-webapp -f`

## 문제 해결

### SSH 연결 실패
```bash
# SSH 설정 파일 확인
vim ~/.ssh/config

# 다음 내용 추가
Host 88erp-prod
    HostName 183.102.56.171
    User root
    IdentityFile ~/.ssh/88erp_deploy_key
```

### 배포 실패 시
```bash
# 운영 서버에서 수동 배포
ssh root@183.102.56.171
cd /root/88ERP
git pull origin main
docker-compose down
docker-compose up -d --build
```

### nginx 502 에러
webapp 컨테이너가 정상 실행중인지 확인:
```bash
docker logs 88erp-webapp --tail 50
docker restart 88erp-webapp
```