
# 프로젝트 요약

- **앱 환경**  
  - Next.js 14 기반 대시보드  
  - Synology NAS (192.168.0.84)에서 구동  
  - 포트 3001, 인터페이스 바인딩: 0.0.0.0

- **도메인 & DNS**  
  - 도메인: db.88toy.co.kr  
  - 공인 IP: 183.102.56.171  
  - DNS A 레코드: 호스트 `db` → 183.102.56.171

- **DSM 설정**  
  - 역방향 프록시: HTTPS 443 (db.88toy.co.kr) → HTTP localhost:3001  
  - SSL: Let’s Encrypt 인증서 적용

- **서버 실행**  
  - `package.json` scripts:  
    - `dev`: `next dev -H 0.0.0.0 -p 3001`  
    - `start`: `next start -H 0.0.0.0 -p 3001`  
  - 백그라운드 실행: `nohup npm start > dashboard.log 2>&1 &`

- **진행 중**  
  - DNS 전파 대기 및 hosts 테스트  
  - `https://db.88toy.co.kr` 접속 확인

