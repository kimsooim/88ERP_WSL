import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('DEBUG API CALLED');
    
    // 기본적인 정보 수집
    const debugInfo = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      env: process.env.NODE_ENV,
      headers: {
        'host': 'debug-test'
      }
    };
    
    console.log('DEBUG INFO:', debugInfo);
    
    return NextResponse.json({
      status: 'debug-ok',
      info: debugInfo
    });
  } catch (error: any) {
    console.error('DEBUG ERROR:', error);
    return NextResponse.json(
      { error: 'Debug failed', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}