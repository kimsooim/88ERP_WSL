// 기본 사용자 데이터 설정 스크립트
const defaultUsers = [
  {
    id: '1',
    name: 'Ann',
    email: 'ann.88toy@gmail.com',
    role: '관리자',
    department: '경영지원',
    team: '',
    jobTitle: 'CEO',
    position: '대표',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString(),
    phone: '010-1234-5678',
    profileImage: '',
    password: '0000',
    birthDate: '1990-01-01',
    joinDate: '2024-01-01',
    address: '서울특별시 강남구',
    workPeriod: '1년 6개월 3일'
  }
];

const defaultRoles = [
  { id: '1', name: '관리자', description: '전체 시스템 관리', permissions: { read: true, modify: true, delete: true } },
  { id: '2', name: '매니저', description: '팀 관리 및 운영', permissions: { read: true, modify: true, delete: false } },
  { id: '3', name: '일반사용자', description: '일반 업무 수행', permissions: { read: true, modify: false, delete: false } }
];

const defaultDepartments = [
  { id: '1', name: '브랜드사업부', type: 'department' },
  { id: '2', name: '생산물류팀', type: 'department' },
  { id: '3', name: '경영지원팀', type: 'team', parentId: '1' },
  { id: '4', name: '온라인팀', type: 'team', parentId: '1' }
];

// localStorage에 데이터 저장
if (typeof window !== 'undefined') {
  localStorage.setItem('users', JSON.stringify(defaultUsers));
  localStorage.setItem('88erp_roles', JSON.stringify(defaultRoles));
  localStorage.setItem('88erp_departments', JSON.stringify(defaultDepartments));
  
  console.log('기본 사용자 데이터가 설정되었습니다.');
}