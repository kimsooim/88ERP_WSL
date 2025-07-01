export default function Purchase() {
  return (
    <>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-extrabold text-gray-900">구매보고서</h1>
        <p className="text-gray-600 mt-1 font-normal">재고 및 구매 현황을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card hover:shadow-lg transition-shadow animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-900 mb-2">전체 재고 현황</h3>
          <p className="text-gray-600 text-sm mb-4">모든 제품의 재고를 한눈에 확인</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-blue-600">2,485개</span>
            <span className="text-sm text-green-600">↑ 5.2%</span>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-2">기간별 재고</h3>
          <p className="text-gray-600 text-sm mb-4">특정 기간의 재고 변동 추이</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-green-600">정상</span>
            <span className="text-sm text-gray-600">최근 7일</span>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-2">사업부별 재고</h3>
          <p className="text-gray-600 text-sm mb-4">각 사업부의 재고 현황 비교</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-purple-600">3개 부서</span>
            <span className="text-sm text-gray-600">활성화</span>
          </div>
        </div>
      </div>
    </>
  );
}