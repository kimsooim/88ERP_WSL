import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: '88ERP Web Dashboard',
    version: process.env.npm_package_version || '0.1.0',
  });
}