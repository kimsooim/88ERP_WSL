import pickle
import os
import glob
from datetime import datetime
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

def find_latest_file():
    """메모리 폴더에서 가장 최근 생성된 파일 찾기"""
    memory_folder = '/home/sp1/88ERP/memory'
    
    # txt 파일들만 검색
    pattern = os.path.join(memory_folder, '*.txt')
    files = glob.glob(pattern)
    
    if not files:
        print("업로드할 txt 파일이 없습니다.")
        return None
    
    # 생성 시간 기준으로 가장 최근 파일 찾기
    latest_file = max(files, key=os.path.getctime)
    
    print(f"가장 최근 파일: {os.path.basename(latest_file)}")
    return latest_file

def upload_to_gdrive(file_path):
    """Google Drive에 파일 업로드"""
    try:
        # 기존 토큰 로드
        token_path = '/home/sp1/88ERP/core/auth/token.pickle'
        with open(token_path, 'rb') as token:
            creds = pickle.load(token)
        
        # Drive API 서비스 생성
        service = build('drive', 'v3', credentials=creds)
        
        # 파일명 추출
        file_name = os.path.basename(file_path)
        
        # 메모리 폴더 ID
        folder_id = '19q3wp51S99uPDqAXfG2GpjLvwtnHopfk'
        
        # 파일 메타데이터
        file_metadata = {
            'name': file_name,
            'parents': [folder_id]
        }
        
        # 파일 업로드
        media = MediaFileUpload(file_path, mimetype='text/plain')
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id,webViewLink'
        ).execute()
        
        print('Google Drive 업로드 성공!')
        print(f'파일명: {file_name}')
        print(f'File ID: {file.get("id")}')
        print(f'Link: {file.get("webViewLink")}')
        print(f'폴더 링크: https://drive.google.com/drive/u/1/folders/{folder_id}')
        
        return True
        
    except Exception as e:
        print(f'업로드 실패: {e}')
        return False

if __name__ == "__main__":
    print("=== Google Drive 업로드 도구 ===")
    
    # 최신 파일 찾기
    latest_file = find_latest_file()
    
    if latest_file:
        # 업로드 실행
        success = upload_to_gdrive(latest_file)
        
        if success:
            print("\n[성공] 업로드 완료!")
        else:
            print("\n[실패] 업로드 실패!")
    else:
        print("\n업로드할 파일이 없습니다.")