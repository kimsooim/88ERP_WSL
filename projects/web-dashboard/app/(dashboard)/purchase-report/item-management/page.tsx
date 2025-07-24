'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FiPackage, FiShoppingCart, FiActivity, FiBriefcase, FiTool, FiGlobe, FiChevronUp, FiChevronDown, FiFilter, FiX, FiUpload, FiDownload } from 'react-icons/fi';

interface TabItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const tabs: TabItem[] = [
  {
    id: 'wholesale',
    name: '도매',
    icon: <FiBriefcase className="w-5 h-5" />,
    description: '도매 거래 품목 관리'
  },
  {
    id: 'popup',
    name: '팝업',
    icon: <FiShoppingCart className="w-5 h-5" />,
    description: '팝업스토어 품목 관리'
  },
  {
    id: 'online',
    name: '온라인',
    icon: <FiActivity className="w-5 h-5" />,
    description: '온라인 쇼핑몰 품목 관리'
  },
  {
    id: 'export',
    name: '수출',
    icon: <FiGlobe className="w-5 h-5" />,
    description: '해외 수출 품목 관리'
  },
  {
    id: 'toy',
    name: '토이',
    icon: <FiPackage className="w-5 h-5" />,
    description: '토이 OEM 생산 품목 관리'
  },
  {
    id: 'material',
    name: '코드모음',
    icon: <FiTool className="w-5 h-5" />,
    description: '코드 통합 관리'
  }
];

