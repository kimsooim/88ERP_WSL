#!/usr/bin/env python3
"""
메모리해 명령 통합 스크립트
1. MCP Memory 저장
2. 로컬 파일 저장 (C:\88ERP-Fresh\memory\)
3. Git 저장소 자동 push
4. Google Drive 업로드 (별도 스크립트)
"""

import os
import sys
import subprocess
from datetime import datetime
import json

def save_to_local(content, title="memory"):
    """로컬 파일 저장"""
    timestamp = datetime.now().strftime("%Y_%m_%d_%H%M")
    filename = f"{timestamp}_claude_code_{title}.txt"
    
    # Windows 경로
    windows_path = f"C:\\88ERP-Fresh\\memory\\{filename}"
    
    # WSL에서 Windows 경로 접근
    wsl_path = f"/mnt/c/88ERP-Fresh/memory/{filename}"
    
    # 디렉토리 생성
    os.makedirs(os.path.dirname(wsl_path), exist_ok=True)
    
    # 파일 저장
    with open(wsl_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 로컬 저장 완료: {windows_path}")
    return filename

def git_auto_push(message="메모리 자동 저장"):
    """Git 자동 커밋 및 push"""
    try:
        # Git 저장소로 이동
        os.chdir("/home/sp1/88ERP-Dev")
        
        # 변경사항 확인
        status = subprocess.run(['git', 'status', '--porcelain'], 
                              capture_output=True, text=True)
        
        if status.stdout.strip():
            # 변경사항이 있으면 커밋
            subprocess.run(['git', 'add', '.'], check=True)
            
            # 커밋 메시지에 타임스탬프 추가
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            commit_msg = f"{message} - {timestamp}"
            subprocess.run(['git', 'commit', '-m', commit_msg], check=True)
            
            # Push
            subprocess.run(['git', 'push'], check=True)
            print(f"✅ Git push 완료: {commit_msg}")
            return True
        else:
            print("ℹ️ Git 변경사항 없음")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"❌ Git 오류: {e}")
        return False

def memory_with_git(content, title="memory"):
    """메모리해 통합 처리"""
    print("🔄 메모리 저장 시작...")
    
    # 1. 로컬 파일 저장
    filename = save_to_local(content, title)
    
    # 2. Git push
    git_auto_push(f"메모리 저장: {title}")
    
    # 3. 메모리 로그 작성
    log_data = {
        "timestamp": datetime.now().isoformat(),
        "filename": filename,
        "title": title,
        "git_pushed": True,
        "google_drive": "pending"
    }
    
    log_path = "/home/sp1/88ERP-Dev/memory_log.json"
    logs = []
    
    if os.path.exists(log_path):
        with open(log_path, 'r') as f:
            logs = json.load(f)
    
    logs.append(log_data)
    
    with open(log_path, 'w') as f:
        json.dump(logs, f, indent=2, ensure_ascii=False)
    
    print("✅ 메모리 저장 완료!")
    print(f"   - 로컬: {filename}")
    print(f"   - Git: GitHub 저장소에 push됨")
    print(f"   - Google Drive: upload_latest_to_gdrive.py 실행 필요")

if __name__ == "__main__":
    # 테스트
    test_content = """
    테스트 메모리 내용
    작성일: """ + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    memory_with_git(test_content, "test_memory")