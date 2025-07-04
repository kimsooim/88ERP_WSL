'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ChangeLog {
  id: string;
  timestamp: string;
  user: string;
  type: 'edit' | 'create' | 'delete' | 'settings';
  category: string;
  target: string;
  field: string;
  oldValue: any;
  newValue: any;
  ip?: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
  details?: string;
}

interface AccessLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'login' | 'logout' | 'session_expired';
  ip: string;
  userAgent?: string;
  success: boolean;
  details?: string;
}

interface LogContextType {
  changeLogs: ChangeLog[];
  systemLogs: SystemLog[];
  accessLogs: AccessLog[];
  addChangeLog: (log: Omit<ChangeLog, 'id' | 'timestamp'>) => void;
  addSystemLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;
  addAccessLog: (log: Omit<AccessLog, 'id' | 'timestamp'>) => void;
  getChangeLogs: () => ChangeLog[];
  getSystemLogs: () => SystemLog[];
  getAccessLogs: () => AccessLog[];
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const useLog = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error('useLog must be used within a LogProvider');
  }
  return context;
};

export const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);

  const addChangeLog = useCallback((log: Omit<ChangeLog, 'id' | 'timestamp'>) => {
    const newLog: ChangeLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\. /g, '-').replace(/\./g, '').replace(/:/g, ':'),
      ip: '192.168.1.100' // 실제 환경에서는 실제 IP를 가져와야 함
    };
    
    setChangeLogs(prev => [newLog, ...prev]);
    
    // localStorage에도 저장
    const savedLogs = localStorage.getItem('changeLogs');
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    logs.unshift(newLog);
    // 최대 1000개까지만 저장
    if (logs.length > 1000) {
      logs.pop();
    }
    localStorage.setItem('changeLogs', JSON.stringify(logs));
  }, []);

  const addSystemLog = useCallback((log: Omit<SystemLog, 'id' | 'timestamp'>) => {
    const newLog: SystemLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\. /g, '-').replace(/\./g, '').replace(/:/g, ':')
    };
    
    setSystemLogs(prev => [newLog, ...prev]);
    
    // localStorage에도 저장
    const savedLogs = localStorage.getItem('systemLogs');
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    logs.unshift(newLog);
    // 최대 1000개까지만 저장
    if (logs.length > 1000) {
      logs.pop();
    }
    localStorage.setItem('systemLogs', JSON.stringify(logs));
  }, []);

  const getChangeLogs = useCallback(() => {
    // localStorage에서 로그 불러오기
    const savedLogs = localStorage.getItem('changeLogs');
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setChangeLogs(logs);
      return logs;
    }
    return changeLogs;
  }, [changeLogs]);

  const getSystemLogs = useCallback(() => {
    // localStorage에서 로그 불러오기
    const savedLogs = localStorage.getItem('systemLogs');
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setSystemLogs(logs);
      return logs;
    }
    return systemLogs;
  }, [systemLogs]);

  const addAccessLog = useCallback((log: Omit<AccessLog, 'id' | 'timestamp'>) => {
    const newLog: AccessLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\. /g, '-').replace(/\./g, '').replace(/:/g, ':')
    };
    
    setAccessLogs(prev => [newLog, ...prev]);
    
    // localStorage에도 저장
    const savedLogs = localStorage.getItem('accessLogs');
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    logs.unshift(newLog);
    // 최대 1000개까지만 저장
    if (logs.length > 1000) {
      logs.pop();
    }
    localStorage.setItem('accessLogs', JSON.stringify(logs));
  }, []);

  const getAccessLogs = useCallback(() => {
    // localStorage에서 로그 불러오기
    const savedLogs = localStorage.getItem('accessLogs');
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setAccessLogs(logs);
      return logs;
    }
    return accessLogs;
  }, [accessLogs]);

  // 컴포넌트 마운트 시 localStorage에서 로그 불러오기
  React.useEffect(() => {
    getChangeLogs();
    getSystemLogs();
    getAccessLogs();
  }, []);

  return (
    <LogContext.Provider value={{
      changeLogs,
      systemLogs,
      accessLogs,
      addChangeLog,
      addSystemLog,
      addAccessLog,
      getChangeLogs,
      getSystemLogs,
      getAccessLogs
    }}>
      {children}
    </LogContext.Provider>
  );
};