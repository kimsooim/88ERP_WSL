'use client';

import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiShoppingBag } from 'react-icons/fi';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  grade: 'VIP' | '골드' | '실버' | '브론즈';
  lastOrderDate: string;
}

export default function CustomersPage() {
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: '김민수',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      joinDate: '2024-01-15',
      totalOrders: 25,
      totalSpent: 890000,
      grade: 'VIP',
      lastOrderDate: '2025-06-30'
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@example.com',
      phone: '010-2345-6789',
      joinDate: '2024-03-22',
      totalOrders: 15,
      totalSpent: 450000,
      grade: '골드',
      lastOrderDate: '2025-06-28'
    },
    {
      id: '3',
      name: '박철수',
      email: 'park@example.com',
      phone: '010-3456-7890',
      joinDate: '2024-05-10',
      totalOrders: 8,
      totalSpent: 230000,
      grade: '실버',
      lastOrderDate: '2025-06-25'
    },
    {
      id: '4',
      name: '정수진',
      email: 'jung@example.com',
      phone: '010-4567-8901',
      joinDate: '2024-08-05',
      totalOrders: 3,
      totalSpent: 89000,
      grade: '브론즈',
      lastOrderDate: '2025-06-20'
    }
  ]);

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'VIP': return 'badge-danger';
      case '골드': return 'badge-warning';
      case '실버': return 'badge-info';
      case '브론즈': return 'badge-success';
      default: return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">고객관리</h1>
        <p className="text-gray-600 mt-1">온라인 쇼핑몰 고객을 관리하세요</p>
      </div>

      {/* 고객 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">전체 고객</h3>
          <div className="summary-card-value">{customers.length}명</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">VIP 고객</h3>
          <div className="summary-card-value text-danger">
            {customers.filter(c => c.grade === 'VIP').length}명
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">평균 구매액</h3>
          <div className="summary-card-value">
            ₩{Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString()}
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">평균 주문수</h3>
          <div className="summary-card-value">
            {Math.round(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length)}건
          </div>
        </div>
      </div>

      {/* 고객 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">고객 목록</h3>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>고객정보</th>
                <th>연락처</th>
                <th>가입일</th>
                <th>총 주문수</th>
                <th>총 구매액</th>
                <th>등급</th>
                <th>최근 주문일</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FiMail className="w-3 h-3" />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <FiPhone className="w-3 h-3 text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <FiCalendar className="w-3 h-3 text-gray-400" />
                      {customer.joinDate}
                    </div>
                  </td>
                  <td className="text-center font-semibold">{customer.totalOrders}건</td>
                  <td className="font-semibold">₩{customer.totalSpent.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${getGradeBadge(customer.grade)}`}>
                      {customer.grade}
                    </span>
                  </td>
                  <td className="text-sm text-gray-600">{customer.lastOrderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 고객 등급별 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">등급별 고객 분포</h3>
          </div>
          <div className="space-y-4">
            {['VIP', '골드', '실버', '브론즈'].map((grade) => {
              const count = customers.filter(c => c.grade === grade).length;
              const percentage = (count / customers.length) * 100;
              
              return (
                <div key={grade}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{grade}</span>
                    <span>{count}명 ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        grade === 'VIP' ? 'bg-red-500' :
                        grade === '골드' ? 'bg-yellow-500' :
                        grade === '실버' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">고객 활동 현황</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="w-5 h-5 text-blue-600" />
                <span className="font-medium">이번 달 활성 고객</span>
              </div>
              <span className="font-bold text-blue-600">
                {customers.filter(c => new Date(c.lastOrderDate) > new Date('2025-06-01')).length}명
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 text-green-600" />
                <span className="font-medium">신규 가입 (이번 달)</span>
              </div>
              <span className="font-bold text-green-600">
                {customers.filter(c => new Date(c.joinDate) > new Date('2025-06-01')).length}명
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiCalendar className="w-5 h-5 text-orange-600" />
                <span className="font-medium">30일 이상 미방문</span>
              </div>
              <span className="font-bold text-orange-600">
                {customers.filter(c => new Date(c.lastOrderDate) < new Date('2025-05-30')).length}명
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}