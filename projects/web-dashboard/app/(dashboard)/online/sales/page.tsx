'use client';

import { useState } from 'react';
import { FiDollarSign, FiTrendingUp, FiBarChart, FiCalendar } from 'react-icons/fi';

interface SalesData {
  date: string;
  amount: number;
  orders: number;
  avgOrderValue: number;
}

interface ProductSales {
  name: string;
  sales: number;
  quantity: number;
  revenue: number;
}

export default function SalesPage() {
  const [salesData] = useState<SalesData[]>([
    { date: '2025-06-24', amount: 2800000, orders: 45, avgOrderValue: 62222 },
    { date: '2025-06-25', amount: 3200000, orders: 52, avgOrderValue: 61538 },
    { date: '2025-06-26', amount: 2900000, orders: 48, avgOrderValue: 60417 },
    { date: '2025-06-27', amount: 3580000, orders: 58, avgOrderValue: 61724 },
    { date: '2025-06-28', amount: 3950000, orders: 65, avgOrderValue: 60769 },
    { date: '2025-06-29', amount: 4200000, orders: 68, avgOrderValue: 61765 },
    { date: '2025-06-30', amount: 4580000, orders: 72, avgOrderValue: 63611 }
  ]);

  const [productSales] = useState<ProductSales[]>([
    { name: '쵸바 계란 키링', sales: 850000, quantity: 120, revenue: 850000 },
    { name: '코튼푸드 낮잠쿠션', sales: 720000, quantity: 30, revenue: 720000 },
    { name: '라이독 브라운 인형', sales: 650000, quantity: 15, revenue: 650000 },
    { name: '쵸바 새우 볼체인토이', sales: 580000, quantity: 65, revenue: 580000 },
    { name: '코튼푸드 바나나 모찌방석', sales: 480000, quantity: 25, revenue: 480000 }
  ]);

  const totalSales = salesData.reduce((sum, data) => sum + data.amount, 0);
  const totalOrders = salesData.reduce((sum, data) => sum + data.orders, 0);
  const avgOrderValue = totalSales / totalOrders;

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">매출관리</h1>
        <p className="text-gray-600 mt-1">온라인 쇼핑몰 매출을 분석하고 관리하세요</p>
      </div>

      {/* 매출 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">주간 총 매출</h3>
          <div className="summary-card-value">₩{totalSales.toLocaleString()}</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">총 주문수</h3>
          <div className="summary-card-value">{totalOrders}건</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">평균 주문금액</h3>
          <div className="summary-card-value">₩{Math.round(avgOrderValue).toLocaleString()}</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">일평균 매출</h3>
          <div className="summary-card-value">₩{Math.round(totalSales / 7).toLocaleString()}</div>
        </div>
      </div>

      {/* 일별 매출 차트 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">일별 매출 추이</h3>
        </div>
        <div className="h-64 flex items-end gap-4 px-4 pb-4">
          {salesData.map((data, index) => {
            const height = (data.amount / Math.max(...salesData.map(d => d.amount))) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-2">
                  {data.date.split('-')[2]}일
                </div>
                <div className="relative w-full bg-gray-100 rounded-t-lg" style={{ height: '200px' }}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500 group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₩{(data.amount / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {data.orders}건
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 제품별 매출 및 채널별 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 제품별 매출 TOP 5 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">제품별 매출 TOP 5</h3>
          </div>
          <div className="space-y-3">
            {productSales.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.quantity}개 판매</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">₩{product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 매출 분석 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">매출 분석</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiTrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">매출 성장률</span>
              </div>
              <span className="font-bold text-blue-600">+15.3%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiBarChart className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">주문 전환율</span>
              </div>
              <span className="font-bold text-green-600">3.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiDollarSign className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">재구매율</span>
              </div>
              <span className="font-bold text-orange-600">24.7%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiCalendar className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">월 목표 달성률</span>
              </div>
              <span className="font-bold text-purple-600">87.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 채널별 매출 현황 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">채널별 매출 현황</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>채널명</th>
                <th>주간 매출</th>
                <th>주문수</th>
                <th>평균 주문금액</th>
                <th>매출 비중</th>
                <th>성장률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">네이버 스마트스토어</td>
                <td className="font-semibold">₩12,450,000</td>
                <td>205건</td>
                <td>₩60,732</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    <span className="text-sm">42%</span>
                  </div>
                </td>
                <td className="text-green-600 font-semibold">+8.5%</td>
              </tr>
              <tr>
                <td className="font-medium">쿠팡</td>
                <td className="font-semibold">₩8,930,000</td>
                <td>148건</td>
                <td>₩60,338</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-sm">30%</span>
                  </div>
                </td>
                <td className="text-green-600 font-semibold">+12.3%</td>
              </tr>
              <tr>
                <td className="font-medium">자사몰</td>
                <td className="font-semibold">₩5,320,000</td>
                <td>76건</td>
                <td>₩70,000</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    <span className="text-sm">18%</span>
                  </div>
                </td>
                <td className="text-green-600 font-semibold">+5.7%</td>
              </tr>
              <tr>
                <td className="font-medium">SSG.COM</td>
                <td className="font-semibold">₩2,510,000</td>
                <td>41건</td>
                <td>₩61,220</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <span className="text-sm">10%</span>
                  </div>
                </td>
                <td className="text-red-600 font-semibold">-2.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}