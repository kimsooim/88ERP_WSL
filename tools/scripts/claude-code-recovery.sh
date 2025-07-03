#!/bin/bash

# Claude Code 자동 복구 스크립트
# Claude Code가 다운되었을 때 자동으로 재시작 시도

LOG_FILE="/home/sp1/88ERP/logs/claude-code-recovery.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Claude Code 상태 체크" >> $LOG_FILE

# Claude Code 프로세스 확인
CLAUDE_PROCESS=$(ps aux | grep -E "claude-code|CLAUDE_CODE" | grep -v grep | wc -l)

if [ $CLAUDE_PROCESS -eq 0 ]; then
    echo "[$TIMESTAMP] ⚠️ Claude Code가 실행중이지 않습니다!" >> $LOG_FILE
    
    # 복구 시도
    echo "[$TIMESTAMP] 🔄 Claude Code 재시작 시도..." >> $LOG_FILE
    
    # Claude Code를 백그라운드로 재시작
    # 주의: 실제 Claude Code 시작 명령어로 변경 필요
    # claude-code start 또는 적절한 명령어 사용
    
    # 예시 (실제 명령어로 교체 필요):
    # nohup claude-code >> $LOG_FILE 2>&1 &
    
    echo "[$TIMESTAMP] ℹ️ Claude Code는 수동으로 재시작해야 합니다." >> $LOG_FILE
    echo "[$TIMESTAMP] 터미널에서 'claude-code' 명령을 실행하세요." >> $LOG_FILE
    
    # 알림 파일 생성 (웹 모니터에서 확인용)
    echo "Claude Code Down - Manual restart required" > /home/sp1/88ERP/logs/claude-code-alert.txt
else
    echo "[$TIMESTAMP] ✅ Claude Code 정상 작동중 (프로세스: $CLAUDE_PROCESS개)" >> $LOG_FILE
    
    # 알림 파일 제거
    rm -f /home/sp1/88ERP/logs/claude-code-alert.txt
fi

# PM2 및 웹대시보드 상태도 함께 체크
PM2_STATUS=$(pm2 list | grep "88erp-dashboard" | awk '{print $12}')
echo "[$TIMESTAMP] PM2 Dashboard Status: $PM2_STATUS" >> $LOG_FILE

# 메모리 사용량 체크 (Claude Code가 메모리를 많이 사용할 수 있음)
MEMORY_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
echo "[$TIMESTAMP] Memory Usage: ${MEMORY_USAGE}%" >> $LOG_FILE

if [ $MEMORY_USAGE -gt 90 ]; then
    echo "[$TIMESTAMP] ⚠️ 메모리 사용량이 매우 높습니다! 시스템 재시작을 고려하세요." >> $LOG_FILE
fi

echo "----------------------------------------" >> $LOG_FILE