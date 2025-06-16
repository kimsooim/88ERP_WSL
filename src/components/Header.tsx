export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-800">88TOY OEM 관리 시스템</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">시스템 정상</span>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">마지막 동기화</p>
            <p className="text-xs text-gray-400">{new Date().toLocaleTimeString('ko-KR')}</p>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-xl">🔔</span>
          </button>
        </div>
      </div>
    </header>
  )
}