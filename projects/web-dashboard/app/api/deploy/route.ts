import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// 배포 상태 저장 (실제로는 Redis나 DB 사용 권장)
let deploymentStatus = {
  isDeploying: false,
  status: 'idle',
  message: '',
  logs: [] as string[],
  startedAt: null as Date | null,
  completedAt: null as Date | null,
};

export async function GET() {
  return NextResponse.json(deploymentStatus);
}

export async function POST(request: Request) {
  try {
    // 인증 확인 (실제로는 NextAuth 세션 확인)
    const { authorization } = request.headers;
    if (!authorization || !authorization.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 이미 배포 중인지 확인
    if (deploymentStatus.isDeploying) {
      return NextResponse.json(
        { error: 'Deployment already in progress' },
        { status: 409 }
      );
    }

    // 배포 시작
    deploymentStatus = {
      isDeploying: true,
      status: 'starting',
      message: '배포를 시작합니다...',
      logs: [],
      startedAt: new Date(),
      completedAt: null,
    };

    // 비동기로 배포 실행
    executeDeployment();

    return NextResponse.json({
      message: 'Deployment started',
      status: deploymentStatus,
    });
  } catch (error) {
    console.error('Deployment error:', error);
    return NextResponse.json(
      { error: 'Deployment failed', details: error.message },
      { status: 500 }
    );
  }
}

async function executeDeployment() {
  const steps = [
    {
      name: 'sync-to-prod',
      command: 'bash /home/sp1/88ERP/scripts/sync-to-prod-repo.sh',
      message: '운영 서버 저장소로 코드 동기화 중...',
    },
    {
      name: 'deploy-to-server',
      command: `ssh -i ~/.ssh/88erp_deploy_key -o StrictHostKeyChecking=no server@183.102.56.171 '/home/server/SERVER/scripts/deploy-receiver.sh'`,
      message: '운영 서버에 배포 중...',
    },
    {
      name: 'wait-for-startup',
      command: 'sleep 15',
      message: '서비스 시작 대기 중...',
    },
    {
      name: 'health-check',
      command: 'curl -f https://db.88toy.co.kr/api/health',
      message: '운영 서버 헬스체크 중...',
    },
    {
      name: 'verify-deployment',
      command: `ssh -i ~/.ssh/88erp_deploy_key -o StrictHostKeyChecking=no server@183.102.56.171 'docker ps | grep 88erp'`,
      message: '배포 상태 확인 중...',
    },
  ];

  try {
    for (const step of steps) {
      deploymentStatus.status = step.name;
      deploymentStatus.message = step.message;
      deploymentStatus.logs.push(`[${new Date().toISOString()}] ${step.message}`);

      try {
        const { stdout, stderr } = await execAsync(step.command);
        if (stdout) {
          deploymentStatus.logs.push(`[STDOUT] ${stdout}`);
        }
        if (stderr) {
          deploymentStatus.logs.push(`[STDERR] ${stderr}`);
        }
      } catch (error) {
        deploymentStatus.logs.push(`[ERROR] ${step.name}: ${error.message}`);
        throw error;
      }
    }

    // 배포 성공
    deploymentStatus.status = 'completed';
    deploymentStatus.message = '배포가 성공적으로 완료되었습니다!';
    deploymentStatus.isDeploying = false;
    deploymentStatus.completedAt = new Date();
    deploymentStatus.logs.push(`[${new Date().toISOString()}] 배포 완료!`);

  } catch (error) {
    // 배포 실패
    deploymentStatus.status = 'failed';
    deploymentStatus.message = `배포 실패: ${error.message}`;
    deploymentStatus.isDeploying = false;
    deploymentStatus.completedAt = new Date();
    deploymentStatus.logs.push(`[${new Date().toISOString()}] 배포 실패: ${error.message}`);
  }
}