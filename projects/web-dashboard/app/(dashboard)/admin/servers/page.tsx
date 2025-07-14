'use client';

import { useState, useEffect } from 'react';
import { FiServer, FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiDatabase, FiGlobe, FiCpu } from 'react-icons/fi';
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

export default function AdminServersPage() {
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  // 개발 서버 컨테이너 정보
  const devContainers: Container[] = [
    {
      name: '88erp_web_dashboard',
      image: '88erp-web-dashboard',
      status: 'running',
      ports: '3000',
      icon: <FiGlobe className="text-blue-500" />,
    },
    {
      name: '88erp_db',
      image: 'postgres:15-alpine',
      status: 'running',
      ports: '5433',
      icon: <SiPostgresql className="text-blue-600" />,
    },
    {
      name: '88erp_redis',
      image: 'redis:7-alpine',
      status: 'running',
      ports: '6379',
      icon: <SiRedis className="text-red-500" />,
    },
    {
      name: '88erp_monitor',
      image: '88erp-monitor',
      status: 'restarting',
      ports: '3002',
      icon: <FiCpu className="text-purple-500" />,
    },
  ];

  // 운영 서버 컨테이너 정보
  const prodContainers: Container[] = [
    {
      name: '88erp-nginx',
      image: 'nginx:alpine',
      status: 'running',
      ports: '80, 443',
      icon: <SiNginx className="text-green-600" />,
    },
    {
      name: '88erp-webapp',
      image: '88erp-webapp',
      status: 'running',
      ports: '3000',
      icon: <FiGlobe className="text-blue-500" />,
    },
    {
      name: '88erp-n8n',
      image: 'n8nio/n8n',
      status: 'running',
      ports: '5678',
      icon: <FiCpu className="text-orange-500" />,
    },
    {
      name: '88erp-postgres',
      image: 'postgres:15',
      status: 'running',
      ports: '5432',
      icon: <SiPostgresql className="text-blue-600" />,
    },
    {
      name: '88erp-redis',
      image: 'redis:alpine',
      status: 'running',
      ports: '6379',
      icon: <SiRedis className="text-red-500" />,
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

  // 컴포넌트 마운트 시 상태 확인
  useEffect(() => {
    checkDeploymentStatus();
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">서버관리</h1>
        <p className="text-gray-600 mt-1">서버 상태를 관리하고 배포를 실행합니다</p>
      </div>

      {/* 서버 상태 카드 - 3열 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 개발 서버 정보 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiServer /> 개발 서버
            </h3>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-800">컴퓨터: sp1</p>
            <p className="text-xs text-gray-500 mb-2">Windows Desktop</p>
            <p className="text-sm text-gray-600">호스트: localhost (WSL)</p>
            <p className="text-sm text-gray-600">브랜치: main</p>
            <p className="text-sm text-gray-600">저장소: 88ERP_WSL</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-green-600">정상 작동중</span>
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
          <div className="p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-800">컴퓨터: server</p>
            <p className="text-xs text-gray-500 mb-2">Windows 노트북</p>
            <p className="text-sm text-gray-600">호스트: 183.102.56.171</p>
            <p className="text-sm text-gray-600">도메인: db.88toy.co.kr</p>
            <p className="text-sm text-gray-600">저장소: 88ERP_server</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-green-600">정상 작동중</span>
            </div>
          </div>
        </div>

        {/* 서비스 접속 정보 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <FiGlobe /> 서비스 접속
            </h3>
          </div>
          <div className="p-4 space-y-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">웹 대시보드</p>
              <a href="http://db.88toy.co.kr" target="_blank" rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:underline">
                db.88toy.co.kr
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">n8n 자동화</p>
              <a href="http://183.102.56.171:5678/home/" target="_blank" rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline">
                183.102.56.171:5678/home
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">개발 서버</p>
              <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline">
                localhost:3000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 컨테이너 정보 - 2열 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 개발 서버 컨테이너 */}
        <div className="card">
          <div className="card-header">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <SiDocker /> 개발 서버 Docker 컨테이너
            </h4>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {devContainers.map((container) => (
                <div key={container.name} className="flex items-center justify-between text-sm py-1">
                  <div className="flex items-center gap-2">
                    {container.icon}
                    <span className="font-mono text-xs">{container.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xs">:{container.ports}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      container.status === 'running' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {container.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 운영 서버 컨테이너 */}
        <div className="card">
          <div className="card-header">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <SiDocker /> 운영 서버 Docker 컨테이너
            </h4>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {prodContainers.map((container) => (
                <div key={container.name} className="flex items-center justify-between text-sm py-1">
                  <div className="flex items-center gap-2">
                    {container.icon}
                    <span className="font-mono text-xs">{container.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xs">:{container.ports}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      container.status === 'running' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {container.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 배포 관리 카드 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">배포 관리</h3>
        </div>
        <div className="p-6 space-y-4">
          {/* 배포 상태 */}
          {deploymentStatus && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <span className="font-medium">{deploymentStatus.message}</span>
                </div>
                {deploymentStatus.startedAt && (
                  <span className="text-sm text-gray-500">
                    <FiClock className="inline mr-1" />
                    {new Date(deploymentStatus.startedAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
              
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

            {deploymentStatus?.logs.length > 0 && (
              <button
                onClick={() => setShowLogs(!showLogs)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showLogs ? '로그 숨기기' : '로그 보기'}
              </button>
            )}
          </div>

          {/* 배포 로그 */}
          {showLogs && deploymentStatus?.logs.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">배포 로그</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs font-mono">
                  {deploymentStatus.logs.join('\n')}
                </pre>
              </div>
            </div>
          )}

          {/* 배포 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-blue-900 mb-2">배포 프로세스</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>개발 서버의 코드를 88ERP_server 저장소로 동기화</li>
              <li>운영 서버에서 최신 코드 가져오기 (git pull)</li>
              <li>Docker 이미지 재빌드</li>
              <li>서비스 재시작 및 헬스체크</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}