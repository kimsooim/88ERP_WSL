export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">버튼 테스트 페이지</h1>
      
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">인라인 스타일 버튼들:</h2>
        <button 
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          파란 버튼
        </button>
        
        <button 
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          빨간 버튼
        </button>
        
        <button 
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          회색 버튼
        </button>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">기본 HTML 버튼:</h2>
        <button style={{backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '8px'}}>
          스타일 속성 버튼
        </button>
      </div>
    </div>
  );
}