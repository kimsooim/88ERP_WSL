# 88ERP Docker 개발 환경 가이드

## 개요
88ERP 프로젝트를 Docker 환경에서 개발할 수 있도록 설정했습니다.
운영 서버는 별도 컴퓨터(Rocky Linux VM)에 있으며, 이는 로컬 개발 환경입니다.

## 포트 구성
- 웹 대시보드: 3000 (기본)
- PostgreSQL: 5433 (new_88toy가 5432 사용중)
- Redis: 6379
- 모니터링: 3001

## 빠른 시작

### 1. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 열어서 필요한 값 수정
```

### 2. Docker 컨테이너 실행
```bash
# 모든 서비스 실행
docker-compose up -d

# 웹 대시보드만 실행
docker-compose up -d web-dashboard db

# 로그 확인
docker-compose logs -f web-dashboard
```

### 3. 접속
- 웹 대시보드: http://localhost:3000
- 모니터링: http://localhost:3001

## 개발 명령어

### 컨테이너 관리
```bash
# 실행
docker-compose up -d

# 중지
docker-compose down

# 재시작
docker-compose restart web-dashboard

# 로그 확인
docker-compose logs -f

# 컨테이너 상태 확인
docker-compose ps
```

### 데이터베이스 접속
```bash
# PostgreSQL 접속
docker exec -it 88erp_db psql -U postgres -d 88erp

# Redis 접속
docker exec -it 88erp_redis redis-cli
```

### 빌드 및 배포
```bash
# 이미지 재빌드
docker-compose build

# 클린 재시작 (볼륨 제외)
docker-compose down && docker-compose up -d --build

# 완전 초기화 (주의: 데이터 삭제)
docker-compose down -v && docker-compose up -d --build
```

## 운영 서버 정보
- IP: 192.168.32.128 (Rocky Linux VM)
- 사용자: root
- 운영 환경은 별도 설정 필요

## 문제 해결

### 포트 충돌 시
```bash
# 사용중인 포트 확인
sudo lsof -i :3000
sudo lsof -i :5433

# docker-compose.yml에서 포트 변경
# 예: "3002:3000" (호스트:컨테이너)
```

### 권한 문제
```bash
# Docker 그룹에 사용자 추가
sudo usermod -aG docker $USER
# 로그아웃 후 다시 로그인
```

### 메모리 부족
```bash
# Docker 리소스 정리
docker system prune -a
```

## 주의사항
1. 개발 환경용이므로 프로덕션에서는 별도 설정 필요
2. .env 파일은 절대 Git에 커밋하지 않기
3. 데이터는 Docker 볼륨에 저장되므로 백업 필요