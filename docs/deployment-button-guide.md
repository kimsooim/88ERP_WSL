# 운영 서버 클로드코드용 배포 버튼 설명서

## 개요
개발 서버의 웹 대시보드에서 버튼 클릭으로 운영 서버에 자동 배포하는 기능입니다.

## 접속 정보
- URL: http://localhost:3000/admin/servers
- 권한: 관리자만 접근 가능

## 구현된 기능

### 1. 배포 버튼 UI
- 위치: 서버관리 페이지 > 배포 관리 섹션
- 버튼: "운영 서버에 배포"
- 배포 전 확인 메시지 표시

### 2. 배포 프로세스
1. Git 상태 확인
2. 최신 코드 Pull (88ERP_server 저장소)
3. Docker 이미지 빌드
4. 서비스 재시작
5. 헬스체크

### 3. 실시간 진행 상황
- 현재 진행 단계 표시
- 실시간 로그 스트리밍
- 성공/실패 상태 아이콘
- 배포 시작 시간 표시

### 4. API 엔드포인트
- GET `/api/deploy` - 배포 상태 확인
- POST `/api/deploy` - 배포 시작
- GET `/api/health` - 헬스체크

## 운영 서버 설정 방법

### 1. API 파일 생성
운영 서버의 88ERP_server 저장소에서:

```bash
# API 디렉토리 생성
mkdir -p projects/web-dashboard/app/api/deploy
mkdir -p projects/web-dashboard/app/api/health

# 배포 API 파일 복사 (개발 서버에서 제공된 코드 사용)
```

### 2. 배포 스크립트 권한 설정
```bash
# 웹 서버 사용자가 실행할 수 있도록 권한 설정
sudo visudo

# 다음 라인 추가:
www-data ALL=(ALL) NOPASSWD: /usr/bin/docker-compose, /usr/bin/git
```

### 3. 환경 변수 설정
`.env` 파일에 추가:
```env
# 배포 관련 설정
DEPLOYMENT_SECRET=your-secret-key
ALLOW_DEPLOYMENT=true
```

### 4. Docker 설정 확인
- docker-compose.yml이 있는지 확인
- 웹 대시보드 컨테이너가 호스트의 Docker 소켓에 접근 가능한지 확인

## 보안 고려사항

1. **인증 확인**
   - 현재는 간단한 토큰 인증
   - 실제 운영시 NextAuth 세션 확인 필요

2. **권한 관리**
   - admin 권한 사용자만 배포 가능
   - IP 화이트리스트 추가 권장

3. **로그 관리**
   - 모든 배포 시도를 로그에 기록
   - 실패한 배포 알림 설정

## 사용 방법

1. 웹 대시보드 접속
2. 관리자로 로그인
3. 메뉴 > 관리자 > 서버관리
4. "운영 서버에 배포" 버튼 클릭
5. 확인 메시지에서 "확인" 클릭
6. 진행 상황 모니터링

## 문제 해결

### 배포 실패 시
1. 로그 확인
2. Docker 권한 확인
3. Git 저장소 접근 권한 확인
4. 디스크 공간 확인

### 수동 배포로 복구
```bash
cd /root/88ERP
git pull origin main
docker-compose down
docker-compose up -d --build
```

## 추가 개발 예정
1. 롤백 기능
2. 배포 이력 관리
3. Slack/이메일 알림
4. 스테이징 서버 지원