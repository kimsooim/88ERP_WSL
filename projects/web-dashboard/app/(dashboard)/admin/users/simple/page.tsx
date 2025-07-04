'use client';

import { useState, useEffect } from 'react';

export default function SimpleUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // 기본 사용자 설정
      const defaultUser = {
        id: '1',
        name: 'Ann',
        email: 'ann.88toy@gmail.com',
        role: '관리자',
        department: '경영지원',
        status: 'active'
      };
      setUsers([defaultUser]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">사용자 관리 (단순화)</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          에러: {error}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">이름</th>
              <th className="text-left">이메일</th>
              <th className="text-left">역할</th>
              <th className="text-left">부서</th>
              <th className="text-left">상태</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">{user.department}</td>
                <td className="py-2">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <a href="/admin/users" className="text-blue-600 underline">
          전체 사용자 관리 페이지로
        </a>
      </div>
    </div>
  );
}