// 샘플 데이터
const sampleData = {
  wholesale: [
    {
      내역: '신규',
      브랜드: '디즈니',
      종류: '인형',
      캐릭터: '미키마우스',
      품목코드: 'DIS-001',
      품목명: '미키마우스 25cm 인형',
      원가: '$12.50',
      대량판매가: 25000,
      도도매가: 30000,
      소비자가: 45000,
      포장: 'OPP개별포장',
      박스입수: 24,
      OPP입수: 1,
      현재고: 156,
      재고일: '2025-01-20'
    },
    {
      내역: '재입고',
      브랜드: '포켓몬',
      종류: '피규어',
      캐릭터: '피카츄',
      품목코드: 'POK-002',
      품목명: '피카츄 액션 피규어',
      원가: '$8.00',
      대량판매가: 14000,
      도도매가: 17000,
      소비자가: 25000,
      포장: '박스포장',
      박스입수: 48,
      OPP입수: 2,
      현재고: 324,
      재고일: '2025-01-18'
    },
    {
      내역: '신규',
      브랜드: '산리오',
      종류: '키링',
      캐릭터: '헬로키티',
      품목코드: 'SAN-001',
      품목명: '헬로키티 메탈 키링',
      원가: '$2.50',
      대량판매가: 5000,
      도도매가: 6500,
      소비자가: 9000,
      포장: 'OPP개별포장',
      박스입수: 100,
      OPP입수: 1,
      현재고: 580,
      재고일: '2025-01-19'
    },
    {
      내역: '품절임박',
      브랜드: '마블',
      종류: '피규어',
      캐릭터: '스파이더맨',
      품목코드: 'MAR-001',
      품목명: '스파이더맨 액션 피규어 15cm',
      원가: '$15.00',
      대량판매가: 28000,
      도도매가: 35000,
      소비자가: 50000,
      포장: '박스포장',
      박스입수: 36,
      OPP입수: 1,
      현재고: 12,
      재고일: '2025-01-15'
    },
    {
      내역: '재입고',
      브랜드: '짱구',
      종류: '인형',
      캐릭터: '짱구',
      품목코드: 'CSK-001',
      품목명: '짱구 봉제인형 20cm',
      원가: '$9.80',
      대량판매가: 18000,
      도도매가: 22000,
      소비자가: 32000,
      포장: 'OPP개별포장',
      박스입수: 30,
      OPP입수: 1,
      현재고: 245,
      재고일: '2025-01-21'
    }
  ],
  popup: [
    {
      내역: '신규',
      브랜드: '짱구',
      종류: '인형',
      캐릭터: '짱구',
      품목코드: 'POP-001',
      품목명: '짱구 인형 25cm',
      바코드: '8809123456789',
      A코드: 'A-2024-001',
      N코드: 'N-POP-001',
      원가: '$8.50',
      사입가: 12000,
      위탁가: 18000,
      할인가: 28000,
      소비자가: 35000,
      포장: 'OPP개별포장',
      KC: 'Y',
      현재고: 85,
      재고일: '2025-01-19'
    },
    {
      내역: '재입고',
      브랜드: '뽀로로',
      종류: '피규어',
      캐릭터: '뽀로로',
      품목코드: 'POP-002',
      품목명: '뽀로로 피규어 세트',
      바코드: '8809234567890',
      A코드: 'A-2024-002',
      N코드: 'N-POP-002',
      원가: '$10.00',
      사입가: 15000,
      위탁가: 22000,
      할인가: 32000,
      소비자가: 38000,
      포장: '박스포장',
      KC: 'Y',
      현재고: 120,
      재고일: '2025-01-18'
    },
    {
      내역: '신규',
      브랜드: '포켓몬',
      종류: '키링',
      캐릭터: '피카츄',
      품목코드: 'POP-003',
      품목명: '피카츄 메탈키링',
      바코드: '8809345678901',
      A코드: 'A-2024-003',
      N코드: 'N-POP-003',
      원가: '$2.00',
      사입가: 3000,
      위탁가: 4500,
      할인가: 7000,
      소비자가: 9000,
      포장: 'OPP개별포장',
      KC: 'N',
      현재고: 350,
      재고일: '2025-01-20'
    },
    {
      내역: '재입고',
      브랜드: '산리오',
      종류: '인형',
      캐릭터: '헬로키티',
      품목코드: 'POP-004',
      품목명: '헬로키티 리본인형 30cm',
      바코드: '8809456789012',
      A코드: 'A-2024-004',
      N코드: 'N-POP-004',
      원가: '$12.80',
      사입가: 18000,
      위탁가: 26000,
      할인가: 38000,
      소비자가: 45000,
      포장: 'OPP개별포장',
      KC: 'Y',
      현재고: 45,
      재고일: '2025-01-17'
    }
  ],
  online: [
    {
      내역: '신규',
      브랜드: '산리오',
      종류: '키링',
      캐릭터: '헬로키티',
      품목코드: 'ONL-001',
      품목명: '헬로키티 메탈 키링',
      원가: '$2.00',
      자사몰: 8000,
      카카오: 8500,
      기타채널: 9000,
      할인가: 7000,
      할인율: '22%',
      소비자가: 9000,
      포장: 'OPP개별포장',
      KC: 'N',
      현재고: 580,
      재고일: '2025-01-21'
    },
    {
      내역: '재입고',
      브랜드: '마블',
      종류: '피규어',
      캐릭터: '스파이더맨',
      품목코드: 'ONL-002',
      품목명: '스파이더맨 액션 피규어',
      원가: '$9.50',
      자사몰: 32000,
      카카오: 33000,
      기타채널: 34000,
      할인가: 28000,
      할인율: '20%',
      소비자가: 35000,
      포장: '박스포장',
      KC: 'Y',
      현재고: 156,
      재고일: '2025-01-20'
    },
    {
      내역: '신규',
      브랜드: '카카오프렌즈',
      종류: '인형',
      캐릭터: '라이언',
      품목코드: 'ONL-003',
      품목명: '라이언 봉제인형 25cm',
      원가: '$11.20',
      자사몰: 38000,
      카카오: 39000,
      기타채널: 40000,
      할인가: 35000,
      할인율: '13%',
      소비자가: 45000,
      포장: 'OPP개별포장',
      KC: 'Y',
      현재고: 210,
      재고일: '2025-01-19'
    },
    {
      내역: '재입고',
      브랜드: '네이버',
      종류: '쿠션',
      캐릭터: '브라운',
      품목코드: 'ONL-004',
      품목명: '브라운 얼굴쿠션 40cm',
      원가: '$8.00',
      자사몰: 25000,
      카카오: 26000,
      기타채널: 27000,
      할인가: 22000,
      할인율: '18%',
      소비자가: 28000,
      포장: 'PP포장',
      KC: 'Y',
      현재고: 85,
      재고일: '2025-01-18'
    }
  ],
  export: [
    {
      내역: '수출진행',
      브랜드: 'K-POP',
      종류: '굿즈',
      캐릭터: 'BTS',
      품목코드: 'EXP-001',
      품목명: 'BTS 미니 인형 세트',
      바코드: '8809567890123',
      원가: '$18.50',
      수입가: '$18.50',
      수출가A: '$25.00',
      수출가B: '$28.00',
      소비자가: 55000,
      포장: '박스포장',
      KC: 'Y',
      현재고: 250,
      재고일: '2025-01-20'
    },
    {
      내역: '수출완료',
      브랜드: '한류',
      종류: '인형',
      캐릭터: '김치워리어',
      품목코드: 'EXP-002',
      품목명: '김치워리어 피규어',
      바코드: '8809678901234',
      원가: '$12.00',
      수입가: '$12.00',
      수출가A: '$18.00',
      수출가B: '$20.00',
      소비자가: 42000,
      포장: '박스포장',
      KC: 'Y',
      현재고: 180,
      재고일: '2025-01-19'
    },
    {
      내역: '수출진행',
      브랜드: '블랙핑크',
      종류: '키링',
      캐릭터: 'BLACKPINK',
      품목코드: 'EXP-003',
      품목명: 'BLACKPINK 메탈키링 세트',
      바코드: '8809789012345',
      원가: '$3.50',
      수입가: '$3.50',
      수출가A: '$6.00',
      수출가B: '$7.00',
      소비자가: 15000,
      포장: 'OPP개별포장',
      KC: 'N',
      현재고: 500,
      재고일: '2025-01-21'
    },
    {
      내역: '수출완료',
      브랜드: '오징어게임',
      종류: '피규어',
      캐릭터: '오징어게임',
      품목코드: 'EXP-004',
      품목명: '오징어게임 피규어 세트',
      바코드: '8809890123456',
      원가: '$15.00',
      수입가: '$15.00',
      수출가A: '$22.00',
      수출가B: '$25.00',
      소비자가: 48000,
      포장: '박스포장',
      KC: 'Y',
      현재고: 120,
      재고일: '2025-01-18'
    }
  ],
  toy: [
    {
      내역: '진행중',
      종류: '인형',
      바이어: '카카오',
      산업: 'IT/캐릭터',
      품목코드: 'TOY-001',
      품목명: '라이언 30cm 특별판',
      원가: '$14.50',
      수입가: '$14.50',
      도착가: 22000,
      샘플비: 150000,
      생산가: 28000,
      사이즈: '30x25x20cm',
      행택: 'Y',
      라벨: 'Y',
      개별포장: 'OPP',
      박스입수: 24,
      KC: 'Y'
    },
    {
      내역: '완료',
      종류: '인형',
      바이어: '네이버',
      산업: 'IT/캐릭터',
      품목코드: 'TOY-002',
      품목명: '브라운 미니 인형',
      원가: '$3.20',
      수입가: '$3.20',
      도착가: 5000,
      샘플비: 80000,
      생산가: 8000,
      사이즈: '15x12x10cm',
      행택: 'Y',
      라벨: 'N',
      개별포장: 'PP',
      박스입수: 48,
      KC: 'Y'
    },
    {
      내역: '진행중',
      종류: '피규어',
      바이어: '반다이',
      산업: '완구',
      품목코드: 'TOY-003',
      품목명: '건담 RX-78 피규어',
      원가: '$25.00',
      수입가: '$25.00',
      도착가: 38000,
      샘플비: 200000,
      생산가: 45000,
      사이즈: '18x15x12cm',
      행택: 'N',
      라벨: 'Y',
      개별포장: '박스',
      박스입수: 36,
      KC: 'Y'
    },
    {
      내역: '완료',
      종류: '쿠션',
      바이어: '이케아',
      산업: '가구/리빙',
      품목코드: 'TOY-004',
      품목명: '동물 얼굴쿠션 40cm',
      원가: '$8.80',
      수입가: '$8.80',
      도착가: 13000,
      샘플비: 100000,
      생산가: 18000,
      사이즈: '40x40x15cm',
      행택: 'Y',
      라벨: 'Y',
      개별포장: 'PP',
      박스입수: 20,
      KC: 'Y'
    }
  ],
  material: [
    {
      내역: '신규',
      브랜드: '디즈니',
      종류: '인형',
      캐릭터: '미키마우스',
      품목코드: 'MAT-001',
      품목명: '미키마우스 25cm 인형',
      영문명: 'Mickey Mouse 25cm Doll',
      바코드: '8809001234567',
      KC: 'Y'
    },
    {
      내역: '재고',
      브랜드: '포켓몬',
      종류: '피규어',
      캐릭터: '피카츄',
      품목코드: 'MAT-002',
      품목명: '피카츄 액션 피규어',
      영문명: 'Pikachu Action Figure',
      바코드: '8809002345678',
      KC: 'Y'
    },
    {
      내역: '신규',
      브랜드: '산리오',
      종류: '키링',
      캐릭터: '헬로키티',
      품목코드: 'MAT-003',
      품목명: '헬로키티 메탈 키링',
      영문명: 'Hello Kitty Metal Keyring',
      바코드: '8809003456789',
      KC: 'N'
    },
    {
      내역: '재고',
      브랜드: '마블',
      종류: '피규어',
      캐릭터: '스파이더맨',
      품목코드: 'MAT-004',
      품목명: '스파이더맨 액션 피규어 15cm',
      영문명: 'Spider-Man Action Figure 15cm',
      바코드: '8809004567890',
      KC: 'Y'
    },
    {
      내역: '신규',
      브랜드: '짱구',
      종류: '인형',
      캐릭터: '짱구',
      품목코드: 'MAT-005',
      품목명: '짱구 봉제인형 20cm',
      영문명: 'Crayon Shin-chan Plush 20cm',
      바코드: '8809005678901',
      KC: 'Y'
    }
  ]
};

