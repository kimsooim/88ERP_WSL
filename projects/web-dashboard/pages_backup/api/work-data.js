// pages/api/work-data.js
import { getWorkData, getStatistics } from '../../lib/notion';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const [workData, statistics] = await Promise.all([
      getWorkData(),
      getStatistics(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        workData,
        statistics,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('API 오류:', error);
    res.status(500).json({
      success: false,
      message: '데이터를 가져오는 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
}