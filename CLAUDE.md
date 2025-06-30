# Claude Code 고정 지침

## 사용자 정보
- 이름: Ann
- 운영체제: Windows 기반 컴퓨터 , Linux rocky 설치완료
- 자체브랜드: 코튼푸드(Cottonfood), 쵸바(Choba), 코튼애니(Cottonani)
- 업무: 캐릭터 굿즈 제작/OEM 생산, 팝업스토어 운영, 협업 상품 기획
- 진행프로젝트 : 88ERP (AI로 자체 ERP 구축중)

## "메모리해" 명령시 저장규칙 (2025-06-30 업데이트)
### ⚠️ 중요: 메모리 저장 경로는 /home/sp1/88ERP/memory/ 입니다 (프로젝트 폴더 내부)
1. MCP memory 저장 (기억저장소)
2. WSL 환경 저장: /home/sp1/88ERP/memory/ (NOT /home/sp1/memory/)
3. GitHub 저장소에 자동 커밋/push https://github.com/kimsooim/88ERP_WSL
4. 파일명: 오늘날짜시간_claude_code_제목.txt 
   (예시: 2025_06_27_1659_claude_code_88oem_update.txt)
5. 하루에 여러번 메모리할경우 메모리해 이후부터 저장 - 내용중복 저장금지 
6. 구글드라이브는 수동저장

## "캡쳐봐" 명령시 이미지읽기
- Read 도구 
- 파일 경로: /mnt/c/temp/clipboard.png

## 폴더관리: 88ERP
- 폴더는 수시로 정리하고, 기존의 폴더를 사용함, 사용하지않는 파일들 정리
- cmd.exe /c 명령어 를 사용하여 드라이브에 접근
- 시그놀로지 나스 드라이브에 많은데이터 저장되어있음 //ds920
 

