'use client';

import { useState } from 'react';

export default function OfflineProductsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">제품관리</h1>
          <p className="text-gray-600 mt-1">오프라인 매장 제품을 관리하세요</p>
        </div>
        <button className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          제품 추가
        </button>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', name: '전체', count: 156 },
            { id: 'choba', name: '쵸바', count: 48 },
            { id: 'cottonfood', name: '코튼푸드', count: 62 },
            { id: 'cottonani', name: '코튼애니', count: 46 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* 필터 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="제품명 검색..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">품목 선택</option>
          <option value="keyring">키링</option>
          <option value="cushion">쿠션</option>
          <option value="doll">인형</option>
          <option value="sticker">스티커</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">상태 선택</option>
          <option value="in_stock">재고있음</option>
          <option value="low_stock">재고부족</option>
          <option value="out_of_stock">품절</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">정렬</option>
          <option value="name">이름순</option>
          <option value="stock">재고순</option>
          <option value="price">가격순</option>
        </select>
      </div>

      {/* 제품 리스트 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제품정보</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">재고</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">판매가</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { 
                  id: 1, 
                  name: '쵸바 계란 키링', 
                  brand: '쵸바', 
                  sku: 'CHO-EGG-001', 
                  stock: 45, 
                  price: '8,000원', 
                  status: 'in_stock',
                  image: '/images/choba-egg.jpg'
                },
                { 
                  id: 2, 
                  name: '코튼푸드 쌀알 쿠션', 
                  brand: '코튼푸드', 
                  sku: 'CTF-RICE-001', 
                  stock: 8, 
                  price: '35,000원', 
                  status: 'low_stock',
                  image: '/images/cottonfood-rice.jpg'
                },
                { 
                  id: 3, 
                  name: '라이독 브라운 인형', 
                  brand: '코튼애니', 
                  sku: 'CTA-DOG-001', 
                  stock: 0, 
                  price: '28,000원', 
                  status: 'out_of_stock',
                  image: '/images/liedog-brown.jpg'
                },
                { 
                  id: 4, 
                  name: '쵸바 새우 볼체인토이', 
                  brand: '쵸바', 
                  sku: 'CHO-SHR-002', 
                  stock: 120, 
                  price: '12,000원', 
                  status: 'in_stock',
                  image: '/images/choba-shrimp.jpg'
                },
                { 
                  id: 5, 
                  name: '코튼푸드 복숭아 모찌방석', 
                  brand: '코튼푸드', 
                  sku: 'CTF-PEA-001', 
                  stock: 25, 
                  price: '42,000원', 
                  status: 'in_stock',
                  image: '/images/cottonfood-peach.jpg'
                }
              ].map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}개</div>
                    {product.stock <= 10 && product.stock > 0 && (
                      <div className="text-xs text-yellow-600">재고 부족</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.status === 'in_stock' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        재고있음
                      </span>
                    )}
                    {product.status === 'low_stock' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        재고부족
                      </span>
                    )}
                    {product.status === 'out_of_stock' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        품절
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">수정</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="btn btn-outline">이전</button>
            <button className="btn btn-outline">다음</button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                전체 <span className="font-medium">156</span>개 중{' '}
                <span className="font-medium">1</span> - <span className="font-medium">5</span> 표시
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}