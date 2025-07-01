'use client';

import { useState } from 'react';
import { FiTruck, FiPackage, FiCalendar, FiAlertCircle } from 'react-icons/fi';

interface Purchase {
  id: string;
  supplierName: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  orderDate: string;
  expectedDate: string;
  status: '발주완료' | '생산중' | '배송중' | '입고완료' | '지연';
}

export default function PurchasesPage() {
  const [purchases] = useState<Purchase[]>([
    {
      id: 'PO-2025-001',
      supplierName: '(주)토이팩토리',
      productName: '쵸바 계란 키링',
      quantity: 500,
      unitPrice: 4500,
      totalAmount: 2250000,
      orderDate: '2025-06-25',
      expectedDate: '2025-07-10',
      status: '생산중'
    },
    {
      id: 'PO-2025-002',
      supplierName: '코튼텍스타일',
      productName: '코튼푸드 낮잠쿠션',
      quantity: 200,
      unitPrice: 12000,
      totalAmount: 2400000,
      orderDate: '2025-06-28',
      expectedDate: '2025-07-15',
      status: '발주완료'
    },
    {
      id: 'PO-2025-003',
      supplierName: '애니팩토리',
      productName: '라이독 브라운 인형',
      quantity: 300,
      unitPrice: 22000,
      totalAmount: 6600000,
      orderDate: '2025-06-20',
      expectedDate: '2025-07-05',
      status: '배송중'
    },
    {
      id: 'PO-2025-004',
      supplierName: '(주)토이팩토리',
      productName: '쵸바 새우 볼체인토이',
      quantity: 1000,
      unitPrice: 6000,
      totalAmount: 6000000,
      orderDate: '2025-06-30',
      expectedDate: '2025-07-20',
      status: '입고완료'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '발주완료': return 'badge-info';
      case '생산중': return 'badge-warning';
      case '배송중': return 'badge-info';
      case '입고완료': return 'badge-success';
      case '지연': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">구매관리</h1>
        <p className="text-gray-600 mt-1">제품 발주 및 입고를 관리하세요</p>
      </div>

      {/* 구매 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">총 발주건수</h3>
          <div className="summary-card-value">{purchases.length}건</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">진행중</h3>
          <div className="summary-card-value text-warning">
            {purchases.filter(p => ['발주완료', '생산중', '배송중'].includes(p.status)).length}건
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">입고완료</h3>
          <div className="summary-card-value text-success">
            {purchases.filter(p => p.status === '입고완료').length}건
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">총 발주금액</h3>
          <div className="summary-card-value">
            ₩{purchases.reduce((sum, p) => sum + p.totalAmount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* 발주 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">발주 목록</h3>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>발주번호</th>
                <th>공급업체</th>
                <th>제품명</th>
                <th>수량</th>
                <th>단가</th>
                <th>총액</th>
                <th>발주일</th>
                <th>예정일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="font-mono font-semibold text-blue-600">{purchase.id}</td>
                  <td className="font-medium">{purchase.supplierName}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FiPackage className="w-4 h-4 text-gray-500" />
                      </div>
                      {purchase.productName}
                    </div>
                  </td>
                  <td className="text-center font-semibold">{purchase.quantity}개</td>
                  <td>₩{purchase.unitPrice.toLocaleString()}</td>
                  <td className="font-semibold">₩{purchase.totalAmount.toLocaleString()}</td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <FiCalendar className="w-3 h-3 text-gray-400" />
                      {purchase.orderDate}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <FiTruck className="w-3 h-3 text-gray-400" />
                      {purchase.expectedDate}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(purchase.status)}`}>
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 공급업체별 현황 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">공급업체별 발주금액</h3>
          </div>
          <div className="space-y-4">
            {Array.from(new Set(purchases.map(p => p.supplierName))).map((supplier) => {
              const supplierPurchases = purchases.filter(p => p.supplierName === supplier);
              const totalAmount = supplierPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
              const totalSum = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
              const percentage = (totalAmount / totalSum) * 100;
              
              return (
                <div key={supplier}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{supplier}</span>
                    <span>₩{totalAmount.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
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
            <h3 className="card-title">재고 알림</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <FiAlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-medium text-red-900">코튼푸드 쌀알 낮잠쿠션</div>
                <div className="text-sm text-red-600">재고 부족 (10개 남음)</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <FiAlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-900">쵸바 참치 키링</div>
                <div className="text-sm text-yellow-600">재고 주의 (25개 남음)</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <FiTruck className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">라이독 브라운 인형</div>
                <div className="text-sm text-blue-600">입고 예정 (7월 5일)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}