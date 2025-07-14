# SSH 키 설정 가이드 - 배포 실패 해결

## 문제 상황
배포 버튼을 눌렀을 때 "배포 실패" 메시지가 나오는 이유는 개발 서버에서 운영 서버로 SSH 접속이 안 되기 때문입니다.

## 해결 방법

### 1. SSH 공개키 확인
개발 서버에서 생성된 SSH 공개키:
```bash
cat ~/.ssh/88erp_deploy_key.pub
```

결과:
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCgJuaNhVFOIqmG0qzsmtfTlT+rLRo5zGDLWjruQPDKKFDXlrNPiQi4HQWFo9Dp6YI12y2QfL50rt7jTM8qS45yhbrPZms+NmYCzDUckX7qUp6HtKhDiPG8+EwX1CF6VPzLsvtszVV2A3mJf/+rVVmYYZ2DLyaw1M15xiPvxXOIvH1LOUJM9rvdy5SXv59EyLSnJh0l0szpchBtMXCpgN0KRP4nhNBwkLbwrwqaCPFGef6CqAimy27RVcHytudkPss2pwAMvGrQpZ4ZxuDAN7sEUbGasfnLipcAHz3e23oW/zisnOI7PtcOIF1iwQ/lgl4De1H4P071LXi6RVQyw9uTC8rEEi1mX3VMwmrUJbRCKQonM6kfz6l68kpMqWuev5Wyc25D3ge8jtT472AaMplbonw7VZFELz0NZRsRVZKIViTDoR2PF+/IpFer7b/dPDnEWg1oLsfPW+ZeIpNwS72kUmQYlRnvPUzl53Mej9RIQZ9mvUWkbjgYiYOLEY0L9hkGDMBLhN9kyfCtORUEa9Yhy6Dfcd5Ep4RqW8ovSb2GOGMZxtpLzHkPxc3d5REhjBvR2MQuTo3ZAhwSC/nzQ5w3ee2PUgRMKpBJnG0d19QRNYc66zFlIWTgBiq6vvFoUZeMtyI43TrKFx5xNgFPZW7uj24FjyzXSsf0goTnVtd7dw== 88erp-deployment
```

### 2. 운영 서버에 공개키 등록

운영 서버 클로드코드에게 다음을 요청하세요:

```bash
# 운영 서버에서 실행
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# authorized_keys 파일에 위의 공개키 추가
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCgJuaNhVFOIqmG0qzsmtfTlT+rLRo5zGDLWjruQPDKKFDXlrNPiQi4HQWFo9Dp6YI12y2QfL50rt7jTM8qS45yhbrPZms+NmYCzDUckX7qUp6HtKhDiPG8+EwX1CF6VPzLsvtszVV2A3mJf/+rVVmYYZ2DLyaw1M15xiPvxXOIvH1LOUJM9rvdy5SXv59EyLSnJh0l0szpchBtMXCpgN0KRP4nhNBwkLbwrwqaCPFGef6CqAimy27RVcHytudkPss2pwAMvGrQpZ4ZxuDAN7sEUbGasfnLipcAHz3e23oW/zisnOI7PtcOIF1iwQ/lgl4De1H4P071LXi6RVQyw9uTC8rEEi1mX3VMwmrUJbRCKQonM6kfz6l68kpMqWuev5Wyc25D3ge8jtT472AaMplbonw7VZFELz0NZRsRVZKIViTDoR2PF+/IpFer7b/dPDnEWg1oLsfPW+ZeIpNwS72kUmQYlRnvPUzl53Mej9RIQZ9mvUWkbjgYiYOLEY0L9hkGDMBLhN9kyfCtORUEa9Yhy6Dfcd5Ep4RqW8ovSb2GOGMZxtpLzHkPxc3d5REhjBvR2MQuTo3ZAhwSC/nzQ5w3ee2PUgRMKpBJnG0d19QRNYc66zFlIWTgBiq6vvFoUZeMtyI43TrKFx5xNgFPZW7uj24FjyzXSsf0goTnVtd7dw== 88erp-deployment" >> ~/.ssh/authorized_keys

chmod 600 ~/.ssh/authorized_keys
```

### 3. SSH 연결 테스트

공개키 등록 후 개발 서버에서 테스트:
```bash
ssh -i ~/.ssh/88erp_deploy_key root@183.102.56.171 'echo "SSH 연결 성공!"'
```

### 4. 배포 API 원복

SSH 연결이 성공하면 `/home/sp1/88ERP/projects/web-dashboard/app/api/deploy/route.ts` 파일의 74-77줄을 다시 원래대로 수정:

```typescript
{
  name: 'deploy-to-server',
  command: `ssh -i ~/.ssh/88erp_deploy_key -o StrictHostKeyChecking=no root@183.102.56.171 'cd /root/88ERP && git pull origin main && docker-compose down && docker-compose up -d --build'`,
  message: '운영 서버에 배포 중...',
},
```

## 임시 해결 방법 (SSH 키 설정 전)

SSH 키 설정이 어려우면 수동으로 배포:

1. 개발 서버에서 GitHub에 푸시
```bash
cd /home/sp1/88ERP
./scripts/sync-to-prod-repo.sh
```

2. 운영 서버에서 수동 배포
```bash
ssh root@183.102.56.171
cd /root/88ERP
git pull origin main
docker-compose down
docker-compose up -d --build
```

## 운영 서버 클로드코드에게 전달할 내용

"개발 서버에서 자동 배포를 위해 SSH 공개키를 등록해야 합니다. 위의 공개키를 운영 서버의 ~/.ssh/authorized_keys 파일에 추가해주세요."