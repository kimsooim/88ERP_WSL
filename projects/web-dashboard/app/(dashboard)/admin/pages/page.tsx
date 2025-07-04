'use client';

import React, { useState, useEffect } from 'react';
import { Key, Clock, Users, Edit2, Save, X, ChevronUp, ChevronDown } from 'lucide-react';

interface User {
  id: string;
  name: string;
  realName?: string;
  email: string;
  userId?: string; // 로그인용 아이디
  password?: string;
  profileImage?: string;
  lastLogin?: string;
  lastModified?: string; // 마지막 수정일
  status: 'active' | 'inactive';
  role: string;
  department: string;
  team?: string;
}

export default function AdminLoginSettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ password: string; userId: string; name: string }>({ password: '', userId: '', name: '' });
  const [sortField, setSortField] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('loginSettingsSortField') || null;
    }
    return null;
  });
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('loginSettingsSortDirection') as 'asc' | 'desc') || 'asc';
    }
    return 'asc';
  });
  const [loginSortField, setLoginSortField] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('recentLoginSortField') || null;
    }
    return null;
  });
  const [loginSortDirection, setLoginSortDirection] = useState<'asc' | 'desc'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('recentLoginSortDirection') as 'asc' | 'desc') || 'asc';
    }
    return 'asc';
  });

  // 정렬 처리 함수
  const handleSort = (field: string) => {
    let newDirection: 'asc' | 'desc' = 'asc';
    
    if (sortField === field) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
    } else {
      setSortField(field);
      setSortDirection('asc');
      newDirection = 'asc';
    }
    
    // localStorage에 정렬 상태 저장
    localStorage.setItem('loginSettingsSortField', field);
    localStorage.setItem('loginSettingsSortDirection', newDirection);
  };

  // 최근 로그인 현황 정렬 처리 함수
  const handleLoginSort = (field: string) => {
    let newDirection: 'asc' | 'desc' = 'asc';
    
    if (loginSortField === field) {
      newDirection = loginSortDirection === 'asc' ? 'desc' : 'asc';
      setLoginSortDirection(newDirection);
    } else {
      setLoginSortField(field);
      setLoginSortDirection('asc');
      newDirection = 'asc';
    }
    
    // localStorage에 정렬 상태 저장
    localStorage.setItem('recentLoginSortField', field);
    localStorage.setItem('recentLoginSortDirection', newDirection);
  };

  // 정렬된 사용자 목록
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue: any = a[sortField as keyof User];
    let bValue: any = b[sortField as keyof User];
    
    // 특별한 정렬 처리
    if (sortField === 'profile') {
      aValue = a.name || '';
      bValue = b.name || '';
    } else if (sortField === 'userId') {
      aValue = a.userId || a.email.split('@')[0];
      bValue = b.userId || b.email.split('@')[0];
    } else if (sortField === 'role') {
      // 권한그룹 정렬 - 기초등록 순서대로
      const roleOrder = ['관리자', '팀장', '매니저', '팀원', '직원', '일반사용자', '게스트', '인턴'];
      const aIndex = roleOrder.indexOf(aValue);
      const bIndex = roleOrder.indexOf(bValue);
      
      // 목록에 없는 역할은 맨 뒤로
      const aOrder = aIndex === -1 ? roleOrder.length : aIndex;
      const bOrder = bIndex === -1 ? roleOrder.length : bIndex;
      
      return sortDirection === 'asc' ? aOrder - bOrder : bOrder - aOrder;
    }
    
    // null/undefined 처리
    if (aValue == null) aValue = '';
    if (bValue == null) bValue = '';
    
    // 문자열 비교
    const comparison = aValue.toString().localeCompare(bValue.toString(), 'ko');
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // localStorage에서 사용자 데이터 불러오기
  useEffect(() => {
    const loadUsers = () => {
      try {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers);
          setUsers(parsedUsers);
        } else {
          // 기본 사용자 데이터 설정
          const defaultUsers = [{
            id: '1',
            name: 'Ann',
            realName: '김수임',
            email: 'ann.88toy@gmail.com',
            userId: 'ann',
            password: '0000',
            role: '관리자',
            department: '브랜드사업부',
            team: '경영지원팀',
            status: 'active' as const,
            lastLogin: new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\. /g, '-').replace(/\./g, '').replace(/:/g, ':'),
            profileImage: ''
          }];
          setUsers(defaultUsers);
          localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadUsers();
    
    // 사용자 데이터 업데이트 이벤트 리스너
    const handleUserDataUpdate = (event: CustomEvent) => {
      if (event.detail.updatedUsers) {
        setUsers(event.detail.updatedUsers);
      }
    };
    
    window.addEventListener('userDataUpdated', handleUserDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate as EventListener);
    };
  }, []);

  // 편집 시작
  const startEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm({ 
      password: user.password || '', 
      userId: user.userId || user.email.split('@')[0],
      name: user.name || ''
    });
  };

  // 편집 저장
  const saveEdit = (userId: string) => {
    const currentDate = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\. /g, '-').replace(/\./g, '').replace(/:/g, ':');
    
    const updatedUsers = users.map(user => 
      user.id === userId ? { 
        ...user, 
        password: editForm.password,
        userId: editForm.userId,
        name: editForm.name,
        lastModified: currentDate
      } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // 사용자 데이터 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent('userDataUpdated', {
      detail: { updatedUsers }
    }));
    
    setEditingUser(null);
    setEditForm({ password: '', userId: '', name: '' });
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ password: '', userId: '', name: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">로그인설정</h1>
          <p className="text-gray-600 mt-1">사용자 로그인 정보를 관리합니다</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 로그인설정 카드 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <Key className="w-5 h-5" />
              로그인 정보 관리
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('profile')}>
                    <div className="flex items-center gap-1">
                      <span>프로필</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sortField === 'profile' && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortField === 'profile' && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      <span>닉네임</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sortField === 'name' && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortField === 'name' && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('userId')}>
                    <div className="flex items-center gap-1">
                      <span>아이디</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sortField === 'userId' && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortField === 'userId' && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('password')}>
                    <div className="flex items-center gap-1">
                      <span>비밀번호</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sortField === 'password' && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortField === 'password' && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('role')}>
                    <div className="flex items-center gap-1">
                      <span>권한그룹</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sortField === 'role' && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortField === 'role' && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('lastModified')}>
                    <div className="flex items-center gap-1">
                      <span>마지막 수정일</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sortField === 'lastModified' && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortField === 'lastModified' && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          value={editForm.userId}
                          onChange={(e) => setEditForm({ ...editForm, userId: e.target.value })}
                          className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                          placeholder="아이디"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">
                          {user.userId || user.email.split('@')[0]}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          value={editForm.password}
                          onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                          className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                          placeholder="새 비밀번호"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          {user.password || '••••••••'}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(user.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === '관리자' ? 'bg-yellow-100 text-yellow-800' :
                        user.role === '팀장' || user.role === '매니저' ? 'bg-blue-100 text-blue-800' :
                        user.role === '팀원' || user.role === '일반사용자' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role || '미지정'}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {user.lastModified || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 최근 로그인 현황 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <Clock className="w-5 h-5" />
              최근 로그인 현황
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleLoginSort('profile')}>
                    <div className="flex items-center gap-1">
                      <span>프로필</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${loginSortField === 'profile' && loginSortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${loginSortField === 'profile' && loginSortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleLoginSort('name')}>
                    <div className="flex items-center gap-1">
                      <span>닉네임</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${loginSortField === 'name' && loginSortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${loginSortField === 'name' && loginSortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleLoginSort('department')}>
                    <div className="flex items-center gap-1">
                      <span>부서</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${loginSortField === 'department' && loginSortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${loginSortField === 'department' && loginSortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleLoginSort('team')}>
                    <div className="flex items-center gap-1">
                      <span>팀</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${loginSortField === 'team' && loginSortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${loginSortField === 'team' && loginSortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleLoginSort('status')}>
                    <div className="flex items-center gap-1">
                      <span>접속여부</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${loginSortField === 'status' && loginSortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${loginSortField === 'status' && loginSortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleLoginSort('lastLogin')}>
                    <div className="flex items-center gap-1">
                      <span>마지막 로그인</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${loginSortField === 'lastLogin' && loginSortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${loginSortField === 'lastLogin' && loginSortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...users].sort((a, b) => {
                  if (!loginSortField) return 0;
                  
                  let aValue: any = a[loginSortField as keyof User];
                  let bValue: any = b[loginSortField as keyof User];
                  
                  // 특별한 정렬 처리
                  if (loginSortField === 'profile') {
                    aValue = a.name || '';
                    bValue = b.name || '';
                  }
                  
                  // null/undefined 처리
                  if (aValue == null) aValue = '';
                  if (bValue == null) bValue = '';
                  
                  // 문자열 비교
                  const comparison = aValue.toString().localeCompare(bValue.toString(), 'ko');
                  return loginSortDirection === 'asc' ? comparison : -comparison;
                }).map(user => (
                  <tr key={user.id}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.department}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.team || '-'}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'active' ? '로그인' : '로그아웃'}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {user.lastLogin ? 
                        new Date(user.lastLogin).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        }).replace(/\. /g, '-').replace(/\./g, '').replace(' ', ' ') 
                        : '-'
                      }
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