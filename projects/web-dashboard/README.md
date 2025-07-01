# 88ERP 웹 대시보드

88ERP 통합 관리 시스템의 웹 대시보드입니다.

## 🚀 프로젝트 개요
- **목적**: 데이터 일원화 + 업무 자동화 + 외부접속 가능한 리눅스 기반 웹대시보드
- **기술 스택**: Next.js 14, TypeScript, Tailwind CSS, Supabase
- **개발 환경**: WSL Ubuntu, PM2

## 📁 프로젝트 구조
```
web-dashboard/
├── app/                    # Next.js 14 App Router
│   ├── (dashboard)/       # 대시보드 레이아웃
│   │   ├── online/       # 온라인사업
│   │   ├── offline/      # 오프라인사업
│   │   ├── toy/          # 토이사업
│   │   ├── purchase/     # 구매보고서
│   │   ├── sales/        # 매출보고서
│   │   ├── profit/       # 손익보고서
│   │   ├── mypage/       # 마이페이지
│   │   └── admin/        # 관리자
│   └── api/              # API 라우트
├── components/           # 재사용 컴포넌트
├── lib/                 # 유틸리티 함수
└── public/              # 정적 파일
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. PM2로 운영 서버 실행
```bash
pm2 start ecosystem.config.js
```

## 🌐 접속 정보
- **개발**: http://localhost:3000
- **운영**: http://192.168.32.128:3000 (예정)
- **도메인**: https://db.88toy.co.kr (예정)
- **서버 모니터**: http://localhost:4000

## 📊 버전 관리 가이드

### 브랜치 전략
```bash
main          # 운영 배포용
├── develop   # 개발 통합
│   ├── feature/online-dashboard    # 온라인사업 기능
│   ├── feature/offline-automation  # 오프라인 자동화
│   └── feature/toy-management      # 토이사업 관리
└── hotfix/   # 긴급 수정
```

### 커밋 규칙
```bash
# 기능 추가
git commit -m "feat: 사용자 관리 페이지 추가"

# 버그 수정
git commit -m "fix: 로그인 오류 수정"

# 스타일 변경
git commit -m "style: 대시보드 레이아웃 개선"

# 문서 수정
git commit -m "docs: README 업데이트"

# 리팩토링
git commit -m "refactor: 컴포넌트 구조 개선"

# 테스트
git commit -m "test: 사용자 관리 테스트 추가"
```

### 버전 태그
```bash
# 버전 태그 생성
git tag -a v1.0.0 -m "초기 릴리즈"
git push origin v1.0.0

# 버전 규칙
v[major].[minor].[patch]
- major: 큰 변경사항 (비호환성 변경)
- minor: 기능 추가 (하위 호환)
- patch: 버그 수정
```

## 🔧 주요 명령어

### Git 작업
```bash
# 현재 상태 확인
git status

# 변경사항 추가
git add .

# 커밋
git commit -m "메시지"

# 푸시
git push origin main

# 브랜치 생성 및 전환
git checkout -b feature/새기능

# 이전 버전으로 롤백
git checkout [commit-hash]

# 태그 확인
git tag -l
```

### PM2 관리
```bash
# 상태 확인
pm2 status

# 로그 확인
pm2 logs 88erp-dashboard

# 재시작
pm2 restart 88erp-dashboard

# 모니터링
pm2 monit

# 프로세스 정보
pm2 info 88erp-dashboard
```

## 🔄 백업 및 복구

### 백업 전략
1. **코드 백업**: Git으로 관리 (GitHub)
2. **데이터 백업**: Supabase 자동 백업
3. **설정 백업**: 환경 변수는 별도 관리

### 복구 절차
```bash
# 특정 버전으로 복구
git checkout v1.0.0

# 이전 커밋으로 복구
git reset --hard [commit-hash]

# 원격 저장소에서 복구
git fetch origin
git reset --hard origin/main
```

## 🔍 서버 모니터
별도 포트(4000)에서 서버 모니터링 도구 실행 중:
- URL: http://localhost:4000
- 기능: 실시간 로그, 서버 상태, 재시작 기능

## 📝 개발 현황
- [x] 기본 레이아웃 구성
- [x] 사용자 관리 페이지
- [x] 페이지 상태 관리
- [x] 서버 모니터링 도구
- [ ] Supabase 연동
- [ ] 외부 접속 설정
- [ ] 자동화 기능 구현

## 🚨 트러블슈팅

### 빌드 오류 발생 시
```bash
# 캐시 삭제
rm -rf .next
npm run dev
```

### PM2 프로세스 문제
```bash
# 프로세스 삭제 후 재시작
pm2 delete 88erp-dashboard
pm2 start ecosystem.config.js
```

## 🤝 기여 방법
1. 새 브랜치 생성: `git checkout -b feature/기능명`
2. 변경사항 커밋: `git commit -m "feat: 기능 설명"`
3. 브랜치 푸시: `git push origin feature/기능명`
4. Pull Request 생성

## 📜 라이선스
Internal use only - 88toy

---
마지막 업데이트: 2025-06-30