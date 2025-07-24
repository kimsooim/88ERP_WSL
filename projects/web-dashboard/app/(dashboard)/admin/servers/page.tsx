'use client';

import React, { useState, useEffect } from 'react';
import { FiServer, FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiDatabase, FiGlobe, FiCpu, FiGithub, FiGitBranch, FiSettings, FiTag, FiInfo, FiArrowRight, FiEdit2 } from 'react-icons/fi';
import { SiRedis, SiNginx, SiPostgresql, SiDocker } from 'react-icons/si';

interface DeploymentStatus {
  isDeploying: boolean;
  status: string;
  message: string;
  logs: string[];
  startedAt: Date | null;
  completedAt: Date | null;
}

interface Container {
  name: string;
  image: string;
  status: string;
  ports: string;
  icon: React.ReactNode;
}

interface Server {
  name: string;
  description: string;
  ip: string;
  domain?: string;
  status: 'online' | 'offline' | 'deploying';
  lastDeployed?: string;
  computer: string;
  computerType: string;
}

export default function ServersPage() {
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentHost, setCurrentHost] = useState<string>('');

  const servers: Server[] = [
    {
      name: '개발 서버',
      description: 'WSL Ubuntu 환경',
      ip: '172.20.158.172',
      status: 'online',
      computer: 'sp1',
      computerType: 'Windows Desktop'
    },
    {
      name: '운영 서버',
      description: 'WSL Rocky Linux',
      ip: '183.102.56.171',
      domain: 'db.88toy.co.kr',
      status: 'online',
      lastDeployed: '2025-07-01 14:30',
      computer: 'server',
      computerType: 'Windows 노트북'
    }
  ];

  const devContainers: Container[] = [
    {
      name: '88erp_web_dashboard',
      image: '88erp-web-dashboard',
      status: 'running',
      ports: '3010',
      icon: <FiGlobe className="text-blue-500" />,
    },
    {
      name: '88erp_db',
      image: 'postgres:15',
      status: 'running',
      ports: '5433',
      icon: <SiPostgresql className="text-blue-600" />,
    },
    {
      name: '88erp_redis',
      image: 'redis:7',
      status: 'running',
      ports: '6379',
      icon: <SiRedis className="text-red-500" />,
    },
    {
      name: '88erp_monitor',
      image: '88erp-monitor',
      status: 'running',
      ports: '3002',
      icon: <FiCpu className="text-purple-500" />,
    },
  ];

  const prodContainers: Container[] = [
    {
      name: '88erp-web',
      image: '88erp-production',
      status: 'running',
      ports: '80',
      icon: <FiGlobe className="text-blue-500" />,
    },
    {
      name: '88erp-nginx',
      image: 'nginx:alpine',
      status: 'running',
      ports: '443',
      icon: <SiNginx className="text-green-600" />,
    },
    {
      name: '88erp-db',
      image: 'postgres:15',
      status: 'running',
      ports: '5432',
      icon: <SiPostgresql className="text-blue-600" />,
    },
    {
      name: '88erp-n8n',
      image: 'n8nio/n8n',
      status: 'running',
      ports: '5678',
      icon: <FiGitBranch className="text-orange-500" />,
    },
  ];

  // 배포 상태 확인
  const checkDeploymentStatus = async () => {
    try {
      const response = await fetch('/api/deploy');
      const data = await response.json();
      setDeploymentStatus(data);
    } catch (error) {
      console.error('Failed to check deployment status:', error);
    }
  };

  // 새로고침 함수
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await checkDeploymentStatus();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // 배포 시작
  const startDeployment = async () => {
    if (isLoading || deploymentStatus?.isDeploying) return;

    const confirmed = window.confirm('정말로 운영 서버에 배포하시겠습니까?');
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token', // 실제로는 NextAuth 토큰 사용
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDeploymentStatus(data.status);
        setShowLogs(true);
        
        // 상태 폴링 시작
        const pollInterval = setInterval(async () => {
          await checkDeploymentStatus();
          if (deploymentStatus && !deploymentStatus.isDeploying) {
            clearInterval(pollInterval);
          }
        }, 2000);
      } else {
        const error = await response.json();
        alert(`배포 실패: ${error.error}`);
      }
    } catch (error) {
      alert('배포 요청 중 오류가 발생했습니다.');
      console.error('Deployment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 상태 확인 및 호스트 정보 가져오기
  useEffect(() => {
    checkDeploymentStatus();
    // 현재 호스트 확인
    if (typeof window !== 'undefined') {
      setCurrentHost(window.location.hostname);
    }
  }, []);

  // 배포 중일 때 주기적으로 상태 확인
  useEffect(() => {
    if (deploymentStatus?.isDeploying) {
      const interval = setInterval(checkDeploymentStatus, 2000);
      return () => clearInterval(interval);
    }
  }, [deploymentStatus?.isDeploying]);

  const getStatusIcon = () => {
    if (!deploymentStatus) return null;
    
    switch (deploymentStatus.status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" size={20} />;
      case 'failed':
        return <FiXCircle className="text-red-500" size={20} />;
      case 'idle':
        return <FiServer className="text-gray-500" size={20} />;
      default:
        return <FiRefreshCw className="text-blue-500 animate-spin" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">서버관리</h1>
          <p className="text-gray-600 mt-1">서버 상태를 관리하고 배포를 실행합니다</p>
        </div>
        <a
          href="/admin/devlog"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <FiEdit2 className="mr-2" />
          개발로그
        </a>
      </div>

      {/* 상단 영역 - 개발/운영 컴퓨터 배포 관리 (2열) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 개발 컴퓨터에서 배포 관리 카드 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiRefreshCw /> 개발 컴퓨터에서
            </h3>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm text-gray-600">
                {deploymentStatus?.isDeploying ? '배포 중' : 
                 deploymentStatus?.status === 'completed' ? '배포 완료' :
                 deploymentStatus?.status === 'failed' ? '배포 실패' : '대기 중'}
              </span>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-1.5 rounded-md transition-all ${
                  isRefreshing 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="새로고침"
              >
                <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          <div className="p-4">
            {/* 현재 컴퓨터 정보 */}
            {currentHost && (
              <div className={`mb-3 p-3 rounded-lg border ${
                currentHost === 'localhost' || currentHost.includes('172.20.158.172')
                  ? 'bg-blue-50 border-blue-200'
                  : currentHost.includes('183.102.56.171') || currentHost === 'db.88toy.co.kr'
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-sm font-medium ${
                  currentHost === 'localhost' || currentHost.includes('172.20.158.172')
                    ? 'text-blue-800'
                    : currentHost.includes('183.102.56.171') || currentHost === 'db.88toy.co.kr'
                    ? 'text-purple-800'
                    : 'text-gray-800'
                }`}>
                  💻 해당 컴퓨터는 {
                    currentHost === 'localhost' || currentHost.includes('172.20.158.172')
                      ? '개발 컴퓨터입니다.'
                      : currentHost.includes('183.102.56.171') || currentHost === 'db.88toy.co.kr'
                      ? '운영 컴퓨터입니다.'
                      : '외부 컴퓨터입니다.'
                  }
                </p>
              </div>
            )}
            
            {/* 배포 워크플로우 시각화 */}
            <div className="mb-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <FiServer className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium">개발</p>
                </div>
                
                <div className="flex items-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-green-400 rounded relative">
                    {deploymentStatus?.isDeploying && deploymentStatus.status === 'sync-to-prod' && (
                      <div className="absolute inset-0 h-1 bg-blue-500 rounded animate-pulse"></div>
                    )}
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                </div>
                
                <div className="flex-1 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-1 ${
                    deploymentStatus?.status === 'completed' || deploymentStatus?.status === 'verify-github' 
                      ? 'bg-green-500' : 'bg-green-100'
                  }`}>
                    <FiGithub className={`w-6 h-6 ${
                      deploymentStatus?.status === 'completed' || deploymentStatus?.status === 'verify-github'
                        ? 'text-white' : 'text-green-600'
                    }`} />
                  </div>
                  <p className="text-xs font-medium">GitHub</p>
                  {deploymentStatus?.status === 'completed' && (
                    <p className="text-xs text-green-600 mt-1">동기화 완료</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-purple-400 rounded">
                    <div className="text-center text-xs text-gray-500 mt-2">5분마다</div>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                </div>
                
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-1">
                    <FiServer className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium">운영</p>
                </div>
              </div>
            </div>

            {/* 배포 상태 메시지 */}
            {deploymentStatus && (
              <div className="mb-4">
                {deploymentStatus.status === 'idle' && deploymentStatus.completedAt && (
                  <p className="text-sm text-gray-600">
                    마지막 배포: {new Date(deploymentStatus.completedAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })}
                  </p>
                )}
                
                {deploymentStatus.isDeploying && (
                  <p className="text-sm text-blue-600 font-medium">
                    {deploymentStatus.message}
                  </p>
                )}
                
                {deploymentStatus.status === 'completed' && (
                  <p className="text-sm text-green-600 mt-2">
                    배포가 성공적으로 완료되었습니다!
                  </p>
                )}
                
                {deploymentStatus.status === 'failed' && (
                  <p className="text-sm text-red-600 mt-2">
                    배포 중 오류가 발생했습니다. 로그를 확인해주세요.
                  </p>
                )}
              </div>
            )}

            {/* 배포 버튼 */}
            <div className="flex items-center gap-4">
              <button
                onClick={startDeployment}
                disabled={isLoading || deploymentStatus?.isDeploying}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isLoading || deploymentStatus?.isDeploying
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading || deploymentStatus?.isDeploying ? (
                  <>
                    <FiRefreshCw className="inline mr-2 animate-spin" />
                    배포 중...
                  </>
                ) : (
                  '운영 서버에 배포'
                )}
              </button>

              {deploymentStatus?.logs && deploymentStatus.logs.length > 0 && (
                <button
                  onClick={() => setShowLogs(!showLogs)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {showLogs ? '로그 숨기기' : '로그 보기'}
                </button>
              )}
            </div>

            {/* 배포 로그 */}
            {showLogs && deploymentStatus?.logs && deploymentStatus.logs.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">배포 로그</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-64 overflow-y-auto">
                  <pre className="text-xs font-mono">
                    {deploymentStatus.logs.join('\n')}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 운영 컴퓨터에서 배포 관리 카드 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiServer /> 운영 컴퓨터에서
            </h3>
            <span className="text-sm text-gray-600">GitHub에서 가져오기</span>
          </div>
          <div className="p-4">
            {/* 현재 컴퓨터 정보 */}
            {currentHost && (
              <div className={`mb-3 p-3 rounded-lg border ${
                currentHost === 'localhost' || currentHost.includes('172.20.158.172')
                  ? 'bg-blue-50 border-blue-200'
                  : currentHost.includes('183.102.56.171') || currentHost === 'db.88toy.co.kr'
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-sm font-medium ${
                  currentHost === 'localhost' || currentHost.includes('172.20.158.172')
                    ? 'text-blue-800'
                    : currentHost.includes('183.102.56.171') || currentHost === 'db.88toy.co.kr'
                    ? 'text-purple-800'
                    : 'text-gray-800'
                }`}>
                  💻 해당 컴퓨터는 {
                    currentHost === 'localhost' || currentHost.includes('172.20.158.172')
                      ? '개발 컴퓨터입니다.'
                      : currentHost.includes('183.102.56.171') || currentHost === 'db.88toy.co.kr'
                      ? '운영 컴퓨터입니다.'
                      : '외부 컴퓨터입니다.'
                  }
                </p>
              </div>
            )}
            
            {/* 배포 워크플로우 시각화 */}
            <div className="mb-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <FiGithub className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs font-medium">GitHub</p>
                </div>
                
                <div className="flex items-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-purple-400 rounded">
                    <div className="text-center text-xs text-gray-500 mt-2">수동 실행</div>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                </div>
                
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-1">
                    <FiServer className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium">운영</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">운영서버에 직접 접속하여 실행하세요:</p>
                <code className="text-xs bg-yellow-100 px-2 py-1 rounded block mt-1 font-mono">
                  cd /home/server/SERVER && git pull origin main
                </code>
              </div>
              
              <button
                onClick={() => alert('운영서버에 SSH로 접속하여 직접 실행해주세요.\n\nssh root@192.168.32.128\ncd /home/server/SERVER\ngit pull origin main\ndocker-compose down\ndocker-compose up -d --build')}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                운영서버 배포 명령어 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역 - 서버 상태 및 서비스 URL (3열) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 서비스 접속 URL 카드 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiGlobe /> 서비스 접속 URL
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">88ERP (개발)</p>
                    <p className="text-xs text-gray-500">웹 대시보드</p>
                  </div>
                  <a href="http://localhost:3010" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 text-xs">
                    localhost:3010
                  </a>
                </div>
              </div>
              
              <div className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">88ERP (운영)</p>
                    <p className="text-xs text-gray-500">웹 대시보드</p>
                  </div>
                  <a href="https://db.88toy.co.kr" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 text-xs">
                    db.88toy.co.kr
                  </a>
                </div>
              </div>
              
              <div className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">n8n</p>
                    <p className="text-xs text-gray-500">자동화 도구</p>
                  </div>
                  <a href="http://183.102.56.171:5678/home/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 text-xs">
                    183.102.56.171:5678
                  </a>
                </div>
              </div>
              
              <div className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">PM2</p>
                    <p className="text-xs text-gray-500">프로세스 관리</p>
                  </div>
                  <a href="http://localhost:3002" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 text-xs">
                    localhost:3002
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 개발 서버 정보 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiServer /> 개발 서버
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-2 mb-4">
              <p className="text-sm font-semibold text-gray-800">컴퓨터: sp1</p>
              <p className="text-xs text-gray-500">Windows Desktop</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">호스트: localhost (WSL)</p>
                <p className="text-sm text-gray-600">IP: 172.20.158.172</p>
                <p className="text-sm text-gray-600">브랜치: main</p>
                <p className="text-sm text-gray-600">저장소: 88ERP_WSL</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600">정상 작동중</span>
              </div>
            </div>
            
            {/* 컨테이너 정보 */}
            <div className="border-t pt-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Docker 컨테이너</h4>
              <div className="space-y-1">
                {devContainers.map((container) => (
                  <div key={container.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      {container.icon}
                      <span className="text-xs text-gray-600">{container.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">:{container.ports}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        container.status === 'running' ? 'bg-green-400' : 'bg-gray-300'
                      }`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 운영 서버 정보 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiServer /> 운영 서버
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-2 mb-4">
              <p className="text-sm font-semibold text-gray-800">컴퓨터: server</p>
              <p className="text-xs text-gray-500">Windows 노트북</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">호스트: db.88toy.co.kr</p>
                <p className="text-sm text-gray-600">공인 IP: 183.102.56.171</p>
                <p className="text-sm text-gray-600">내부 IP: 192.168.32.128</p>
                <p className="text-sm text-gray-600">저장소: 88ERP_server</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600">정상 작동중</span>
              </div>
            </div>
            
            {/* 컨테이너 정보 */}
            <div className="border-t pt-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Docker 컨테이너</h4>
              <div className="space-y-1">
                {prodContainers.map((container) => (
                  <div key={container.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      {container.icon}
                      <span className="text-xs text-gray-600">{container.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">:{container.ports}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        container.status === 'running' ? 'bg-green-400' : 'bg-gray-300'
                      }`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 자동 배포 시스템 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiInfo /> 자동 배포 시스템
            </h3>
          </div>
          <div className="p-4 space-y-2">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">• 운영서버는 내부 네트워크에 위치</p>
              <p className="text-xs text-yellow-800">• GitHub를 통한 코드 동기화</p>
              <p className="text-xs text-yellow-800">• 5분마다 자동 체크 및 배포</p>
            </div>
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-700">운영서버 스크립트:</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded block mt-1 break-all">
                /home/server/SERVER/scripts/prod-auto-deploy.sh
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* 시스템 리소스 (3열) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 시스템 리소스 (개발 서버) */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiCpu /> 시스템 리소스
            </h3>
            <span className="text-xs text-gray-500">개발 서버 (SP1)</span>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">CPU 사용률</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">메모리 사용률</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">디스크 사용률</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-3 text-center">
                실시간 데이터는 추후 연동 예정
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}