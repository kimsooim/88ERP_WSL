#!/bin/bash

# GitHub 원격 저장소 추가
echo "GitHub 저장소 URL을 입력하세요 (예: https://github.com/yourusername/88ERP.git):"
read GITHUB_URL

# 원격 저장소 추가
git remote add origin $GITHUB_URL

# 브랜치 이름을 main으로 변경 (GitHub 기본값)
git branch -M main

# 첫 번째 푸시
echo "GitHub에 코드를 푸시합니다..."
git push -u origin main

echo "완료! 이제부터는 git push만 하면 됩니다."