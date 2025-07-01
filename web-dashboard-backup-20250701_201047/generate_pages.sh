#!/bin/bash

# 페이지 템플릿 생성 스크립트

# 기본 템플릿 함수
create_basic_template() {
    local file_path="$1"
    local page_title="$2"
    local page_description="$3"
    local category="$4"
    
    cat > "$file_path" << 'EOF'
import Card from '@/components/Card';
import StatsCard from '@/components/StatsCard';

export default function PAGE_NAME() {
  const mockData = [
    { id: 1, name: '샘플 데이터 1', status: '진행중', value: '1,250,000원', date: '2025-06-30' },
    { id: 2, name: '샘플 데이터 2', status: '완료', value: '890,000원', date: '2025-06-29' },
    { id: 3, name: '샘플 데이터 3', status: '대기', value: '2,100,000원', date: '2025-06-28' },
  ];

  const stats = [
    { title: '전체 항목', value: '245', change: '+12', changeType: 'increase' },
    { title: '진행중', value: '67', change: '+5', changeType: 'increase' },
    { title: '완료', value: '156', change: '+8', changeType: 'increase' },
    { title: '성공률', value: '94%', change: '+2%', changeType: 'increase' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'bg-green-100 text-green-800';
      case '진행중': return 'bg-blue-100 text-blue-800';
      case '대기': return 'bg-yellow-100 text-yellow-800';
      case '취소': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">PAGE_TITLE</h1>
        <p className="mt-2 text-sm text-gray-600">
          PAGE_DESCRIPTION
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* 데이터 현황 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="최근 데이터">
          <div className="space-y-4">
            {mockData.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.value}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="CATEGORY_NAME 통계">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">총 처리량</h4>
                <p className="text-sm text-gray-600">이번 달 기준</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600">4,250,000원</p>
                <p className="text-sm text-gray-600">+15% 증가</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 전체 데이터 테이블 */}
      <Card title="전체 목록">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">항목명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <button className="hover:text-blue-800">수정</button>
                    <span className="mx-2">|</span>
                    <button className="hover:text-blue-800">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
EOF

    # 템플릿 내용 치환
    sed -i "s/PAGE_NAME/$page_name/g" "$file_path"
    sed -i "s/PAGE_TITLE/$page_title/g" "$file_path"
    sed -i "s/PAGE_DESCRIPTION/$page_description/g" "$file_path"
    sed -i "s/CATEGORY_NAME/$category/g" "$file_path"
}

echo "페이지 템플릿 생성 완료!"