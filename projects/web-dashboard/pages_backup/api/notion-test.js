// pages/api/notion-test.js
import { getWorkData } from '../../lib/notion';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Notion 연결 테스트
    const testData = await getWorkData();
    
    res.status(200).json({
      success: true,
      message: 'Notion 연결 성공',
      dataCount: testData.length,
      sample: testData.slice(0, 3), // 처음 3개 항목만 샘플로
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Notion 테스트 오류:', error);
    res.status(500).json({
      success: false,
      message: 'Notion 연결 실패',
      error: error.message,
    });
  }
}