export default function ItemManagementPage() {
  // localStorage에서 저장된 상태 불러오기
  const loadSavedState = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('itemManagementState');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved state:', e);
        }
      }
    }
    return null;
  };

  const savedState = loadSavedState();

  const [activeTab, setActiveTab] = useState(savedState?.activeTab || 'wholesale');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(savedState?.sortConfig || null);
  const [filters, setFilters] = useState<{[tab: string]: {[key: string]: string[]}}>(
    savedState?.filters || {
      wholesale: {},
      popup: {},
      online: {},
      export: {},
      toy: {},
      material: {}
    }
  );
  const [showFilterMenu, setShowFilterMenu] = useState<{column: string | null}>({column: null});
  const filterRef = useRef<HTMLDivElement>(null);

  // 상태 변경시 localStorage에 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        activeTab,
        sortConfig,
        filters
      };
      localStorage.setItem('itemManagementState', JSON.stringify(stateToSave));
    }
  }, [activeTab, sortConfig, filters]);

  // 필터 메뉴 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu({column: null});
      }
    };

    if (showFilterMenu.column) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterMenu]);

  const formatPrice = (price: number | string, isDollar: boolean = false) => {
    if (typeof price === 'string' && price.startsWith('$')) {
      return price;
    }
    if (isDollar) {
      return `$${Number(price).toFixed(2)}`;
    }
    return Number(price).toLocaleString('ko-KR');
  };

  const getCurrentData = () => {
    let data = sampleData[activeTab as keyof typeof sampleData] || [];
    
    // 현재 탭의 필터 적용
    const currentTabFilters = filters[activeTab] || {};
    if (Object.keys(currentTabFilters).length > 0) {
      data = data.filter(item => {
        return Object.entries(currentTabFilters).every(([key, values]) => {
          if (values.length === 0) return true;
          const itemValue = String(item[key as keyof typeof item]);
          return values.includes(itemValue);
        });
      });
    }
    
    // 정렬 적용
    if (sortConfig) {
      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        const aString = String(aValue);
        const bString = String(bValue);
        
        if (sortConfig.direction === 'asc') {
          return aString.localeCompare(bString, 'ko');
        } else {
          return bString.localeCompare(aString, 'ko');
        }
      });
    }
    
    return data;
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return null;
    }
    
    return sortConfig.direction === 'asc' ? 
      <FiChevronUp className="w-3 h-3 inline ml-1" /> : 
      <FiChevronDown className="w-3 h-3 inline ml-1" />;
  };

  const getUniqueValues = (key: string) => {
    const data = sampleData[activeTab as keyof typeof sampleData] || [];
    const values = data.map(item => String(item[key as keyof typeof item]));
    return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'ko'));
  };

  const handleFilter = (column: string, value: string) => {
    setFilters(prev => {
      const tabFilters = prev[activeTab] || {};
      const current = tabFilters[column] || [];
      
      let newTabFilters;
      if (current.includes(value)) {
        const newValues = current.filter(v => v !== value);
        if (newValues.length === 0) {
          const {[column]: _, ...rest} = tabFilters;
          newTabFilters = rest;
        } else {
          newTabFilters = {...tabFilters, [column]: newValues};
        }
      } else {
        newTabFilters = {...tabFilters, [column]: [...current, value]};
      }
      
      return {...prev, [activeTab]: newTabFilters};
    });
  };

  const clearFilter = (column: string) => {
    setFilters(prev => {
      const tabFilters = prev[activeTab] || {};
      const {[column]: _, ...rest} = tabFilters;
      return {...prev, [activeTab]: rest};
    });
    setShowFilterMenu({column: null});
  };

  const clearAllFilters = () => {
    setFilters(prev => ({
      ...prev,
      [activeTab]: {}
    }));
  };

  const isFilterActive = (column: string) => {
    const tabFilters = filters[activeTab] || {};
    return tabFilters[column] && tabFilters[column].length > 0;
  };

  const TableHeader = ({ column, align = 'left', isLastColumn = false }: { column: string; align?: 'left' | 'right' | 'center'; isLastColumn?: boolean }) => {
    const headerRef = useRef<HTMLTableHeaderCellElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    
    const updateDropdownPosition = useCallback(() => {
      if (headerRef.current && showFilterMenu.column === column) {
        const rect = headerRef.current.getBoundingClientRect();
        const dropdownWidth = 192; // w-48 = 12rem = 192px
        const viewportWidth = window.innerWidth;
        
        let left = rect.left;
        if (left + dropdownWidth > viewportWidth) {
          left = rect.right - dropdownWidth;
        }
        
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: left + window.scrollX
        });
      }
    }, [column]);
    
    useEffect(() => {
      updateDropdownPosition();
      window.addEventListener('resize', updateDropdownPosition);
      window.addEventListener('scroll', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('resize', updateDropdownPosition);
        window.removeEventListener('scroll', updateDropdownPosition);
      };
    }, [updateDropdownPosition]);
    
    return (
      <th ref={headerRef} className={`px-4 py-3 text-${align} text-xs font-medium text-gray-500 uppercase tracking-wider relative`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleSort(column)}
            className={`flex-1 text-${align} hover:text-gray-700`}
          >
            {column} {getSortIcon(column)}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFilterMenu({column: showFilterMenu.column === column ? null : column});
            }}
            className={`ml-2 p-1 rounded hover:bg-gray-200 ${isFilterActive(column) ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <FiFilter className="w-3 h-3" />
          </button>
        </div>
        
        {/* 필터 드롭다운 - Portal로 렌더링 */}
        {showFilterMenu.column === column && typeof window !== 'undefined' && createPortal(
          <div 
            ref={filterRef} 
            className="fixed w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`
            }}
          >
            <div className="p-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{column} 필터</span>
                <button
                  onClick={() => clearFilter(column)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  초기화
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {getUniqueValues(column).map(value => (
                <label
                  key={value}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters[activeTab]?.[column]?.includes(value) || false}
                    onChange={() => handleFilter(column, value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{value}</span>
                </label>
              ))}
            </div>
          </div>,
          document.body
        )}
      </th>
    );
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleSave = () => {
    // 저장 로직 추후 구현
    setShowEditModal(false);
  };

  const handleDelete = () => {
    if (confirm('정말로 이 품목을 삭제하시겠습니까?')) {
      // 삭제 로직 추후 구현
      setShowEditModal(false);
    }
  };

  // 샘플 엑셀 데이터 생성
  const getSampleExcelData = () => {
    const headers = getHeadersByTab(activeTab);
    const sampleRow = getSampleRowByTab(activeTab);
    return {
      headers,
      data: [sampleRow]
    };
  };

  // 탭별 헤더 정의
  const getHeadersByTab = (tab: string) => {
    const headerMap: {[key: string]: string[]} = {
      wholesale: ['내역', '브랜드', '종류', '캐릭터', '품목코드', '품목명', '원가', '대량판매가', '도도매가', '소비자가', '포장', '박스입수', 'OPP입수', '현재고', '재고일'],
      popup: ['내역', '브랜드', '종류', '캐릭터', '품목코드', '품목명', '바코드', 'A코드', 'N코드', '원가', '사입가', '위탁가', '할인가', '소비자가', '포장', 'KC', '현재고', '재고일'],
      online: ['내역', '브랜드', '종류', '캐릭터', '품목코드', '품목명', '원가', '자사몰', '카카오', '기타채널', '할인가', '할인율', '소비자가', '포장', 'KC', '현재고', '재고일'],
      export: ['내역', '브랜드', '종류', '캐릭터', '품목코드', '품목명', '바코드', '원가', '수입가', '수출가A', '수출가B', '소비자가', '포장', 'KC', '현재고', '재고일'],
      toy: ['내역', '종류', '바이어', '산업', '품목코드', '품목명', '원가', '수입가', '도착가', '샘플비', '생산가', '사이즈', '행택', '라벨', '포장', '박스입수', 'KC'],
      material: ['내역', '브랜드', '종류', '캐릭터', '품목코드', '품목명', '영문명', '바코드', 'KC']
    };
    return headerMap[tab] || [];
  };

  // 탭별 샘플 데이터
  const getSampleRowByTab = (tab: string) => {
    const sampleMap: {[key: string]: any} = {
      wholesale: ['신규', '디즈니', '인형', '미키마우스', 'DIS-001', '미키마우스 25cm 인형', '18750', '25000', '30000', '45000', 'OPP개별포장', '24', '1', '156', '2025-01-20'],
      popup: ['신규', '짱구', '인형', '짱구', 'POP-001', '짱구 인형 25cm', '8809123456789', 'A-2024-001', 'N-POP-001', '12750', '12000', '18000', '28000', '35000', 'OPP개별포장', 'Y', '85', '2025-01-19'],
      online: ['신규', '산리오', '키링', '헬로키티', 'ONL-001', '헬로키티 메탈 키링', '3000', '8000', '8500', '9000', '7000', '22%', '9000', 'OPP개별포장', 'N', '580', '2025-01-21'],
      export: ['수출진행', 'K-POP', '굿즈', 'BTS', 'EXP-001', 'BTS 미니 인형 세트', '8809567890123', '27750', '$18.50', '$25.00', '$28.00', '55000', '박스포장', 'Y', '250', '2025-01-20'],
      toy: ['진행중', '인형', '카카오', 'IT/캐릭터', 'TOY-001', '라이언 30cm 특별판', '21750', '$14.50', '22000', '150000', '28000', '30x25x20cm', 'Y', 'Y', 'OPP', '24', 'Y'],
      material: ['신규', '디즈니', '인형', '미키마우스', 'MAT-001', '미키마우스 25cm 인형', 'Mickey Mouse 25cm Doll', '8809001234567', 'Y']
    };
    return sampleMap[tab] || [];
  };

  // 엑셀 다운로드 함수
  const downloadExcel = (data: any, filename: string) => {
    // 실제 구현시 xlsx 라이브러리 사용
    console.log('Downloading excel:', filename, data);
    alert(`샘플 파일 다운로드: ${filename}`);
  };

  // 엑셀 업로드 처리
  const handleExcelUpload = async (file: File) => {
    try {
      // 실제 구현시 파일 파싱 및 데이터 처리
      console.log('Uploading file:', file.name);
      alert(`${file.name} 파일이 업로드되었습니다.\n실제 구현시 데이터가 추가됩니다.`);
      setShowUploadModal(false);
      setUploadFile(null);
    } catch (error) {
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">품목관리</h1>
            <p className="text-gray-600 mt-1">품목코드별 상세 정보를 사업부별로 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
            >
              <FiUpload className="w-4 h-4" />
              엑셀 업로드
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
              <FiPackage className="w-4 h-4" />
              품목 추가
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSortConfig(null);  // 탭 변경시 정렬 초기화
                  setShowFilterMenu({column: null});  // 필터 메뉴 닫기
                }}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
                {Object.keys(filters[activeTab] || {}).length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">필터 적용됨:</span>
                    {Object.entries(filters[activeTab] || {}).map(([key, values]) => (
                      <span 
                        key={key}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                      >
                        {key} ({values.length})
                        <button
                          onClick={() => clearFilter(key)}
                          className="hover:text-blue-900"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={clearAllFilters}
                      className="ml-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      모두 초기화
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="품목 검색..."
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>전체 브랜드</option>
                  <option>디즈니</option>
                  <option>포켓몬</option>
                  <option>산리오</option>
                  <option>마블</option>
                </select>
              </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto relative">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {activeTab === 'wholesale' ? (
                      <>
                        <TableHeader column="내역" align="left" />
                        <TableHeader column="브랜드" align="left" />
                        <TableHeader column="종류" align="left" />
                        <TableHeader column="캐릭터" align="left" />
                        <TableHeader column="품목코드" align="left" />
                        <TableHeader column="품목명" align="left" />
                        <TableHeader column="원가" align="right" />
                        <TableHeader column="대량판매가" align="right" />
                        <TableHeader column="도도매가" align="right" />
                        <TableHeader column="소비자가" align="right" />
                        <TableHeader column="포장" align="center" />
                        <TableHeader column="박스입수" align="right" />
                        <TableHeader column="OPP입수" align="right" />
                        <TableHeader column="현재고" align="right" />
                        <TableHeader column="재고일" align="center" isLastColumn={true} />
                      </>
                    ) : activeTab === 'popup' ? (
                      <>
                        <TableHeader column="내역" align="left" />
                        <TableHeader column="브랜드" align="left" />
                        <TableHeader column="종류" align="left" />
                        <TableHeader column="캐릭터" align="left" />
                        <TableHeader column="품목코드" align="left" />
                        <TableHeader column="품목명" align="left" />
                        <TableHeader column="바코드" align="left" />
                        <TableHeader column="A코드" align="left" />
                        <TableHeader column="N코드" align="left" />
                        <TableHeader column="원가" align="right" />
                        <TableHeader column="사입가" align="right" />
                        <TableHeader column="위탁가" align="right" />
                        <TableHeader column="할인가" align="right" />
                        <TableHeader column="소비자가" align="right" />
                        <TableHeader column="포장" align="center" />
                        <TableHeader column="KC" align="center" />
                        <TableHeader column="현재고" align="right" />
                        <TableHeader column="재고일" align="center" isLastColumn={true} />
                      </>
                    ) : activeTab === 'online' ? (
                      <>
                        <TableHeader column="내역" align="left" />
                        <TableHeader column="브랜드" align="left" />
                        <TableHeader column="종류" align="left" />
                        <TableHeader column="캐릭터" align="left" />
                        <TableHeader column="품목코드" align="left" />
                        <TableHeader column="품목명" align="left" />
                        <TableHeader column="원가" align="right" />
                        <TableHeader column="자사몰" align="right" />
                        <TableHeader column="카카오" align="right" />
                        <TableHeader column="기타채널" align="right" />
                        <TableHeader column="할인가" align="right" />
                        <TableHeader column="할인율" align="right" />
                        <TableHeader column="소비자가" align="right" />
                        <TableHeader column="포장" align="center" />
                        <TableHeader column="KC" align="center" />
                        <TableHeader column="현재고" align="right" />
                        <TableHeader column="재고일" align="center" isLastColumn={true} />
                      </>
                    ) : activeTab === 'export' ? (
                      <>
                        <TableHeader column="내역" align="left" />
                        <TableHeader column="브랜드" align="left" />
                        <TableHeader column="종류" align="left" />
                        <TableHeader column="캐릭터" align="left" />
                        <TableHeader column="품목코드" align="left" />
                        <TableHeader column="품목명" align="left" />
                        <TableHeader column="바코드" align="left" />
                        <TableHeader column="원가" align="right" />
                        <TableHeader column="수입가" align="right" />
                        <TableHeader column="수출가A" align="right" />
                        <TableHeader column="수출가B" align="right" />
                        <TableHeader column="소비자가" align="right" />
                        <TableHeader column="포장" align="center" />
                        <TableHeader column="KC" align="center" />
                        <TableHeader column="현재고" align="right" />
                        <TableHeader column="재고일" align="center" isLastColumn={true} />
                      </>
                    ) : activeTab === 'toy' ? (
                      <>
                        <TableHeader column="내역" align="left" />
                        <TableHeader column="종류" align="left" />
                        <TableHeader column="바이어" align="left" />
                        <TableHeader column="산업" align="left" />
                        <TableHeader column="품목코드" align="left" />
                        <TableHeader column="품목명" align="left" />
                        <TableHeader column="원가" align="right" />
                        <TableHeader column="수입가" align="right" />
                        <TableHeader column="도착가" align="right" />
                        <TableHeader column="샘플비" align="right" />
                        <TableHeader column="생산가" align="right" />
                        <TableHeader column="사이즈" align="center" />
                        <TableHeader column="행택" align="center" />
                        <TableHeader column="라벨" align="center" />
                        <TableHeader column="포장" align="center" />
                        <TableHeader column="박스입수" align="right" />
                        <TableHeader column="KC" align="center" isLastColumn={true} />
                      </>
                    ) : (
                      <>
                        <TableHeader column="내역" align="left" />
                        <TableHeader column="브랜드" align="left" />
                        <TableHeader column="종류" align="left" />
                        <TableHeader column="캐릭터" align="left" />
                        <TableHeader column="품목코드" align="left" />
                        <TableHeader column="품목명" align="left" />
                        <TableHeader column="영문명" align="left" />
                        <TableHeader column="바코드" align="left" />
                        <TableHeader column="KC" align="center" isLastColumn={true} />
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getCurrentData().map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-xs">
                        <button
                          onClick={() => handleItemClick(item)}
                          className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 transition-all cursor-pointer ${
                            item.내역 === '신규' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                            item.내역 === '재입고' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                            item.내역 === '진행중' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                            item.내역 === '수출진행' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' :
                            item.내역 === '수출완료' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                            item.내역 === '재고' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' :
                            item.내역 === '완료' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                            item.내역 === '품절임박' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                            'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}>
                          {item.내역}
                        </button>
                      </td>
                      {activeTab !== 'toy' && activeTab !== 'material' && <td className="px-4 py-2 text-xs text-gray-900">{item.브랜드}</td>}
                      {activeTab === 'wholesale' ? (
                        <>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.종류}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.캐릭터}</td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{item.품목코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.품목명}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{formatPrice(item.원가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.대량판매가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.도도매가)}</td>
                          <td className="px-4 py-2 text-xs font-medium text-blue-600 text-right">{formatPrice(item.소비자가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.포장}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{item.박스입수}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{item.OPP입수}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">
                            <span className={`font-medium ${item.현재고 < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                              {item.현재고}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.재고일}</td>
                        </>
                      ) : activeTab === 'popup' ? (
                        <>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.종류}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.캐릭터}</td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{item.품목코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.품목명}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.바코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.A코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.N코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{formatPrice(item.원가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.사입가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.위탁가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.할인가)}</td>
                          <td className="px-4 py-2 text-xs font-medium text-blue-600 text-right">{formatPrice(item.소비자가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.포장}</td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.KC === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.KC}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">
                            <span className={`font-medium ${item.현재고 < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                              {item.현재고}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.재고일}</td>
                        </>
                      ) : activeTab === 'online' ? (
                        <>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.종류}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.캐릭터}</td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{item.품목코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.품목명}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{formatPrice(item.원가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.자사몰)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.카카오)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.기타채널)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.할인가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{item.할인율}</td>
                          <td className="px-4 py-2 text-xs font-medium text-blue-600 text-right">{formatPrice(item.소비자가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.포장}</td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.KC === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.KC}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">
                            <span className={`font-medium ${item.현재고 < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                              {item.현재고}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.재고일}</td>
                        </>
                      ) : activeTab === 'export' ? (
                        <>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.종류}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.캐릭터}</td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{item.품목코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.품목명}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.바코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{formatPrice(item.원가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{item.수입가}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{item.수출가A}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{item.수출가B}</td>
                          <td className="px-4 py-2 text-xs font-medium text-blue-600 text-right">{formatPrice(item.소비자가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.포장}</td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.KC === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.KC}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">
                            <span className={`font-medium ${item.현재고 < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                              {item.현재고}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.재고일}</td>
                        </>
                      ) : activeTab === 'toy' ? (
                        <>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.종류}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.바이어}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.산업}</td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{item.품목코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.품목명}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{formatPrice(item.원가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right font-medium">{item.수입가}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.도착가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.샘플비)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{formatPrice(item.생산가)}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.사이즈}</td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.행택 === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.행택}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.라벨 === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.라벨}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-center">{item.포장}</td>
                          <td className="px-4 py-2 text-xs text-gray-900 text-right">{item.박스입수}</td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.KC === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.KC}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.종류}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.캐릭터}</td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{item.품목코드}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.품목명}</td>
                          <td className="px-4 py-2 text-xs text-gray-500">{item.영문명}</td>
                          <td className="px-4 py-2 text-xs text-gray-900">{item.바코드}</td>
                          <td className="px-4 py-2 text-xs text-center">
                            <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${
                              item.KC === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.KC}
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-700">
                총 <span className="font-medium">{getCurrentData().length}</span>개 품목
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">이전</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">다음</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 엑셀 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">엑셀 파일 업로드</h3>
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setUploadFile(null);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">닫기</span>
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* 현재 탭 표시 */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>{tabs.find(tab => tab.id === activeTab)?.name}</strong> 탭에 데이터를 업로드합니다.
                      </p>
                    </div>

                    {/* 샘플 파일 다운로드 */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center">
                        <FiDownload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          엑셀 업로드 전 샘플 파일을 다운로드하여 형식을 확인하세요.
                        </p>
                        <button
                          onClick={() => {
                            // 샘플 엑셀 다운로드 로직
                            const sampleData = getSampleExcelData();
                            downloadExcel(sampleData, `${activeTab}_sample.xlsx`);
                          }}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          샘플 파일 다운로드
                        </button>
                      </div>
                    </div>

                    {/* 파일 업로드 영역 */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              클릭하여 파일 선택 또는 드래그 앤 드롭
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".xlsx,.xls"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setUploadFile(file);
                                }
                              }}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">.xlsx, .xls 파일만 가능</p>
                        </div>
                        
                        {uploadFile && (
                          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">
                              선택된 파일: <span className="font-medium">{uploadFile.name}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              크기: {(uploadFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 주의사항 */}
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>주의사항:</strong>
                      </p>
                      <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside space-y-1">
                        <li>엑셀 파일의 컬럼 순서는 샘플 파일과 동일해야 합니다.</li>
                        <li>품목코드는 중복될 수 없습니다.</li>
                        <li>필수 항목이 비어있으면 업로드가 실패합니다.</li>
                        <li>한 번에 최대 1,000개까지 업로드 가능합니다.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (uploadFile) {
                        handleExcelUpload(uploadFile);
                      }
                    }}
                    disabled={!uploadFile}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                      uploadFile 
                        ? 'bg-green-600 hover:bg-green-500' 
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    업로드
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFile(null);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 품목 수정/삭제 모달 */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">품목 정보 수정</h3>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">닫기</span>
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* 기본 정보 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-900 border-b pb-1">기본 정보</h4>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          내역 <span className="text-red-500">*</span>
                        </label>
                        <select 
                          defaultValue={selectedItem.내역}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="신규">신규</option>
                          <option value="재입고">재입고</option>
                          <option value="진행중">진행중</option>
                          <option value="완료">완료</option>
                          <option value="단종예정">단종예정</option>
                          <option value="수출진행">수출진행</option>
                          <option value="수출완료">수출완료</option>
                          <option value="재고">재고</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          브랜드 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedItem.브랜드}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          품목종류 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedItem.품목종류}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          캐릭터
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedItem.캐릭터}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          품목코드 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedItem.품목코드}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          품목명 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedItem.품목명}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* 가격 정보 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-900 border-b pb-1">가격 정보</h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">수입가</label>
                          <input
                            type="number"
                            defaultValue={selectedItem.수입가}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">최종원가</label>
                          <input
                            type="number"
                            defaultValue={selectedItem.최종원가}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">BOM 여부</label>
                        <select
                          defaultValue={selectedItem.BOM}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">도도매가</label>
                          <input
                            type="number"
                            defaultValue={selectedItem.도도매가}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">도매가</label>
                          <input
                            type="number"
                            defaultValue={selectedItem.도매가}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">온라인가</label>
                          <input
                            type="number"
                            defaultValue={selectedItem.온라인가}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">오프라인가</label>
                          <input
                            type="number"
                            defaultValue={selectedItem.오프라인가}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">소비자가</label>
                        <input
                          type="number"
                          defaultValue={selectedItem.소비자가}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}