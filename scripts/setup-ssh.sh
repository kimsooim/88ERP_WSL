#!/bin/bash
# SSH 키 설정 스크립트

echo "🔑 88ERP 운영 서버 SSH 키 설정"
echo "================================"
echo ""
echo "다음 공개키를 운영 서버에 추가해주세요:"
echo ""
echo "1. 운영 서버에 SSH 접속:"
echo "   ssh root@183.102.56.171"
echo ""
echo "2. authorized_keys 파일 편집:"
echo "   vim ~/.ssh/authorized_keys"
echo ""
echo "3. 아래 공개키를 추가:"
echo "------- 공개키 시작 -------"
cat ~/.ssh/88erp_deploy_key.pub
echo "------- 공개키 끝 -------"
echo ""
echo "4. 파일 저장 후 종료"
echo ""
echo "5. SSH 연결 테스트:"
echo "   ssh -i ~/.ssh/88erp_deploy_key root@183.102.56.171 'echo SSH 연결 성공!'"