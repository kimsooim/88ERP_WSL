'use client';

import { useState, useEffect } from 'react';
import { useLog } from '../../../contexts/LogContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // 기초등록의 역할과 동기화
  department: string;
  team?: string;
  jobTitle?: string; // 직급
  position?: string; // 포지션
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  profileImage?: string;
  password?: string;
  // 마이페이지와 동기화될 추가 필드
  birthDate?: string; // 생년월일
  joinDate?: string; // 입사일
  address?: string; // 주소
  workPeriod?: string; // 근무기간 (계산된 값)
}

// 근무 기간 계산 함수 (컴포넌트 외부에 정의)
const calculateWorkPeriod = (joinDate: string) => {
  try {
    const join = new Date(joinDate);
    const today = new Date();
    
    let years = today.getFullYear() - join.getFullYear();
    let months = today.getMonth() - join.getMonth();
    let days = today.getDate() - join.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return `${years}년 ${months}개월 ${days}일`;
  } catch (error) {
    console.error('Error calculating work period:', error);
    return '-';
  }
};

// 기본 사용자 데이터 반환 함수
const getDefaultUsers = () => {
  return [
    {
      id: '1',
      name: 'Ann',
      email: 'ann.88toy@gmail.com',
      role: '관리자',
      department: '브랜드사업부',
      team: '경영지원팀',
      jobTitle: '대표이사',
      position: 'Brand Director',
      status: 'active' as const,
      createdAt: '2024-01-01',
      lastLogin: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\. /g, '-').replace(/\./g, '').replace(/:/g, ':'),
      phone: '010-1234-5678',
      birthDate: '1990-01-01',
      joinDate: '2024-01-01',
      address: '서울특별시 강남구 테헤란로 123',
      workPeriod: calculateWorkPeriod('2024-01-01'),
      password: '0000',
      profileImage: ''
    }
  ];
};

