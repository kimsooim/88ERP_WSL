// pages/index.js
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/work-data');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date(result.data.lastUpdated));
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // 5분마다 자동 새로고침
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">오류 발생</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const { workData, statistics } = data;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">88ERP Board</h1>
            <div className="text-sm text-gray-500">
              마지막 업데이트: {lastUpdated?.toLocaleString('ko-KR')}
              <button 
                onClick={fetchData}
                className="ml-4 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                새로고침
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">Notion 연동 실시간 작업 대시보드</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">전체 작업</h3>
            <p className="text-3xl font-bold text-gray-800">{statistics.totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">완료</h3>
            <p className="text-3xl font-bold text-green-600">{statistics.completedTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">진행중</h3>
            <p className="text-3xl font-bold text-blue-600">{statistics.inProgressTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">평균 진행률</h3>
            <p className="text-3xl font-bold text-purple-600">{statistics.avgProgress}%</p>
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 상태별 분포 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">상태별 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statistics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {statistics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 카테고리별 분포 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">카테고리별 작업</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.categoryDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 작업 목록 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">최근 작업 목록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">우선순위</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">담당자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">진행률</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workData.slice(0, 10).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === '완료' ? 'bg-green-100 text-green-800' :
                        item.status === '진행중' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.priority === '높음' ? 'bg-red-100 text-red-800' :
                        item.priority === '보통' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${item.progress}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date ? new Date(item.date).toLocaleDateString('ko-KR') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}