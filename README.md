# 88ERP 프로젝트

AI 기반 ERP 시스템

## 개발 환경
- 개발: WSL Ubuntu
- 운영: Rocky Linux (192.168.32.128)
- DB: Supabase Cloud
- 웹: Next.js + TypeScript

## 배포 방법
```bash
# 개발 서버에서
git add .
git commit -m "update"
git push origin main

# 운영 서버에서 
git pull origin main
npm install
npm run build
pm2 restart 88erp
```