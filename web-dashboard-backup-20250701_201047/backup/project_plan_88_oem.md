# 📘 88ERP 프로젝트 MCP 지침 (Claude Desktop용)

## 1. 프로젝트 개요

- Notion 기반 업무관리 자동화 대시보드 시스템
- 실시간 메모리 갱신, 통계 분석, 사용자 API 제공 기능 포함

## 2. 개발 환경

- 사용 클라이언트: Claude Desktop
- 기술스택: Next.js 14, Tailwind CSS, Notion API
- 프로젝트 루트 경로: `<PROJECT_ROOT>` → 실제 경로: `\\ds920\web\88erpboard`
- 도메인: `db.88toy.co.kr`

## 3. 사용 MCP 목록

- shrimp (작업 계획 및 실행 관리)
- terminal (npm, git 등 명령 실행)
- git (버전 관리)
- edit-file-lines (정밀 파일 편집)
- context7 (기술 문서 질의)
- googleSearch (실시간 정보 검색)
- playwright (도메인 접속 테스트)

## 4. Claude 설정 지침

- 지침 탭에 본 내용 삽입
- 트리거 키워드 설정: "작업 시작", "작업 계획", "할 일 정리" 등
- 프로젝트 관련 파일 write 시 처음에는 일부만 쓰고 이후 append 방식으로 저장해야 함
- 작업이 진행될 때마다 `project_plan.md` 파일에 그 내용을 append 형식으로 기록해야 함

## 5. MCP 별 사용법 요약

### 🦐 Shrimp Task Manager MCP

- `{ "tool": "plan_task", "parameters": { "description": "Notion 실데이터 연동" } }`
- `{ "tool": "execute_task", "parameters": { "id": "TASK-2025-001" } }`
- `{ "tool": "complete_task", "parameters": { "id": "TASK-2025-001" } }`

### 💻 Terminal MCP

- `{ "tool": "terminal", "parameters": { "cmd": "npm run build" } }`
- `{ "tool": "terminal", "parameters": { "cmd": "dir" } }`

### 🧠 Context7 MCP

- `{ "tool": "context7", "parameters": { "query": "Next.js 14 middleware 예제" } }`

### 🔍 Google Search MCP

- `{ "tool": "googleSearch", "parameters": { "query": "Notion API 통합 방법" } }`

### ✏️ Edit File Lines MCP

- `{ "tool": "edit-file-lines", "parameters": { "file": "config.js", "updates": [{ "pattern": ".*", "replacement": "module.exports = {...}" }] } }`

### 🧪 Playwright MCP

- `{ "tool": "playwright", "parameters": { "action": "goto", "url": "http://db.88toy.co.kr" } }`

### 🌱 Git MCP

- git 프로그램 설치 후 루트 폴더(\ds920\web\88erpboard)에서 다음 실행:

```sh
cd \\ds920\web\88erpboard
git init
```

- 이후 MCP 명령 사용 예:

```json
{ "tool": "git", "parameters": { "subtool": "RunCommand", "path": "C:/path", "command": "cmd", "args": ["/c", "git add . && git commit -m '초기 커밋'"] } }
```

## 6. 기타 유의사항

- `project_plan.md`는 모든 작업 로그의 중심입니다. 변경사항은 이 문서에 반영합니다.
- 작업마다 Claude가 MCP를 통해 계획하고, 실행하며, 완료 상태로 관리합니다.
- 문제가 발생하면 Claude에게 "왜 안 되는지 확인해줘"라고 요청하세요.

## 7. 참조 영상

- [https://youtu.be/ydckNzW9KN0](https://youtu.be/ydckNzW9KN0)
- [https://youtu.be/GRtrfdSeR20](https://youtu.be/GRtrfdSeR20)
- [https://youtu.be/78bgwKyJNBI](https://youtu.be/78bgwKyJNBI)

