'use client';

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">사용자 관리 테스트 페이지</h1>
      <p>이 페이지가 정상적으로 표시되면 라우팅은 문제없습니다.</p>
      
      <div className="mt-4">
        <button 
          onClick={() => {
            console.log('localStorage:', localStorage.getItem('users'));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          localStorage 확인
        </button>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => {
            const defaultUsers = [{
              id: '1',
              name: 'Ann',
              email: 'ann.88toy@gmail.com',
              role: '관리자',
              department: '경영지원',
              status: 'active'
            }];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            alert('기본 사용자 데이터가 설정되었습니다.');
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          기본 데이터 설정
        </button>
      </div>
      
      <div className="mt-4">
        <a href="/admin/users" className="text-blue-600 underline">
          사용자 관리 페이지로 이동
        </a>
      </div>
    </div>
  );
}