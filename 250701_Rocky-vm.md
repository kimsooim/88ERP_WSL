  
  ## 🔧 ssh-rocky-linux 서버 설정
  - 호스트: 192.168.32.128 (Rocky Linux VM)
  - 포트: 22 (SSH)
  - 사용자: root / root
  - 허용 명령어: ls, cat, systemctl, npm, node, python 등


 🚀 활용 방법
  1. Claude Code 재시작하면 SSH 서버가 자동 로드됨
  2. Rocky Linux VM의 파일/서비스에 직접 접근 가능
  3. n8n 서비스 상태 확인, NAS 접근 테스트 등 가능

📝 다음에 이어갈 작업
  1. Rocky VM에서 n8n 설치 완료 확인
  2. NAS 접근 테스트 (ping ds920)
  3. n8n 워크플로우 구현

SSH 수동 접속 방법

  ssh root@192.168.32.128
  # 비밀번호: root

  # n8n 상태 확인 명령어
  systemctl status n8n
  ls -la /root/.n8n/workflows/
  n8n --version


