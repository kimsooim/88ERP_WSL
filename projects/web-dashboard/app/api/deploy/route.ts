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
    // 인증 확인 (임시로 비활성화)
    // const { authorization } = request.headers;
    // if (!authorization || !authorization.includes('admin')) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // 이미 배포 중인지 확인
    if (deploymentStatus.isDeploying) {
      return NextResponse.json(
        { error: 'Deployment already in progress' },
        { status: 409 }
      );
    }

    // 배포 시작 (이전 completedAt 유지)
    const previousCompletedAt = deploymentStatus.completedAt;
    deploymentStatus = {
      isDeploying: true,
      status: 'starting',
      message: '배포를 시작합니다...',
      logs: [],
      startedAt: new Date(),
      completedAt: previousCompletedAt, // 이전 배포 완료 시간 유지
    };

    // 비동기로 배포 실행
    executeDeployment();

    return NextResponse.json({
      message: 'Deployment started',
      status: deploymentStatus,
    });
  } catch (error: any) {
    console.error('Deployment error:', error);
    return NextResponse.json(
      { error: 'Deployment failed', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

async function executeDeployment() {
  const steps = [
    {
      name: 'setup-environment',
      command: 'chown -R root:root /root/.ssh && chmod 700 /root/.ssh && chmod 600 /root/.ssh/config /root/.ssh/*_key && chmod 644 /root/.ssh/*.pub && git config --global user.email "88erp@sp1.local" && git config --global user.name "88ERP Deploy" && git config --global --add safe.directory /home/sp1/88ERP',
      message: '배포 환경 설정 중...',
    },
    {
      name: 'sync-to-prod',
      command: 'cd /home/sp1/88ERP && bash scripts/sync-to-prod-repo.sh',
      message: '운영 서버 저장소로 코드 동기화 중...',
      successPattern: 'To github.com:kimsooim/88ERP_server.git',
    },
    {
      name: 'verify-github',
      command: 'echo "✅ GitHub 동기화 성공! 운영서버가 5분 이내에 자동으로 배포를 시작합니다."',
      message: '배포 완료 확인 중...',
    },
  ];

  try {
    for (const step of steps) {
      deploymentStatus.status = step.name;
      deploymentStatus.message = step.message;
      deploymentStatus.logs.push(`[${new Date().toISOString()}] ${step.message}`);

      try {
        deploymentStatus.logs.push(`[CMD] ${step.command}`);
        const { stdout, stderr } = await execAsync(step.command, { timeout: 120000 }); // 2분 타임아웃
        if (stdout) {
          // 긴 출력은 줄여서 표시
          const shortStdout = stdout.length > 500 ? stdout.substring(0, 500) + '...[출력 생략]' : stdout;
          deploymentStatus.logs.push(`[STDOUT] ${shortStdout}`);
        }
        if (stderr) {
          // Git의 progress 메시지는 무시
          const filteredStderr = stderr
            .split('\n')
            .filter(line => !line.includes('Updating files:') && !line.includes('%'))
            .join('\n');
          if (filteredStderr.trim()) {
            const shortStderr = filteredStderr.length > 500 ? filteredStderr.substring(0, 500) + '...[출력 생략]' : filteredStderr;
            deploymentStatus.logs.push(`[STDERR] ${shortStderr}`);
          }
        }
        
        // GitHub 동기화 성공 확인
        if (step.name === 'sync-to-prod' && (step as any).successPattern) {
          const fullOutput = stdout + stderr;
          if (!fullOutput.includes((step as any).successPattern)) {
            throw new Error('GitHub 동기화 실패: 저장소에 푸시되지 않았습니다.');
          }
        }
      } catch (error: any) {
        deploymentStatus.logs.push(`[ERROR] ${step.name}: ${error?.message || 'Unknown error'}`);
        if (error?.code) {
          deploymentStatus.logs.push(`[ERROR_CODE] ${error.code}`);
        }
        if (error?.signal) {
          deploymentStatus.logs.push(`[ERROR_SIGNAL] ${error.signal}`);
        }
        throw error;
      }
    }

    // 배포 성공
    deploymentStatus.status = 'completed';
    deploymentStatus.message = '배포가 성공적으로 완료되었습니다!';
    deploymentStatus.isDeploying = false;
    deploymentStatus.completedAt = new Date();
    deploymentStatus.logs.push(`[${new Date().toISOString()}] 배포 완료!`);
    
    // 3초 후 idle 상태로 변경
    setTimeout(() => {
      deploymentStatus.status = 'idle';
      deploymentStatus.message = '';
    }, 3000);

  } catch (error: any) {
    // 배포 실패
    deploymentStatus.status = 'failed';
    deploymentStatus.message = `배포 실패: ${error?.message || 'Unknown error'}`;
    deploymentStatus.isDeploying = false;
    // 실패 시에도 completedAt 업데이트 (하지만 성공한 마지막 배포 시간은 유지)
    deploymentStatus.logs.push(`[${new Date().toISOString()}] 배포 실패: ${error?.message || 'Unknown error'}`);
    
    // 5초 후 idle 상태로 변경
    setTimeout(() => {
      deploymentStatus.status = 'idle';
      deploymentStatus.message = '';
    }, 5000);
  }
}