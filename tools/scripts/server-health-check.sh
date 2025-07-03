#!/bin/bash

# 서버 상태 체크 스크립트
# 메모리, CPU, 디스크 사용량을 확인하고 문제가 있으면 알림

# 임계값 설정
MAX_MEMORY=80  # 메모리 사용률 80% 이상시 경고
MAX_CPU=90     # CPU 사용률 90% 이상시 경고
MAX_DISK=85    # 디스크 사용률 85% 이상시 경고

# 로그 파일
LOG_FILE="/home/sp1/88ERP/logs/health-check.log"

# 현재 시간
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 메모리 사용률 체크
MEMORY_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')

# CPU 사용률 체크 (1초 평균)
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print int($2)}')

# 디스크 사용률 체크
DISK_USAGE=$(df -h / | awk 'NR==2 {print int($5)}')

# PM2 프로세스 상태 체크
PM2_STATUS=$(pm2 list | grep "88erp-dashboard" | awk '{print $12}')

echo "[$TIMESTAMP] Health Check" >> $LOG_FILE
echo "Memory: ${MEMORY_USAGE}%, CPU: ${CPU_USAGE}%, Disk: ${DISK_USAGE}%" >> $LOG_FILE
echo "PM2 Status: $PM2_STATUS" >> $LOG_FILE

# 경고 조건 체크
WARNING=false

if [ $MEMORY_USAGE -gt $MAX_MEMORY ]; then
    echo "⚠️ WARNING: Memory usage is high: ${MEMORY_USAGE}%" >> $LOG_FILE
    WARNING=true
fi

if [ $CPU_USAGE -gt $MAX_CPU ]; then
    echo "⚠️ WARNING: CPU usage is high: ${CPU_USAGE}%" >> $LOG_FILE
    WARNING=true
fi

if [ $DISK_USAGE -gt $MAX_DISK ]; then
    echo "⚠️ WARNING: Disk usage is high: ${DISK_USAGE}%" >> $LOG_FILE
    WARNING=true
fi

if [ "$PM2_STATUS" != "online" ]; then
    echo "⚠️ WARNING: PM2 process is not online. Restarting..." >> $LOG_FILE
    pm2 restart 88erp-dashboard >> $LOG_FILE 2>&1
    WARNING=true
fi

# 메모리가 너무 높으면 PM2 재시작
if [ $MEMORY_USAGE -gt 85 ]; then
    echo "🔄 Restarting PM2 due to high memory usage..." >> $LOG_FILE
    pm2 restart 88erp-dashboard >> $LOG_FILE 2>&1
fi

echo "----------------------------------------" >> $LOG_FILE