'use client';

import { useState } from 'react';
import { permissions } from '../../../contexts/AuthContext';
import { useLog } from '../../../contexts/LogContext';

export default function AdminPermissionsPage() {
  const { addChangeLog } = useLog();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'manager' | 'user'>('admin');
  const [permissionSettings, setPermissionSettings] = useState(permissions);

  const roles = [
    { id: 'admin', name: '관리자', description: '모든 권한을 가진 최고 관리자', color: 'red' },
    { id: 'manager', name: '매니저', description: '주요 업무 권한을 가진 중간 관리자', color: 'blue' },
    { id: 'user', name: '일반사용자', description: '기본적인 조회 권한만 가진 사용자', color: 'gray' }
  ];

  const categories = Array.from(new Set(permissions.map(p => p.category)));

  const handlePermissionToggle = (path: string) => {
    const updatedPermissions = permissionSettings.map(perm => {
      if (perm.path === path) {
        const currentRoles = perm.roles;
        const hasRole = currentRoles.includes(selectedRole);
        
        let newRoles: ('admin' | 'manager' | 'user')[];
        if (hasRole) {
          newRoles = currentRoles.filter(r => r !== selectedRole);
        } else {
          newRoles = [...currentRoles, selectedRole];
        }

        // 로그 기록
        addChangeLog({
          user: 'Admin',
          type: 'settings',
          category: '권한관리',
          target: perm.name,
          field: `${getRoleName(selectedRole)} 권한`,
          oldValue: hasRole ? '허용' : '거부',
          newValue: hasRole ? '거부' : '허용'
        });

        return { ...perm, roles: newRoles };
      }
      return perm;
    });

    setPermissionSettings(updatedPermissions);
    
    // localStorage에 저장
    localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
  };

  const getRoleName = (role: string) => {
    switch(role) {
      case 'admin': return '관리자';
      case 'manager': return '매니저';
      case 'user': return '일반사용자';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isPermissionGranted = (path: string, role: 'admin' | 'manager' | 'user') => {
    const permission = permissionSettings.find(p => p.path === path);
    return permission ? permission.roles.includes(role) : false;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">권한관리</h1>
          <p className="text-gray-600 mt-1">역할별 시스템 접근 권한을 관리하세요</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            alert('권한 설정이 저장되었습니다.');
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          저장
        </button>
      </div>

      {/* 역할 선택 탭 */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4">역할 선택</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as 'admin' | 'manager' | 'user')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === role.id
                    ? getRoleColor(role.color) + ' border-opacity-100'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-semibold text-lg mb-1">{role.name}</h4>
                <p className="text-sm opacity-80">{role.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 권한 설정 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {getRoleName(selectedRole)} 권한 설정
          </h3>
        </div>
        <div className="card-body">
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                {category}
              </h4>
              <div className="space-y-2">
                {permissionSettings
                  .filter(p => p.category === category)
                  .map((permission) => (
                    <div
                      key={permission.path}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`perm-${permission.path}`}
                          checked={isPermissionGranted(permission.path, selectedRole)}
                          onChange={() => handlePermissionToggle(permission.path)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label 
                          htmlFor={`perm-${permission.path}`}
                          className="cursor-pointer"
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {permission.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {permission.path}
                          </div>
                        </label>
                      </div>
                      <div className="flex space-x-1">
                        {(['admin', 'manager', 'user'] as const).map((role) => (
                          <span
                            key={role}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              isPermissionGranted(permission.path, role)
                                ? role === 'admin' 
                                  ? 'bg-red-100 text-red-800'
                                  : role === 'manager'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                                : 'bg-gray-50 text-gray-400'
                            }`}
                          >
                            {role.charAt(0).toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 권한 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => {
          const rolePermissions = permissionSettings.filter(p => 
            p.roles.includes(role.id as 'admin' | 'manager' | 'user')
          );
          
          return (
            <div key={role.id} className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                    getRoleColor(role.color)
                  }`}>
                    {role.id.charAt(0).toUpperCase()}
                  </span>
                  {role.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">전체 권한</span>
                    <span className="font-semibold">
                      {rolePermissions.length} / {permissions.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        role.color === 'red' ? 'bg-red-500' :
                        role.color === 'blue' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${(rolePermissions.length / permissions.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {categories.map(cat => {
                      const catPerms = rolePermissions.filter(p => p.category === cat);
                      const totalCatPerms = permissions.filter(p => p.category === cat);
                      return catPerms.length > 0 ? (
                        <div key={cat} className="flex justify-between">
                          <span>{cat}</span>
                          <span>{catPerms.length}/{totalCatPerms.length}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}