export default function AdminUsersPage() {
  console.log('AdminUsersPage component rendering');
  const { addChangeLog } = useLog();
  const [systemRoles, setSystemRoles] = useState<any[]>([]);
  const [systemDepartments, setSystemDepartments] = useState<any[]>([]);
  const [systemTeams, setSystemTeams] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    team: '',
    jobTitle: '',
    position: '',
    phone: '',
    status: 'active' as 'active' | 'inactive',
    profileImage: '',
    password: '',
    birthDate: '',
    joinDate: '',
    address: ''
  });

  // localStorage에서 시스템 설정 불러오기
  useEffect(() => {
    const loadSystemSettings = () => {
      console.log('Loading system settings...');
      
      // 기본 사용자 데이터 설정
      const defaultUsers = getDefaultUsers();
      setUsers(defaultUsers);
      
      try {
        // localStorage에서 데이터 불러오기 시도
        const savedUsers = localStorage.getItem('users');
        if (savedUsers && savedUsers !== 'undefined') {
          try {
            const parsedUsers = JSON.parse(savedUsers);
            if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
              // Ann 계정을 항상 첫 번째로 정렬
              const annUser = parsedUsers.find((u: User) => u.name === 'Ann' || u.email === 'ann.88toy@gmail.com');
              const otherUsers = parsedUsers.filter((u: User) => u.name !== 'Ann' && u.email !== 'ann.88toy@gmail.com');
              
              if (annUser) {
                setUsers([annUser, ...otherUsers]);
              } else {
                setUsers([defaultUsers[0], ...parsedUsers]);
              }
            }
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
          }
        }

        // 역할 데이터 불러오기
        const savedRoles = localStorage.getItem('88erp_roles');
        if (savedRoles) {
          setSystemRoles(JSON.parse(savedRoles));
        } else {
          setSystemRoles([
            { id: '1', name: '관리자', description: '전체 시스템 관리' },
            { id: '2', name: '매니저', description: '팀 관리 및 운영' },
            { id: '3', name: '일반사용자', description: '일반 업무 수행' }
          ]);
        }
        
        // 부서/팀 데이터 불러오기
        const savedDepartments = localStorage.getItem('88erp_departments');
        if (savedDepartments) {
          const depts = JSON.parse(savedDepartments);
          setSystemDepartments(depts.filter((d: any) => d.type === 'department'));
          setSystemTeams(depts.filter((d: any) => d.type === 'team'));
        } else {
          setSystemDepartments([
            { id: '1', name: '브랜드사업부', type: 'department' },
            { id: '2', name: '생산물류팀', type: 'department' }
          ]);
          setSystemTeams([
            { id: '3', name: '경영지원팀', type: 'team', parentId: '1' },
            { id: '4', name: '온라인팀', type: 'team', parentId: '1' }
          ]);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // 에러 발생 시 기본값 설정
        const defaultAnn = {
          id: '1',
          name: 'Ann',
          email: 'ann.88toy@gmail.com',
          role: '관리자',
          department: '경영지원',
          team: '',
          jobTitle: 'CEO',
          position: '대표',
          status: 'active' as const,
          createdAt: '2024-01-01',
          phone: '',
          profileImage: '',
          password: '0000',
          birthDate: '1990-01-01',
          joinDate: '2024-01-01',
          address: '',
          workPeriod: calculateWorkPeriod('2024-01-01')
        };
        setUsers([defaultAnn]);
        setSystemRoles([
          { id: '1', name: '관리자', description: '전체 시스템 관리' },
          { id: '2', name: '매니저', description: '팀 관리 및 운영' },
          { id: '3', name: '일반사용자', description: '일반 업무 수행' }
        ]);
        setSystemDepartments([
          { id: '1', name: '브랜드사업부', type: 'department' },
          { id: '2', name: '생산물류팀', type: 'department' }
        ]);
        setSystemTeams([
          { id: '3', name: '경영지원팀', type: 'team', parentId: '1' },
          { id: '4', name: '온라인팀', type: 'team', parentId: '1' }
        ]);
      }
    };
    
    loadSystemSettings();
    
    // 시스템 설정 업데이트 이벤트 리스너
    const handleSettingsUpdate = (event: CustomEvent) => {
      if (event.detail.roles) {
        setSystemRoles(event.detail.roles);
      }
      if (event.detail.departments) {
        setSystemDepartments(event.detail.departments);
      }
    };

    // 마이페이지에서 사용자 데이터 업데이트 이벤트 리스너
    const handleUserDataUpdate = (event: CustomEvent) => {
      if (event.detail.updatedUsers) {
        const users = event.detail.updatedUsers;
        // Ann 계정을 항상 첫 번째로 정렬
        const annUser = users.find((u: User) => u.name === 'Ann' || u.email === 'ann.88toy@gmail.com' || u.email === 'ann@88toy.co.kr');
        const otherUsers = users.filter((u: User) => u.name !== 'Ann' && u.email !== 'ann.88toy@gmail.com' && u.email !== 'ann@88toy.co.kr');
        
        if (annUser) {
          setUsers([annUser, ...otherUsers]);
        } else {
          setUsers(users);
        }
      }
    };
    
    window.addEventListener('systemSettingsUpdated', handleSettingsUpdate as EventListener);
    window.addEventListener('userDataUpdated', handleUserDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('systemSettingsUpdated', handleSettingsUpdate as EventListener);
      window.removeEventListener('userDataUpdated', handleUserDataUpdate as EventListener);
    };
  }, []);
  
  
  // 비밀번호 초기화
  const handlePasswordReset = (user: User) => {
    if (window.confirm(`${user.name} 사용자의 비밀번호를 초기화하시겠습니까?\n초기화된 비밀번호: password123`)) {
      // localStorage의 users 업데이트
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedStoredUsers = storedUsers.map((u: User) => 
        u.id === user.id ? { ...u, password: 'password123' } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedStoredUsers));
      
      // 로그 기록
      addChangeLog({
        user: 'Ann',
        type: 'settings',
        category: '사용자관리',
        target: user.name,
        field: '비밀번호 초기화',
        oldValue: '기존 비밀번호',
        newValue: 'password123'
      });
      
      alert('비밀번호가 초기화되었습니다.');
    }
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      team: formData.team,
      jobTitle: formData.jobTitle,
      position: formData.position,
      status: formData.status,
      phone: formData.phone,
      profileImage: formData.profileImage,
      password: formData.password || 'password123',
      createdAt: new Date().toISOString().split('T')[0],
      birthDate: formData.birthDate,
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      address: formData.address,
      workPeriod: formData.joinDate ? calculateWorkPeriod(formData.joinDate) : calculateWorkPeriod(new Date().toISOString().split('T')[0])
    };

    // Ann을 첫 번째로 유지하면서 새 사용자 추가
    const updatedUsers = [...users, newUser];
    const annUser = updatedUsers.find(u => u.name === 'Ann' || u.email === 'ann.88toy@gmail.com' || u.email === 'ann@88toy.co.kr');
    const otherUsers = updatedUsers.filter(u => u.name !== 'Ann' && u.email !== 'ann.88toy@gmail.com' && u.email !== 'ann@88toy.co.kr');
    
    if (annUser) {
      setUsers([annUser, ...otherUsers]);
    } else {
      setUsers(updatedUsers);
    }
    
    // localStorage의 users에도 저장 (Auth 시스템과 연동)
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // 로그 기록
    addChangeLog({
      user: 'Ann',
      type: 'create',
      category: '사용자관리',
      target: formData.name,
      field: '사용자 생성',
      oldValue: null,
      newValue: `${formData.email} (${formData.role})`
    });

    setShowAddModal(false);
    resetForm();
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    const updatedUser = { 
      ...editingUser, 
      ...formData,
      workPeriod: formData.joinDate ? calculateWorkPeriod(formData.joinDate) : editingUser.workPeriod
    };

    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? updatedUser
        : user
    );

    // Ann을 첫 번째로 유지
    const annUser = updatedUsers.find(u => u.name === 'Ann' || u.email === 'ann.88toy@gmail.com' || u.email === 'ann@88toy.co.kr');
    const otherUsers = updatedUsers.filter(u => u.name !== 'Ann' && u.email !== 'ann.88toy@gmail.com' && u.email !== 'ann@88toy.co.kr');
    
    if (annUser) {
      setUsers([annUser, ...otherUsers]);
    } else {
      setUsers(updatedUsers);
    }
    
    // localStorage 업데이트
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // 현재 로그인한 사용자인 경우 마이페이지와 동기화
    if (updatedUser.email) {
      const userAdditionalInfo = {
        phone: updatedUser.phone || '',
        address: updatedUser.address || '',
        birthDate: updatedUser.birthDate || '',
        joinDate: updatedUser.joinDate || updatedUser.createdAt || ''
      };
      
      // 현재 사용자의 추가 정보 업데이트
      const currentUserInfo = localStorage.getItem('userAdditionalInfo');
      if (currentUserInfo) {
        try {
          const currentInfo = JSON.parse(currentUserInfo);
          // 이메일이 일치하는 경우만 업데이트 (실제로는 현재 로그인 사용자 체크가 필요)
          localStorage.setItem('userAdditionalInfo', JSON.stringify(userAdditionalInfo));
        } catch (error) {
          console.error('추가 정보 동기화 오류:', error);
        }
      }
    }

    // 로그 기록
    addChangeLog({
      user: 'Ann',
      type: 'edit',
      category: '사용자관리',
      target: editingUser.name,
      field: '사용자 정보 수정',
      oldValue: `${editingUser.email} (${editingUser.role})`,
      newValue: `${formData.email} (${formData.role})`
    });

    setShowEditModal(false);
    setEditingUser(null);
    resetForm();
  };

  const handleDeleteUser = (user: User) => {
    // Ann 계정은 삭제 불가
    if (user.name === 'Ann' || user.email === 'ann.88toy@gmail.com' || user.email === 'ann@88toy.co.kr') {
      alert('Ann 계정은 삭제할 수 없습니다.');
      return;
    }
    
    if (window.confirm(`${user.name} 사용자를 삭제하시겠습니까?`)) {
      const updatedUsers = users.filter(u => u.id !== user.id);
      setUsers(updatedUsers);
      
      // localStorage 업데이트
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // 로그 기록
      addChangeLog({
        user: 'Ann',
        type: 'delete',
        category: '사용자관리',
        target: user.name,
        field: '사용자 삭제',
        oldValue: `${user.email} (${user.role})`,
        newValue: null
      });
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus: 'active' | 'inactive' = user.status === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    
    // Ann을 첫 번째로 유지
    const annUser = updatedUsers.find(u => u.name === 'Ann' || u.email === 'ann.88toy@gmail.com' || u.email === 'ann@88toy.co.kr');
    const otherUsers = updatedUsers.filter(u => u.name !== 'Ann' && u.email !== 'ann.88toy@gmail.com' && u.email !== 'ann@88toy.co.kr');
    
    if (annUser) {
      setUsers([annUser, ...otherUsers]);
    } else {
      setUsers(updatedUsers);
    }
    
    // localStorage 업데이트
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // 로그 기록
    addChangeLog({
      user: 'Ann',
      type: 'settings',
      category: '사용자관리',
      target: user.name,
      field: '상태 변경',
      oldValue: user.status === 'active' ? '활성' : '비활성',
      newValue: newStatus === 'active' ? '활성' : '비활성'
    });
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      team: user.team || '',
      jobTitle: user.jobTitle || '',
      position: user.position || '',
      phone: user.phone || '',
      status: user.status,
      profileImage: user.profileImage || '',
      password: user.password || '',
      birthDate: user.birthDate || '',
      joinDate: user.joinDate || user.createdAt || '',
      address: user.address || ''
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      team: '',
      jobTitle: '',
      position: '',
      phone: '',
      status: 'active',
      profileImage: '',
      password: '',
      birthDate: '',
      joinDate: '',
      address: ''
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, profileImage: base64 }));
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const roleNormalized = role.toLowerCase();
    if (roleNormalized.includes('관리자') || roleNormalized.includes('admin')) {
      return 'bg-red-100 text-red-800';
    } else if (roleNormalized.includes('매니저') || roleNormalized.includes('manager')) {
      return 'bg-blue-100 text-blue-800';
    } else if (roleNormalized.includes('직원')) {
      return 'bg-green-100 text-green-800';
    } else if (roleNormalized.includes('인턴')) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사용자관리</h1>
          <p className="text-gray-600 mt-1">시스템 사용자를 관리하세요</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          사용자 추가
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">전체 사용자</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}명</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">활성 사용자</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === 'active').length}명
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">관리자</p>
            <p className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === '관리자').length}명
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">부서</p>
            <p className="text-2xl font-bold text-blue-600">
              {new Set(users.map(u => u.department)).size}개
            </p>
          </div>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">사용자 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  프로필
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사용자
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  역할
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  부서/팀
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  직급/포지션
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  생년월일
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  입사일/근무기간
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처/주소
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  편집
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {user.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-900">
                    <div className="space-y-1">
                      <div className="font-medium">{user.department}</div>
                      <div className="text-xs text-gray-500">{user.team || '팀 미지정'}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-900">
                    <div className="space-y-1">
                      <div className="font-medium">{user.jobTitle || '직급 미지정'}</div>
                      <div className="text-xs text-gray-500">{user.position || '포지션 미지정'}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {user.birthDate || '-'}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500">
                    <div className="space-y-1">
                      <div className="font-medium">{user.joinDate || user.createdAt || '-'}</div>
                      <div className="text-gray-400">{user.workPeriod || (user.joinDate ? calculateWorkPeriod(user.joinDate) : '-')}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500 max-w-40">
                    <div className="space-y-1">
                      <div className="font-medium">{user.phone || '연락처 미등록'}</div>
                      <div className="text-gray-400 truncate" title={user.address}>{user.address || '주소 미등록'}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {user.status === 'active' ? '활성' : '비활성'}
                    </button>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-900 text-xs"
                      >
                        수정
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-900 text-xs"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 마지막 로그인 정보 카드 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">최근 로그인 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {users.map((user) => (
              <div key={user.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user.email}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full ${
                        user.lastLogin 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          user.lastLogin ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        {user.lastLogin || '로그인 기록 없음'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 사용자 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    새 사용자 추가
                  </h3>
                  
                  <div className="space-y-4">
                    {/* 프로필 이미지 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        프로필 이미지
                      </label>
                      <div className="flex items-center space-x-4">
                        {formData.profileImage ? (
                          <img 
                            src={formData.profileImage} 
                            alt="프로필 미리보기"
                            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-2xl font-medium">
                              {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                            </span>
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="profile-upload-add"
                          />
                          <label
                            htmlFor="profile-upload-add"
                            className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            이미지 선택
                          </label>
                          {formData.profileImage && (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, profileImage: '' })}
                              className="ml-2 text-sm text-red-600 hover:text-red-900"
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">JPG, PNG 형식의 5MB 이하 이미지</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        전화번호
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-0000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        역할 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">역할 선택</option>
                        {systemRoles.length > 0 ? (
                          systemRoles.map(role => (
                            <option key={role.id} value={role.name}>
                              {role.name} - {role.description}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="일반사용자">일반사용자</option>
                            <option value="매니저">매니저</option>
                            <option value="관리자">관리자</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          부서 <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">부서 선택</option>
                          {systemDepartments.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          팀
                        </label>
                        <select
                          value={formData.team}
                          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">팀 선택</option>
                          {systemTeams
                            .filter(team => {
                              const dept = systemDepartments.find(d => d.name === formData.department);
                              return dept && team.parentId === dept.id;
                            })
                            .map(team => (
                              <option key={team.id} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          직급
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          placeholder="예: 대리, 과장"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          포지션
                        </label>
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          placeholder="예: PM, Designer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          생년월일
                        </label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          입사일
                        </label>
                        <input
                          type="date"
                          value={formData.joinDate}
                          onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        주소
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="주소를 입력하세요"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        초기 비밀번호
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="비워두면 password123으로 설정됩니다"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">사용자가 첫 로그인 시 변경할 수 있습니다</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleAddUser}
                    disabled={!formData.name || !formData.email || !formData.department}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:bg-gray-300"
                  >
                    추가
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 사용자 수정 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    사용자 정보 수정
                  </h3>
                  
                  <div className="space-y-4">
                    {/* 프로필 이미지 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        프로필 이미지
                      </label>
                      <div className="flex items-center space-x-4">
                        {formData.profileImage ? (
                          <img 
                            src={formData.profileImage} 
                            alt="프로필 미리보기"
                            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-2xl font-medium">
                              {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                            </span>
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="profile-upload-edit"
                          />
                          <label
                            htmlFor="profile-upload-edit"
                            className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            이미지 변경
                          </label>
                          {formData.profileImage && (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, profileImage: '' })}
                              className="ml-2 text-sm text-red-600 hover:text-red-900"
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">JPG, PNG 형식의 5MB 이하 이미지</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        전화번호
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-0000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        역할 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">역할 선택</option>
                        {systemRoles.length > 0 ? (
                          systemRoles.map(role => (
                            <option key={role.id} value={role.name}>
                              {role.name} - {role.description}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="일반사용자">일반사용자</option>
                            <option value="매니저">매니저</option>
                            <option value="관리자">관리자</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          부서 <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">부서 선택</option>
                          {systemDepartments.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          팀
                        </label>
                        <select
                          value={formData.team}
                          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">팀 선택</option>
                          {systemTeams
                            .filter(team => {
                              const dept = systemDepartments.find(d => d.name === formData.department);
                              return dept && team.parentId === dept.id;
                            })
                            .map(team => (
                              <option key={team.id} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          직급
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          placeholder="예: 대리, 과장"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          포지션
                        </label>
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          placeholder="예: PM, Designer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        상태
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="active">활성</option>
                        <option value="inactive">비활성</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleEditUser}
                    disabled={!formData.name || !formData.email || !formData.department}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:bg-gray-300"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingUser(null);
                      resetForm();
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}