'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Save, ChevronRight, ChevronDown } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

interface PagePermission {
  path: string;
  name: string;
  category: string;
  allowedRoles: string[];
  children?: PagePermission[];
}

const defaultPages: PagePermission[] = [
  {
    path: '/online',
    name: '온라인사업',
    category: 'online',
    allowedRoles: [],
    children: [
      { path: '/online', name: '대시보드', category: 'online', allowedRoles: [] },
      { path: '/online/products', name: '제품관리', category: 'online', allowedRoles: [] },
      { path: '/online/orders', name: '주문관리', category: 'online', allowedRoles: [] },
      { path: '/online/channels', name: '채널관리', category: 'online', allowedRoles: [] },
      { path: '/online/customers', name: '고객관리', category: 'online', allowedRoles: [] },
      { path: '/online/purchases', name: '구매관리', category: 'online', allowedRoles: [] },
      { path: '/online/advertising', name: '광고관리', category: 'online', allowedRoles: [] },
      { path: '/online/sales', name: '매출관리', category: 'online', allowedRoles: [] },
      { path: '/online/automation', name: '자동화', category: 'online', allowedRoles: [] }
    ]
  },
  {
    path: '/offline',
    name: '오프라인사업',
    category: 'offline',
    allowedRoles: [],
    children: [
      { path: '/offline', name: '대시보드', category: 'offline', allowedRoles: [] },
      { path: '/offline/products', name: '제품관리', category: 'offline', allowedRoles: [] },
      { path: '/offline/orders', name: '주문관리', category: 'offline', allowedRoles: [] },
      { path: '/offline/channels', name: '채널관리', category: 'offline', allowedRoles: [] },
      { path: '/offline/customers', name: '고객관리', category: 'offline', allowedRoles: [] },
      { path: '/offline/purchases', name: '구매관리', category: 'offline', allowedRoles: [] },
      { path: '/offline/sales', name: '매출관리', category: 'offline', allowedRoles: [] },
      { path: '/offline/automation', name: '자동화', category: 'offline', allowedRoles: [] }
    ]
  },
  {
    path: '/toy',
    name: '토이사업',
    category: 'toy',
    allowedRoles: [],
    children: [
      { path: '/toy', name: '대시보드', category: 'toy', allowedRoles: [] },
      { path: '/toy/products', name: '제품관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/customers', name: '고객관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/quotes', name: '견적관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/samples', name: '샘플관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/production', name: '생산관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/advertising', name: '광고관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/sales', name: '매출관리', category: 'toy', allowedRoles: [] },
      { path: '/toy/automation', name: '자동화', category: 'toy', allowedRoles: [] }
    ]
  },
  {
    path: '/purchase-report',
    name: '구매보고서',
    category: 'purchase-report',
    allowedRoles: [],
    children: [
      { path: '/purchase-report/total-inventory', name: '전체재고', category: 'purchase-report', allowedRoles: [] },
      { path: '/purchase-report/period-inventory', name: '기간별재고', category: 'purchase-report', allowedRoles: [] },
      { path: '/purchase-report/business-inventory', name: '사업부별재고', category: 'purchase-report', allowedRoles: [] },
      { path: '/purchase-report/item-inventory', name: '품목별재고', category: 'purchase-report', allowedRoles: [] },
      { path: '/purchase-report/import-status', name: '수입현황', category: 'purchase-report', allowedRoles: [] }
    ]
  },
  {
    path: '/sales-report',
    name: '매출보고서',
    category: 'sales-report',
    allowedRoles: [],
    children: [
      { path: '/sales-report/period-analysis', name: '기간별분석', category: 'sales-report', allowedRoles: [] },
      { path: '/sales-report/business-analysis', name: '사업별분석', category: 'sales-report', allowedRoles: [] },
      { path: '/sales-report/manager-analysis', name: '담당자별분석', category: 'sales-report', allowedRoles: [] },
      { path: '/sales-report/automation', name: '자동화', category: 'sales-report', allowedRoles: [] }
    ]
  },
  {
    path: '/profit-report',
    name: '손익보고서',
    category: 'profit-report',
    allowedRoles: [],
    children: [
      { path: '/profit-report/cost-management', name: '원가관리', category: 'profit-report', allowedRoles: [] },
      { path: '/profit-report/card-management', name: '카드관리', category: 'profit-report', allowedRoles: [] },
      { path: '/profit-report/account-management', name: '계좌관리', category: 'profit-report', allowedRoles: [] },
      { path: '/profit-report/profit-management', name: '손익관리', category: 'profit-report', allowedRoles: [] },
      { path: '/profit-report/automation', name: '자동화', category: 'profit-report', allowedRoles: [] }
    ]
  },
  {
    path: '/mypage',
    name: '마이페이지',
    category: 'mypage',
    allowedRoles: [],
    children: [
      { path: '/mypage/account', name: '계정관리', category: 'mypage', allowedRoles: [] },
      { path: '/mypage/tasks', name: '업무관리', category: 'mypage', allowedRoles: [] },
      { path: '/mypage/contracts', name: '계약관리', category: 'mypage', allowedRoles: [] },
      { path: '/mypage/vacation', name: '휴가관리', category: 'mypage', allowedRoles: [] },
      { path: '/mypage/automation', name: '자동화', category: 'mypage', allowedRoles: [] }
    ]
  },
  {
    path: '/admin',
    name: '관리자',
    category: 'admin',
    allowedRoles: [],
    children: [
      { path: '/admin/system', name: '기초등록', category: 'admin', allowedRoles: [] },
      { path: '/admin/users', name: '사용자관리', category: 'admin', allowedRoles: [] },
      { path: '/admin/pages', name: '페이지설정', category: 'admin', allowedRoles: [] },
      { path: '/admin/logs', name: '로그관리', category: 'admin', allowedRoles: [] },
      { path: '/admin/servers', name: '서버관리', category: 'admin', allowedRoles: [] }
    ]
  }
];

