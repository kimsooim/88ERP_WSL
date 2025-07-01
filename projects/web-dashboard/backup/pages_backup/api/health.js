// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    message: '88ERPBoard API 서버가 정상 작동 중입니다.',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}