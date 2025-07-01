'use client';

import { useState } from 'react';
import { FiPackage, FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: '판매중' | '품절' | '단종';
}

export default function ProductsPage() {
  const [products] = useState<Product[]>([
    { id: '1', name: '쵸바 계란 키링', sku: 'CH-EGG-001', category: '쵸바', price: 8900, stock: 150, status: '판매중' },
    { id: '2', name: '코튼푸드 쌀알 낮잠쿠션', sku: 'CF-RICE-002', category: '코튼푸드', price: 24900, stock: 0, status: '품절' },
    { id: '3', name: '라이독 브라운 인형', sku: 'LD-BR-003', category: '코튼애니', price: 45900, stock: 75, status: '판매중' },
    { id: '4', name: '쵸바 새우 볼체인토이', sku: 'CH-SHR-004', category: '쵸바', price: 12900, stock: 200, status: '판매중' },
    { id: '5', name: '코튼푸드 바나나 모찌방석', sku: 'CF-BAN-005', category: '코튼푸드', price: 19900, stock: 30, status: '판매중' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '판매중': return 'badge-success';
      case '품절': return 'badge-warning';
      case '단종': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">제품관리</h1>
          <p className="text-gray-600 mt-1">온라인 쇼핑몰 제품을 관리하세요</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FiPlus className="w-4 h-4" />
          새 제품 등록
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="제품명 또는 SKU로 검색..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">전체 카테고리</option>
            <option value="쵸바">쵸바</option>
            <option value="코튼푸드">코튼푸드</option>
            <option value="코튼애니">코튼애니</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">전체 상태</option>
            <option value="판매중">판매중</option>
            <option value="품절">품절</option>
            <option value="단종">단종</option>
          </select>
        </div>
      </div>

      {/* 제품 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">제품 목록</h3>
          <p className="text-sm text-gray-600 mt-1">총 {filteredProducts.length}개 제품</p>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>제품명</th>
                <th>SKU</th>
                <th>카테고리</th>
                <th>판매가</th>
                <th>재고</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="font-mono text-sm">{product.sku}</td>
                  <td>{product.category}</td>
                  <td className="font-semibold">₩{product.price.toLocaleString()}</td>
                  <td>
                    <span className={product.stock === 0 ? 'text-red-600 font-semibold' : ''}>
                      {product.stock}개
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">전체 제품</h3>
          <div className="summary-card-value">{products.length}개</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">판매중</h3>
          <div className="summary-card-value text-success">
            {products.filter(p => p.status === '판매중').length}개
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">품절</h3>
          <div className="summary-card-value text-warning">
            {products.filter(p => p.status === '품절').length}개
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">평균 가격</h3>
          <div className="summary-card-value">
            ₩{Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}