export default function AdminPagesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [pagePermissions, setPagePermissions] = useState<PagePermission[]>(defaultPages);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    try {
      // 역할 정보 불러오기
      const savedRoles = localStorage.getItem('88erp_roles');
      if (savedRoles) {
        setRoles(JSON.parse(savedRoles));
      }

      // 페이지 권한 정보 불러오기
      const savedPermissions = localStorage.getItem('88erp_page_permissions');
      if (savedPermissions) {
        setPagePermissions(JSON.parse(savedPermissions));
      } else {
        // 기본값 설정 - 관리자는 모든 페이지 접근 가능
        const adminDefaultPages = defaultPages.map(category => ({
          ...category,
          allowedRoles: ['1'], // 관리자 역할 ID
          children: category.children?.map(page => ({
            ...page,
            allowedRoles: ['1']
          }))
        }));
        setPagePermissions(adminDefaultPages);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // 에러 발생시 기본값 설정
      setPagePermissions(defaultPages);
    }
  }, []);

  // 권한 저장
  const savePermissions = () => {
    localStorage.setItem('88erp_page_permissions', JSON.stringify(pagePermissions));
    window.dispatchEvent(new CustomEvent('pagePermissionsUpdated', {
      detail: { permissions: pagePermissions }
    }));
    alert('페이지 권한이 저장되었습니다.');
  };

  // 카테고리 토글
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // 권한 토글
  const togglePermission = (path: string, roleId: string, isCategory: boolean = false) => {
    setPagePermissions(prev => {
      const updated = [...prev];
      
      const updatePage = (pages: PagePermission[]): PagePermission[] => {
        return pages.map(page => {
          if (page.path === path) {
            const newAllowedRoles = page.allowedRoles.includes(roleId)
              ? page.allowedRoles.filter(r => r !== roleId)
              : [...page.allowedRoles, roleId];
            
            // 카테고리인 경우 하위 페이지도 업데이트
            if (isCategory && page.children) {
              return {
                ...page,
                allowedRoles: newAllowedRoles,
                children: page.children.map(child => ({
                  ...child,
                  allowedRoles: newAllowedRoles
                }))
              };
            }
            
            return { ...page, allowedRoles: newAllowedRoles };
          }
          
          if (page.children) {
            return { ...page, children: updatePage(page.children) };
          }
          
          return page;
        });
      };
      
      const result = updatePage(updated);
      
      // 자동 저장
      localStorage.setItem('88erp_page_permissions', JSON.stringify(result));
      
      return result;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">페이지설정</h1>
          <p className="text-gray-600 mt-1">역할별 페이지 접근 권한을 관리합니다</p>
        </div>
        <button 
          onClick={savePermissions} 
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          전체 저장
        </button>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              역할별 페이지 권한
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    페이지
                  </th>
                  {roles.map(role => (
                    <th key={role.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-gray-500">
                      역할을 먼저 등록해주세요. <a href="/admin/system" className="text-blue-600 hover:underline">기초등록 페이지로 이동</a>
                    </td>
                  </tr>
                ) : (
                  pagePermissions.map(category => (
                    <React.Fragment key={category.path}>
                      {/* 카테고리 행 */}
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleCategory(category.category)}
                            className="flex items-center gap-2 font-medium text-gray-900"
                          >
                            {expandedCategories.includes(category.category) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            {category.name}
                          </button>
                        </td>
                        {roles.map(role => (
                          <td key={role.id} className="px-4 py-3 text-center">
                            <button
                              onClick={() => togglePermission(category.path, role.id, true)}
                              className="p-1"
                            >
                              {category.allowedRoles.includes(role.id) ? (
                                <Eye className="w-5 h-5 text-green-600" />
                              ) : (
                                <EyeOff className="w-5 h-5 text-gray-300" />
                              )}
                            </button>
                          </td>
                        ))}
                      </tr>
                      
                      {/* 하위 페이지들 */}
                      {expandedCategories.includes(category.category) && category.children?.map(page => (
                        <tr key={page.path} className="hover:bg-gray-50">
                          <td className="px-4 py-3 pl-12">
                            <span className="text-sm text-gray-700">{page.name}</span>
                          </td>
                          {roles.map(role => (
                            <td key={role.id} className="px-4 py-3 text-center">
                              <button
                                onClick={() => togglePermission(page.path, role.id)}
                                className="p-1"
                              >
                                {page.allowedRoles.includes(role.id) ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-gray-300" />
                                )}
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}