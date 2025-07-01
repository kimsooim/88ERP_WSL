'use client';

import { useState } from 'react';
import { FiActivity, FiTrendingUp, FiSettings, FiExternalLink } from 'react-icons/fi';

interface Channel {
  id: string;
  name: string;
  type: '자사몰' | '오픈마켓' | 'SNS';
  status: '연동중' | '중단' | '오류';
  todaySales: number;
  monthSales: number;
  orderCount: number;
  commission: number;
}

export default function ChannelsPage() {
  const [channels] = useState<Channel[]>([
    {
      id: '1',
      name: '네이버 스마트스토어',
      type: '오픈마켓',
      status: '연동중',
      todaySales: 1450000,
      monthSales: 28900000,
      orderCount: 125,
      commission: 2.5
    },
    {
      id: '2',
      name: '쿠팡',
      type: '오픈마켓',
      status: '연동중',
      todaySales: 980000,
      monthSales: 19600000,
      orderCount: 89,
      commission: 3.0
    },
    {
      id: '3',
      name: '자사몰',
      type: '자사몰',
      status: '연동중',
      todaySales: 650000,
      monthSales: 13000000,
      orderCount: 45,
      commission: 0
    },
    {
      id: '4',
      name: 'SSG.COM',
      type: '오픈마켓',
      status: '중단',
      todaySales: 0,
      monthSales: 5800000,
      orderCount: 0,
      commission: 2.8
    },
    {
      id: '5',
      name: '인스타그램 쇼핑',
      type: 'SNS',
      status: '오류',
      todaySales: 0,
      monthSales: 2400000,
      orderCount: 0,
      commission: 1.5
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '연동중': return 'badge-success';
      case '중단': return 'badge-warning';
      case '오류': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case '자사몰': return 'badge-info';
      case '오픈마켓': return 'badge-success';
      case 'SNS': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">채널관리</h1>
        <p className="text-gray-600 mt-1">온라인 판매 채널을 관리하세요</p>
      </div>

      {/* 채널별 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">전체 채널</h3>
          <div className="summary-card-value">{channels.length}개</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">연동중</h3>
          <div className="summary-card-value text-success">
            {channels.filter(c => c.status === '연동중').length}개
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">오늘 총 매출</h3>
          <div className="summary-card-value">
            ₩{channels.reduce((sum, c) => sum + c.todaySales, 0).toLocaleString()}
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">오늘 주문</h3>
          <div className="summary-card-value">
            {channels.reduce((sum, c) => sum + c.orderCount, 0)}건
          </div>
        </div>
      </div>

      {/* 채널 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">판매 채널 현황</h3>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>채널명</th>
                <th>유형</th>
                <th>상태</th>
                <th>오늘 매출</th>
                <th>월 매출</th>
                <th>오늘 주문</th>
                <th>수수료</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((channel) => (
                <tr key={channel.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FiActivity className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getTypeBadge(channel.type)}`}>
                      {channel.type}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(channel.status)}`}>
                      {channel.status}
                    </span>
                  </td>
                  <td className="font-semibold">
                    ₩{channel.todaySales.toLocaleString()}
                  </td>
                  <td className="font-semibold">
                    ₩{channel.monthSales.toLocaleString()}
                  </td>
                  <td className="text-center">{channel.orderCount}건</td>
                  <td className="text-center">{channel.commission}%</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <FiSettings className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <FiExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 채널별 성과 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">채널별 매출 비중</h3>
          </div>
          <div className="space-y-4">
            {channels.filter(c => c.monthSales > 0).map((channel, index) => {
              const total = channels.reduce((sum, c) => sum + c.monthSales, 0);
              const percentage = (channel.monthSales / total) * 100;
              
              return (
                <div key={channel.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{channel.name}</span>
                    <span>{percentage.toFixed(1)}%</span>
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
            <h3 className="card-title">채널 연동 상태</h3>
          </div>
          <div className="space-y-3">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    channel.status === '연동중' ? 'bg-green-500' :
                    channel.status === '중단' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium">{channel.name}</span>
                </div>
                <span className={`badge ${getStatusBadge(channel.status)}`}>
                  {channel.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}