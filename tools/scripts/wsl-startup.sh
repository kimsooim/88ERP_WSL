#!/bin/bash
# WSL 시작 시 자동 실행 스크립트

# 로그 파일
LOG_FILE="/home/sp1/88ERP/logs/wsl-startup.log"
mkdir -p /home/sp1/88ERP/logs

echo "===========================================" >> $LOG_FILE
echo "WSL Startup Script - $(date)" >> $LOG_FILE
echo "===========================================" >> $LOG_FILE

# PATH 설정
export PATH="/home/sp1/.npm-global/bin:$PATH"

# pm2 시작
echo "Starting PM2 services..." >> $LOG_FILE
if ! pgrep -f "PM2" > /dev/null; then
    pm2 resurrect >> $LOG_FILE 2>&1
    echo "PM2 started successfully" >> $LOG_FILE
else
    echo "PM2 is already running" >> $LOG_FILE
fi

# 웹대시보드 상태 확인
sleep 5
pm2 status >> $LOG_FILE 2>&1

echo "Startup script completed at $(date)" >> $LOG_FILE
echo "" >> $LOG_FILE