<3층구조>
  1층: 개발환경
  - Linux Ubuntu : \\wsl.localhost\Ubuntu\home\sp1\88ERP
  - C:(로컬 시스템) Windows C:\88ERP-Fresh <개발보조>
  - core/: 메모리, 인증, API 핵심 시스템
  - projects/: 웹대시보드, 교보문고, 데이터수집, 리포팅
  - integrations/: Google Drive, NAS 동기화, 클라우드 백업
  - tools/: 스크립트, 임시작업, 보관함  

  2층: 운영 환경 (R: Rocky VM)
  -  - R:(로컬 드라이브) Linux rocky vm SH: root@192.168.32.128 (패스워드: root) <운영메인>
   - services/: 실제 운영되는 서비스들
  - data/: 원본/처리된 데이터, 리포트, 백업
  - logs/: 시스템/애플리케이션/에러 로그
  - config/: DB, 네트워크, 보안 설정

  3층: 메모리 NAS (//ds920/2bot), supabase
  - active-projects/: 
  - data-warehouse/: 이미지, 문서, 아카이브 통합
  - monitoring/: 성능, 사용량, 알림 데이터
  - backup/: 일간/주간/월간 백업
  - I:(네트워크 드라이브) //ds920/img - 이미지 폴더
  - Y:(네트워크 드라이브) //ds920/2bot - 교보문고 자동화 
  - G:(외부 구글드라이브) 메모리백업 파일자동업로드
  - git : https://github.com/kimsooim/88ERP_WSL


## 프로젝트 목표: 88ERP
- 목표 : 데이터 일원화 + 업무 자동화 + 외부접속 가능한 리눅스 기반 웹대시보드 구현

## 1단계: 데이터 통합 기반 구축 (Supabase 중심)
- Supabase 구조 설계 (테이블/컬럼 통일, 기본 키 기준 확정)
- Notion, ecount, NAS → Supabase 이전 (이관 로직/스크립트 작성)
- API 수집 데이터 설계 (cafe24, 교보, aland, 메일 등 연결 흐름 설계)
- 데이터일원화 supabase > 웹대시보드 < 로그인기반 < 외부접속가능

## 2단계 : 웹 대시보드로 외부접속 + 로그인 시스템 구현
- Next.js 기반 UI 설계 (데이터 시각화, CRUD 화면 구성)
- 로그인/권한 시스템 구축 (팀원별 접근 제한 (Supabase Auth))
- 외부접속용 서버 세팅 Linux 서버 + 리버스 프록시 + 도메인 연결 (db.88toy.co.kr)
- 대시보드 실행 -	리눅스 (예: VM, Docker, NAS 내부)
- 대시보드 접속	- 윈도우 브라우저 (Chrome, Edge 등)
- 접속방식 http://192.168.32.128:3000 > https://db.88toy.co.kr
- 인증 : Supabase Auth로 로그인 가능
- 데이터 : Supabase에서 조회/입력/관리 가능

## 3단계: 업무 자동화 시스템 구축 (MCP 기반)
- MCP 자동화 설계 cafe24/kyobo/aland 수집 자동화
- 업무 로직 스크립트화 결산, 정산, 보고 자동화
- NAS ↔ Supabase 자동 동기화 (파일 or 데이터 기반 (MCP or rsync)

## 프로젝트 정보: 88ERP
- 개발환경 : Linux wsl
- 운영환경 : Linux VMware Workstation Pro
- 웹대시보드 : Windows 기반 브라우저
- 주요데이터 : supabase 클라우드 (신규)
- 보조데이터 : 시그놀로지 nas ds920 , ds916 2개사용중
- 현재데이터 저장상태 : notion,ecout,nas(ds916,ds920)..
- API 기반수집예정인 데이터 : cafe24,kyobo,aland,mail..

## MCP 서버 관리
- 모든 MCP 서버 상태 주기적 점검
- 문제 발생 시 즉시 수정
- mcp 는 클로드코드, 클로드데스크탑 동일한 서버를 사용할것
  1. filesystem - 파일 시스템 접근
  2. terminal-mcp - 터미널 기능
  3. context7 - Context7 문서화
  4. googleSearch - Google 검색
  5. playwright - 웹 자동화
  6. memory - 메모리 관리
  7. puppeteer - 웹 스크래핑
  8. everything - Everything 검색
  9. notion - Notion 연동
  10. shrimp-task-manager - 작업 관리
  11. ssh-rocky-linux - linux SSH 연결
  12. n8n-test - N8N 워크플로우
  13. google_workspace - Google Workspace 연동
  14. supabase - 데이터베이스 연동

  ## 클로드 데스트탑 mcp 경로  
  c/Users/sp1/AppData/Roaming/Claude/claude_desktop_config.jso
  logo : C:\Users\sp1\AppData\Roaming\Claude\logs

## 모듈화 파일명 규칙 (2025.06.27 추가)
### 프로젝트별 파일 순서 명명 규칙
- **목적**: 모듈 진행 순서에 따른 체계적 파일 관리
- **형식**: `번호_파일명.py` (예: 00_config.py, 01_main.py)

### 표준 파일 순서 (모든 자동화 프로젝트 공통)
```
00_config.py        # 설정 파일 (상수, 경로, 인증정보)
01_main.py          # 메인 실행 파일 (전체 프로세스 조정)
02_데이터수집.py      # 스크래핑/API 호출 (bizfashion_scraper.py)
03_데이터분석.py      # 분석/가공 (excel_analyzer.py)  
04_결과전송.py       # 리포트/이메일 (email_reporter.py)
```

### 적용 완료 프로젝트
1. **일매출보고서**: C:\abot\aland\aland_automation\
2. **월매출보고서**: C:\abot\aland\aland_automation_m\  
3. **GUI매출보고서**: C:\abot\aland\aland_automation_GUI\

### import 구문 규칙 (2025.06.27 동적 import로 개선)
기존 `from config import *` 방식에서 동적 import로 변경하여 파일명 변경에 유연하게 대응

```python
# 설정 및 모듈 import (번호 순서대로)
import importlib.util

# 동적 import 함수
def import_module_from_file(module_name, file_path):
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

# 00_config.py 불러오기
config_module = import_module_from_file("config", os.path.join(os.path.dirname(__file__), "00_config.py"))
globals().update({name: getattr(config_module, name) for name in dir(config_module) if not name.startswith('_')})

# 02_bizfashion_scraper.py 불러오기  
bizfashion_module = import_module_from_file("bizfashion_scraper", os.path.join(os.path.dirname(__file__), "02_bizfashion_scraper.py"))
BizfashionScraper = bizfashion_module.BizfashionScraper

# 03_excel_analyzer.py 불러오기
excel_analyzer_module = import_module_from_file("excel_analyzer", os.path.join(os.path.dirname(__file__), "03_excel_analyzer.py"))
ExcelAnalyzer = excel_analyzer_module.ExcelAnalyzer

# 04_email_reporter.py 불러오기
email_reporter_module = import_module_from_file("email_reporter", os.path.join(os.path.dirname(__file__), "04_email_reporter.py"))
EmailReporter = email_reporter_module.EmailReporter
```

### 동적 import 장점
- 파일명 변경에 유연하게 대응
- 모듈 경로 명시적 관리
- Python 표준 라이브러리만 사용
- 순환 import 문제 방지

## 대화 스타일
0. 친근한 반말로해.
1. 첫질문에 바로 코드작성금지 (진행이후가능)
2. 질문 이해 요약 후 대답 (간단한 질문은 답만)
3. 나는 Ann 이름으로 호명, 너는 claude code 
4. 대화 마지막에 다음 할일 3가지 번호로 추천옵션 제시 그중 내가 번호를 답하면 그 번호에 해당하는 작업을 실행
5. 자세한 설명은 단계별 요청 시
6. 사실기반 답변, 불확실시 웹검색 또는 추정 표기
7. MCP 적극 활용 및 검증 후 추천


## 캐릭터브랜드 정보
### 쵸바(Choba) - 22종류
계란, 새우, 참치, 문어, 연어, 장어, 날치, 오이, 유부, 꽃게, 상어, 복어, 소세지, 햄, 마카롱, 붕어빵, 표고, 아보카도, 깻잎, 완두콩, 와사비락교, 단무지락교

### 코튼푸드(Cottonfood) - 28종류 
쌀알, 망개떡, 아보카도, 복숭아, 식빵, 햄버거, 풋고추, 홍고추, 가지, 당근, 바나나, 수박, 고추장떡볶이, 짜장떡볶이, 그린키위, 골드키위, 알밤, 스모어쿠키, 시루떡, 곶감, 스트롱베리, 오징어, 어묵, 고구마, 초코샘, 캔디바, 참외, 메론빵

### 코튼애니(Cottonani) - 여러 서브브랜드 존재
라이독(Liedog): 브라운, 회색, 네이비
리우(Liu) : 냥이,고미,토토
에스티베어(stbear) : blue,black

## 품목정보
볼체인토이/키링/낮잠쿠션/모찌방석/바디필로우

## 캐릭터영문변환

쵸바 캐릭터 목록 (22개)

계란 → egg
새우 → shrimp
참치 → tuna
문어 → octopus
연어 → salmon
장어 → eel
날치 → flying_fish_roe
오이 → cucumber
유부 → fried_tofu
꽃게 → crab
상어 → shark
복어 → bowfish
소세지 → sausage
햄 → ham
마카롱 → macaron
붕어빵 → fish_bread
표고 → mushroom
아보카도 → avocado
깻잎 → perilla_leaf
완두콩 → pea
와사비락교 → wasabi_rakkyo
단무지락교 → danmuji_rakkyo

코튼푸드 캐릭터 목록 (28개)

쌀알 → rice
망개떡 → manggaetteok
아보카도 → avocado
복숭아 → peach
식빵 → bread
햄버거 → hamburger
풋고추 → green_pepper
홍고추 → red_pepper
가지 → aubergine
당근 → carrot
바나나 → banana
수박 → watermelon
고추장떡볶이 → gochujang_tteokbokki
짜장떡볶이 → jajang_tteokbokki
그린키위 → greenkiwi
골드키위 → goldkiwi
알밤 → chestnut
스모어쿠키 → smore_cookies
시루떡 → sirutteok
곶감 → persimmon
스트롱베리 → strongberry
오징어 → squid
어묵 → fishcake
고구마 → sweetpotato
초코샘 → chocosam
캔디바 → candybar
참외 → korean_melon
메론빵 → melonbread
