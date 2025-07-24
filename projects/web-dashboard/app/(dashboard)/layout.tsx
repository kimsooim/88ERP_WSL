'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiPackage, FiShoppingCart, FiUsers, FiTruck, FiDollarSign, FiActivity, FiUser, FiSettings, FiFileText, FiTrendingUp, FiCreditCard, FiBriefcase, FiClipboard, FiCalendar, FiBell, FiSearch, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const menuItems: { [key: string]: MenuItem[] } = {
  online: [
    { name: '대시보드', href: '/online', icon: <FiHome className="w-4 h-4" /> },
    { name: '제품관리', href: '/online/products', icon: <FiPackage className="w-4 h-4" /> },
    { name: '주문관리', href: '/online/orders', icon: <FiShoppingCart className="w-4 h-4" /> },
    { name: '채널관리', href: '/online/channels', icon: <FiActivity className="w-4 h-4" /> },
    { name: '고객관리', href: '/online/customers', icon: <FiUsers className="w-4 h-4" /> },
    { name: '구매관리', href: '/online/purchases', icon: <FiTruck className="w-4 h-4" /> },
    { name: '광고관리', href: '/online/advertising', icon: <FiTrendingUp className="w-4 h-4" /> },
    { name: '매출관리', href: '/online/sales', icon: <FiDollarSign className="w-4 h-4" /> },
    { name: '자동화', href: '/online/automation', icon: <FiSettings className="w-4 h-4" /> }
  ],
  offline: [
    { name: '대시보드', href: '/offline', icon: <FiHome className="w-4 h-4" /> },
    { name: '제품관리', href: '/offline/products', icon: <FiPackage className="w-4 h-4" /> },
    { name: '주문관리', href: '/offline/orders', icon: <FiShoppingCart className="w-4 h-4" /> },
    { name: '채널관리', href: '/offline/channels', icon: <FiActivity className="w-4 h-4" /> },
    { name: '고객관리', href: '/offline/customers', icon: <FiUsers className="w-4 h-4" /> },
    { name: '구매관리', href: '/offline/purchases', icon: <FiTruck className="w-4 h-4" /> },
    { name: '매출관리', href: '/offline/sales', icon: <FiDollarSign className="w-4 h-4" /> },
    { name: '자동화', href: '/offline/automation', icon: <FiSettings className="w-4 h-4" /> }
  ],
  toy: [
    { name: '대시보드', href: '/toy', icon: <FiHome className="w-4 h-4" /> },
    { name: '제품관리', href: '/toy/products', icon: <FiPackage className="w-4 h-4" /> },
    { name: '고객관리', href: '/toy/customers', icon: <FiUsers className="w-4 h-4" /> },
    { name: '견적관리', href: '/toy/quotes', icon: <FiFileText className="w-4 h-4" /> },
    { name: '샘플관리', href: '/toy/samples', icon: <FiClipboard className="w-4 h-4" /> },
    { name: '생산관리', href: '/toy/production', icon: <FiActivity className="w-4 h-4" /> },
    { name: '광고관리', href: '/toy/advertising', icon: <FiTrendingUp className="w-4 h-4" /> },
    { name: '매출관리', href: '/toy/sales', icon: <FiDollarSign className="w-4 h-4" /> },
    { name: '자동화', href: '/toy/automation', icon: <FiSettings className="w-4 h-4" /> }
  ],
  'purchase-report': [
    { name: '기초관리', href: '/purchase-report/basic-management', icon: <FiSettings className="w-4 h-4" /> },
    { name: '품목관리', href: '/purchase-report/item-management', icon: <FiPackage className="w-4 h-4" /> },
    { name: '입고관리', href: '/purchase-report/incoming', icon: <FiTruck className="w-4 h-4" /> },
    { name: '출고관리', href: '/purchase-report/outgoing', icon: <FiPackage className="w-4 h-4" /> },
    { name: '도매재고', href: '/purchase-report/wholesale', icon: <FiBriefcase className="w-4 h-4" /> },
    { name: '오프라인재고', href: '/purchase-report/offline', icon: <FiShoppingCart className="w-4 h-4" /> },
    { name: '온라인재고', href: '/purchase-report/online', icon: <FiActivity className="w-4 h-4" /> },
    { name: '자재재고', href: '/purchase-report/materials', icon: <FiClipboard className="w-4 h-4" /> }
  ],
  'sales-report': [
    { name: '기간별분석', href: '/sales-report/period-analysis', icon: <FiCalendar className="w-4 h-4" /> },
    { name: '사업별분석', href: '/sales-report/business-analysis', icon: <FiBriefcase className="w-4 h-4" /> },
    { name: '담당자별분석', href: '/sales-report/manager-analysis', icon: <FiUsers className="w-4 h-4" /> },
    { name: '자동화', href: '/sales-report/automation', icon: <FiSettings className="w-4 h-4" /> }
  ],
  'profit-report': [
    { name: '원가관리', href: '/profit-report/cost-management', icon: <FiDollarSign className="w-4 h-4" /> },
    { name: '카드관리', href: '/profit-report/card-management', icon: <FiCreditCard className="w-4 h-4" /> },
    { name: '계좌관리', href: '/profit-report/account-management', icon: <FiDollarSign className="w-4 h-4" /> },
    { name: '손익관리', href: '/profit-report/profit-management', icon: <FiTrendingUp className="w-4 h-4" /> },
    { name: '자동화', href: '/profit-report/automation', icon: <FiSettings className="w-4 h-4" /> }
  ],
  mypage: [
    { name: '계정관리', href: '/mypage/account', icon: <FiUser className="w-4 h-4" /> },
    { name: '업무관리', href: '/mypage/tasks', icon: <FiBriefcase className="w-4 h-4" /> },
    { name: '계약관리', href: '/mypage/contracts', icon: <FiFileText className="w-4 h-4" /> },
    { name: '휴가관리', href: '/mypage/vacation', icon: <FiCalendar className="w-4 h-4" /> },
    { name: '자동화', href: '/mypage/automation', icon: <FiSettings className="w-4 h-4" /> }
  ],
  admin: [
    { name: '기초등록', href: '/admin/system', icon: <FiSettings className="w-4 h-4" /> },
    { name: '사용자관리', href: '/admin/users', icon: <FiUsers className="w-4 h-4" /> },
    { name: '로그인설정', href: '/admin/pages', icon: <FiFileText className="w-4 h-4" /> },
    { name: '로그관리', href: '/admin/logs', icon: <FiActivity className="w-4 h-4" /> },
    { name: '서버관리', href: '/admin/servers', icon: <FiTrendingUp className="w-4 h-4" /> },
    { name: '개발로그', href: '/admin/devlog', icon: <FiFileText className="w-4 h-4" /> }
  ]
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState('online');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // 현재 경로에서 카테고리 추출
    const pathSegments = pathname.split('/').filter(Boolean);
    const category = pathSegments[0];
    
    if (category && menuItems[category]) {
      setActiveCategory(category);
    }
  }, [pathname]);

  // 프로필 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // 해당 카테고리의 첫 번째 메뉴로 이동
    if (menuItems[category] && menuItems[category].length > 0) {
      router.push(menuItems[category][0].href);
    }
  };

  const getCategoryName = (key: string) => {
    const names: { [key: string]: string } = {
      online: '온라인사업',
      offline: '오프라인사업',
      toy: '토이사업',
      'purchase-report': '재고관리',
      'sales-report': '매출보고서',
      'profit-report': '손익보고서',
      mypage: '마이페이지',
      admin: '관리자'
    };
    return names[key] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이히어 스타일 상단 헤더 - 블루 배경 (고정) */}
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* 로고 - PNG 반전으로 흰색 */}
              <Link href="/online" className="flex items-center gap-3">
                <img 
                  src="/images/88_logo.png" 
                  alt="88 Logo" 
                  className="w-10 h-10 object-contain"
                  style={{
                    filter: 'invert(1) brightness(0) saturate(100%) invert(100%)'
                  }}
                />
                <span className="font-bold text-xl text-white leading-none">ERP</span>
              </Link>
              
              {/* 상단 카테고리 네비게이션 */}
              <nav className="flex items-center gap-1">
                {Object.keys(menuItems).map((key) => (
                  <Link
                    key={key}
                    href={menuItems[key][0]?.href || '/'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      activeCategory === key
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    {getCategoryName(key)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 오른쪽 영역 */}
            <div className="flex items-center gap-4">
              {/* 검색 */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4" />
                <input
                  type="text"
                  placeholder="검색..."
                  className="pl-10 pr-4 py-2 bg-blue-500 text-white placeholder-blue-200 rounded-lg text-sm border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>
              
              {/* 알림 */}
              <button className="text-blue-100 hover:text-white p-2 rounded-lg hover:bg-blue-500 transition-colors">
                <FiBell className="w-5 h-5" />
              </button>
              
              {/* 프로필 드롭다운 */}
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                >
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                </button>

                {/* 프로필 드롭다운 메뉴 */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-gray-400">
                        {user?.role === 'admin' ? '관리자' : user?.role === 'manager' ? '매니저' : '일반사용자'}
                      </p>
                    </div>
                    <a 
                      href="/mypage/account"
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 block"
                    >
                      <FiUser className="w-4 h-4" />
                      내 계정
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 좌측 사이드바 */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <nav className="p-3">
            <div className="space-y-1">
              {menuItems[activeCategory]?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}