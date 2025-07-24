import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'API Test OK',
    timestamp: new Date().toISOString(),
  });
}