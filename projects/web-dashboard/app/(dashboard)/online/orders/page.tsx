'use client';

import { useState } from 'react';
import { FiShoppingCart, FiUser, FiCalendar, FiMapPin, FiEye } from 'react-icons/fi';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  orderDate: string;
  totalAmount: number;
  status: '주문접수' | '결제완료' | '상품준비중' | '배송중' | '배송완료' | '취소';
  items: number;
  shippingAddress: string;
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2025-001',
      customerName: '김민수',
      customerPhone: '010-1234-5678',
      orderDate: '2025-06-30',
      totalAmount: 89000,
      status: '배송중',
      items: 3,
      shippingAddress: '서울시 강남구'
    },
    {
      id: 'ORD-2025-002',
      customerName: '이영희',
      customerPhone: '010-2345-6789',
      orderDate: '2025-06-30',
      totalAmount: 156000,
      status: '결제완료',
      items: 5,
      shippingAddress: '부산시 해운대구'
    },
    {
      id: 'ORD-2025-003',
      customerName: '박철수',
      customerPhone: '010-3456-7890',
      orderDate: '2025-06-29',
      totalAmount: 45000,
      status: '주문접수',
      items: 2,
      shippingAddress: '대구시 중구'
    },
    {
      id: 'ORD-2025-004',
      customerName: '정수진',
      customerPhone: '010-4567-8901',
      orderDate: '2025-06-29',
      totalAmount: 234000,
      status: '배송완료',
      items: 8,
      shippingAddress: '인천시 연수구'
    },
    {
      id: 'ORD-2025-005',
      customerName: '강호동',
      customerPhone: '010-5678-9012',
      orderDate: '2025-06-28',
      totalAmount: 78000,
      status: '상품준비중',
      items: 4,
      shippingAddress: '광주시 서구'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '주문접수': return 'badge-info';
      case '결제완료': return 'badge-success';
      case '상품준비중': return 'badge-warning';
      case '배송중': return 'badge-info';
      case '배송완료': return 'badge-success';
      case '취소': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  const filteredOrders = selectedStatus 
    ? orders.filter(order => order.status === selectedStatus)
    : orders;

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">주문관리</h1>
        <p className="text-gray-600 mt-1">온라인 쇼핑몰 주문을 관리하세요</p>
      </div>

      {/* 상태별 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">전체</h3>
          <div className="summary-card-value">{orders.length}</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">주문접수</h3>
          <div className="summary-card-value text-blue-600">
            {orders.filter(o => o.status === '주문접수').length}
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">결제완료</h3>
          <div className="summary-card-value text-green-600">
            {orders.filter(o => o.status === '결제완료').length}
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">상품준비중</h3>
          <div className="summary-card-value text-orange-600">
            {orders.filter(o => o.status === '상품준비중').length}
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">배송중</h3>
          <div className="summary-card-value text-blue-600">
            {orders.filter(o => o.status === '배송중').length}
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">배송완료</h3>
          <div className="summary-card-value text-green-600">
            {orders.filter(o => o.status === '배송완료').length}
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="card">
        <div className="flex gap-4">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">전체 상태</option>
            <option value="주문접수">주문접수</option>
            <option value="결제완료">결제완료</option>
            <option value="상품준비중">상품준비중</option>
            <option value="배송중">배송중</option>
            <option value="배송완료">배송완료</option>
            <option value="취소">취소</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">주문 목록</h3>
          <p className="text-sm text-gray-600 mt-1">총 {filteredOrders.length}개 주문</p>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>주문번호</th>
                <th>고객정보</th>
                <th>주문일시</th>
                <th>상품수량</th>
                <th>주문금액</th>
                <th>배송지</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono font-semibold text-blue-600">{order.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-gray-400" />
                      {order.orderDate}
                    </div>
                  </td>
                  <td className="text-center">{order.items}개</td>
                  <td className="font-semibold">₩{order.totalAmount.toLocaleString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-gray-400" />
                      {order.shippingAddress}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <FiEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}