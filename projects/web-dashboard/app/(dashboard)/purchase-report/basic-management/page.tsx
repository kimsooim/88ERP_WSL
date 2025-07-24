'use client';

import { useState, useEffect } from 'react';
import { FiTag, FiGrid, FiSmile, FiPackage, FiUsers, FiHome, FiBriefcase, FiRefreshCw, FiCheck, FiAlertCircle, FiPlus, FiEdit2, FiTrash2, FiX, FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface TabItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const tabs: TabItem[] = [
  {
    id: 'brands',
    name: '브랜드',
    icon: <FiTag className="w-5 h-5" />,
    description: '브랜드 정보를 관리합니다'
  },
  {
    id: 'types',
    name: '종류',
    icon: <FiGrid className="w-5 h-5" />,
    description: '품목 종류를 관리합니다'
  },
  {
    id: 'characters',
    name: '캐릭터',
    icon: <FiSmile className="w-5 h-5" />,
    description: '캐릭터 정보를 관리합니다'
  },
  {
    id: 'packages',
    name: '포장',
    icon: <FiPackage className="w-5 h-5" />,
    description: '포장 방식을 관리합니다'
  },
  {
    id: 'partners',
    name: '거래처',
    icon: <FiUsers className="w-5 h-5" />,
    description: '고객사 및 공급처 정보를 관리합니다'
  },
  {
    id: 'warehouses',
    name: '창고',
    icon: <FiHome className="w-5 h-5" />,
    description: '재고 보관 창고 정보를 관리합니다'
  },
  {
    id: 'projects',
    name: '프로젝트',
    icon: <FiBriefcase className="w-5 h-5" />,
    description: '진행 중인 프로젝트를 관리합니다'
  }
];

export default function BasicManagementPage() {
  const [activeTab, setActiveTab] = useState('brands');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<string>('2025-01-24 10:30:15');

  const handleSync = () => {
    setSyncStatus('syncing');
    // 실제 동기화 로직은 추후 구현
    setTimeout(() => {
      setSyncStatus('success');
      setLastSyncTime(new Date().toLocaleString('ko-KR'));
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'brands':
        return <BrandsTab />;
      case 'types':
        return <TypesTab />;
      case 'characters':
        return <CharactersTab />;
      case 'packages':
        return <PackagesTab />;
      case 'partners':
        return <PartnersTab />;
      case 'warehouses':
        return <WarehousesTab />;
      case 'projects':
        return <ProjectsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">기초등록</h1>
            <p className="text-gray-600 mt-1">이카운트 데이터를 수퍼베이스와 동기화하여 관리합니다</p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              syncStatus === 'syncing'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : syncStatus === 'success'
                ? 'bg-green-100 text-green-700'
                : syncStatus === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {syncStatus === 'syncing' ? (
              <>
                <FiRefreshCw className="w-4 h-4 animate-spin" />
                동기화 중...
              </>
            ) : syncStatus === 'success' ? (
              <>
                <FiCheck className="w-4 h-4" />
                동기화 완료
              </>
            ) : syncStatus === 'error' ? (
              <>
                <FiAlertCircle className="w-4 h-4" />
                동기화 실패
              </>
            ) : (
              <>
                <FiRefreshCw className="w-4 h-4" />
                데이터 동기화
              </>
            )}
          </button>
        </div>
        <div className="text-sm text-gray-500">
          마지막 동기화: {lastSyncTime}
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}


// 브랜드 탭
function BrandsTab() {
  const [brands, setBrands] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    code: '', 
    nameKo: '', 
    nameEn: '', 
    descKo: '', 
    descEn: '' 
  });
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedBrands = localStorage.getItem('basic-management-brands');
    if (savedBrands) {
      setBrands(JSON.parse(savedBrands));
    } else {
      // 초기 데이터
      const initialBrands = [
        { id: 1, code: 'BR001', nameKo: '코튼푸드', nameEn: 'Cotton Food', descKo: '푸드 관련 브랜드', descEn: 'Food related brand' },
        { id: 2, code: 'BR002', nameKo: '쭔바', nameEn: 'Choba', descKo: '캐릭터 브랜드', descEn: 'Character brand' },
        { id: 3, code: 'BR003', nameKo: '코튼애니', nameEn: 'Cotton Ani', descKo: '애니메이션 관련 브랜드', descEn: 'Animation related brand' },
        { id: 4, code: 'BR004', nameKo: '에스티베어', nameEn: 'ST Bear', descKo: '베어 관련 브랜드', descEn: 'Bear related brand' },
      ];
      setBrands(initialBrands);
      localStorage.setItem('basic-management-brands', JSON.stringify(initialBrands));
    }
  }, []);

  // brands 변경 시 localStorage에 저장
  useEffect(() => {
    if (brands.length > 0) {
      localStorage.setItem('basic-management-brands', JSON.stringify(brands));
    }
  }, [brands]);

  const handleAdd = () => {
    setEditingBrand(null);
    setFormData({ code: '', nameKo: '', nameEn: '', descKo: '', descEn: '' });
    setShowModal(true);
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setFormData({ 
      code: brand.code || '', 
      nameKo: brand.nameKo || '', 
      nameEn: brand.nameEn || '', 
      descKo: brand.descKo || '', 
      descEn: brand.descEn || '' 
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setBrands(brands.filter(b => b.id !== id));
    }
  };

  const handleSave = () => {
    if (editingBrand) {
      setBrands(brands.map(b => b.id === editingBrand.id ? { ...b, ...formData } : b));
    } else {
      const newCode = `BR${String(brands.length + 1).padStart(3, '0')}`;
      setBrands([...brands, { id: Date.now(), code: formData.code || newCode, ...formData }]);
    }
    setShowModal(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBrands = [...brands].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">브랜드 관리</h3>
          <p className="text-sm text-gray-600 mt-1">브랜드 정보를 확인하고 관리합니다</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          브랜드 추가
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('code')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    브랜드코드
                    {sortField === 'code' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    브랜드명(한글)
                    {sortField === 'nameKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    브랜드명(영문)
                    {sortField === 'nameEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('descKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    브랜드설명(한글)
                    {sortField === 'descKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('descEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    브랜드설명(영문)
                    {sortField === 'descEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="truncate" title={brand.code}>{brand.code}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="truncate" title={brand.nameKo}>{brand.nameKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="truncate" title={brand.nameEn}>{brand.nameEn}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="break-words">{brand.descKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="break-words">{brand.descEn}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingBrand ? '브랜드 수정' : '브랜드 추가'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  브랜드코드
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="BR001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  브랜드명(한글)
                </label>
                <input
                  type="text"
                  value={formData.nameKo}
                  onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  브랜드명(영문)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  브랜드설명(한글)
                </label>
                <textarea
                  value={formData.descKo}
                  onChange={(e) => setFormData({ ...formData, descKo: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  브랜드설명(영문)
                </label>
                <textarea
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 종류 탭
function TypesTab() {
  const [types, setTypes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    code: '', 
    nameKo: '', 
    nameEn: '', 
    descKo: '', 
    descEn: '' 
  });
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedTypes = localStorage.getItem('basic-management-types');
    if (savedTypes) {
      setTypes(JSON.parse(savedTypes));
    } else {
      // 초기 데이터
      const initialTypes = [
        { id: 1, code: 'TP001', nameKo: '볼체인', nameEn: 'Ball Chain', descKo: '동글한 볼 키링', descEn: 'Round ball keyring' },
        { id: 2, code: 'TP002', nameKo: '금장키링', nameEn: 'Gold Keyring', descKo: '금색 장식 키링', descEn: 'Gold ornament keyring' },
        { id: 3, code: 'TP003', nameKo: '가방고리', nameEn: 'Bag Hook', descKo: '가방에 걸 수 있는 고리', descEn: 'Hook for bags' },
        { id: 4, code: 'TP004', nameKo: '낮잠쿠션', nameEn: 'Nap Cushion', descKo: '낮잠용 작은 쿠션', descEn: 'Small cushion for napping' },
        { id: 5, code: 'TP005', nameKo: '인형쿠션', nameEn: 'Doll Cushion', descKo: '인형 형태의 쿠션', descEn: 'Doll shaped cushion' },
        { id: 6, code: 'TP006', nameKo: '목쿠션', nameEn: 'Neck Cushion', descKo: '목 베개 쿠션', descEn: 'Neck pillow cushion' },
        { id: 7, code: 'TP007', nameKo: '핸드워머', nameEn: 'Hand Warmer', descKo: '손 난로', descEn: 'Hand heating device' },
        { id: 8, code: 'TP008', nameKo: '방석쿠션', nameEn: 'Floor Cushion', descKo: '바닥에 까는 쿠션', descEn: 'Cushion for floor sitting' },
        { id: 9, code: 'TP009', nameKo: '바디필로우', nameEn: 'Body Pillow', descKo: '긴 몸통 베개', descEn: 'Long body pillow' },
        { id: 10, code: 'TP010', nameKo: '왕쿠션', nameEn: 'King Cushion', descKo: '특대 사이즈 쿠션', descEn: 'Extra large cushion' },
      ];
      setTypes(initialTypes);
      localStorage.setItem('basic-management-types', JSON.stringify(initialTypes));
    }
  }, []);

  // types 변경 시 localStorage에 저장
  useEffect(() => {
    if (types.length > 0) {
      localStorage.setItem('basic-management-types', JSON.stringify(types));
    }
  }, [types]);

  const handleAdd = () => {
    setEditingType(null);
    setFormData({ code: '', nameKo: '', nameEn: '', descKo: '', descEn: '' });
    setShowModal(true);
  };

  const handleEdit = (type: any) => {
    setEditingType(type);
    setFormData({ 
      code: type.code || '', 
      nameKo: type.nameKo || '', 
      nameEn: type.nameEn || '', 
      descKo: type.descKo || '', 
      descEn: type.descEn || '' 
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setTypes(types.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (editingType) {
      setTypes(types.map(t => t.id === editingType.id ? { ...t, ...formData } : t));
    } else {
      const newCode = `TP${String(types.length + 1).padStart(3, '0')}`;
      setTypes([...types, { id: Date.now(), code: formData.code || newCode, ...formData }]);
    }
    setShowModal(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTypes = [...types].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">종류 관리</h3>
          <p className="text-sm text-gray-600 mt-1">품목 종류를 확인하고 관리합니다</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          종류 추가
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('code')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    종류코드
                    {sortField === 'code' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    종류명(한글)
                    {sortField === 'nameKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    종류명(영문)
                    {sortField === 'nameEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('descKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    종류설명(한글)
                    {sortField === 'descKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('descEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    종류설명(영문)
                    {sortField === 'descEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="truncate" title={type.code}>{type.code}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="truncate" title={type.nameKo}>{type.nameKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="truncate" title={type.nameEn}>{type.nameEn}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="break-words">{type.descKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="break-words">{type.descEn}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(type)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(type.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingType ? '종류 수정' : '종류 추가'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종류코드
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="TP001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종류명(한글)
                </label>
                <input
                  type="text"
                  value={formData.nameKo}
                  onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종류명(영문)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종류설명(한글)
                </label>
                <textarea
                  value={formData.descKo}
                  onChange={(e) => setFormData({ ...formData, descKo: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종류설명(영문)
                </label>
                <textarea
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 캐릭터 탭
function CharactersTab() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    code: '', 
    nameKo: '', 
    nameEn: '', 
    descKo: '', 
    descEn: '' 
  });
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedCharacters = localStorage.getItem('basic-management-characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    } else {
      // 초기 데이터
      const initialCharacters = [
        { id: 1, code: 'CH001', nameKo: '계란', nameEn: 'Egg', descKo: '귀여운 계란 캐릭터', descEn: 'Cute egg character' },
        { id: 2, code: 'CH002', nameKo: '고구마', nameEn: 'Sweet Potato', descKo: '달콤한 고구마 캐릭터', descEn: 'Sweet potato character' },
        { id: 3, code: 'CH003', nameKo: '딸기', nameEn: 'Strawberry', descKo: '상큼한 딸기 캐릭터', descEn: 'Fresh strawberry character' },
      ];
      setCharacters(initialCharacters);
      localStorage.setItem('basic-management-characters', JSON.stringify(initialCharacters));
    }
  }, []);

  // characters 변경 시 localStorage에 저장
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem('basic-management-characters', JSON.stringify(characters));
    }
  }, [characters]);

  const handleAdd = () => {
    setEditingCharacter(null);
    setFormData({ code: '', nameKo: '', nameEn: '', descKo: '', descEn: '' });
    setShowModal(true);
  };

  const handleEdit = (character: any) => {
    setEditingCharacter(character);
    setFormData({ 
      code: character.code || '', 
      nameKo: character.nameKo || '', 
      nameEn: character.nameEn || '', 
      descKo: character.descKo || '', 
      descEn: character.descEn || '' 
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setCharacters(characters.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (editingCharacter) {
      setCharacters(characters.map(c => c.id === editingCharacter.id ? { ...c, ...formData } : c));
    } else {
      const newCode = `CH${String(characters.length + 1).padStart(3, '0')}`;
      setCharacters([...characters, { id: Date.now(), code: formData.code || newCode, ...formData }]);
    }
    setShowModal(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">캐릭터 관리</h3>
          <p className="text-sm text-gray-600 mt-1">캐릭터 정보를 확인하고 관리합니다 (옵션선택형)</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          캐릭터 추가
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('code')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    캐릭터코드
                    {sortField === 'code' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    캐릭터명(한글)
                    {sortField === 'nameKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    캐릭터명(영문)
                    {sortField === 'nameEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('descKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    캐릭터설명(한글)
                    {sortField === 'descKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('descEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    캐릭터설명(영문)
                    {sortField === 'descEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedCharacters.map((character) => (
                <tr key={character.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="truncate" title={character.code}>{character.code}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="truncate" title={character.nameKo}>{character.nameKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="truncate" title={character.nameEn}>{character.nameEn}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="break-words">{character.descKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="break-words">{character.descEn}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(character)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(character.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingCharacter ? '캐릭터 수정' : '캐릭터 추가'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  캐릭터코드
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="CH001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  캐릭터명(한글)
                </label>
                <input
                  type="text"
                  value={formData.nameKo}
                  onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  캐릭터명(영문)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  캐릭터설명(한글)
                </label>
                <textarea
                  value={formData.descKo}
                  onChange={(e) => setFormData({ ...formData, descKo: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  캐릭터설명(영문)
                </label>
                <textarea
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 포장 탭
function PackagesTab() {
  const [packages, setPackages] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    code: '', 
    nameKo: '', 
    nameEn: '', 
    isActive: true 
  });
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedPackages = localStorage.getItem('basic-management-packages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      // 초기 데이터
      const initialPackages = [
        { id: 1, code: 'PK001', nameKo: 'OPP', nameEn: 'OPP', isActive: true },
        { id: 2, code: 'PK002', nameKo: 'BULK', nameEn: 'BULK', isActive: true },
        { id: 3, code: 'PK003', nameKo: 'TRAY1', nameEn: 'TRAY1', isActive: true },
        { id: 4, code: 'PK004', nameKo: 'TRAY2', nameEn: 'TRAY2', isActive: true },
        { id: 5, code: 'PK005', nameKo: 'PE', nameEn: 'PE', isActive: true },
        { id: 6, code: 'PK006', nameKo: 'HEAD', nameEn: 'HEAD', isActive: true },
      ];
      setPackages(initialPackages);
      localStorage.setItem('basic-management-packages', JSON.stringify(initialPackages));
    }
  }, []);

  // packages 변경 시 localStorage에 저장
  useEffect(() => {
    if (packages.length > 0) {
      localStorage.setItem('basic-management-packages', JSON.stringify(packages));
    }
  }, [packages]);

  const handleAdd = () => {
    setEditingPackage(null);
    setFormData({ code: '', nameKo: '', nameEn: '', isActive: true });
    setShowModal(true);
  };

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({ 
      code: pkg.code || '', 
      nameKo: pkg.nameKo || '', 
      nameEn: pkg.nameEn || '', 
      isActive: pkg.isActive 
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage.id ? { ...p, ...formData } : p));
    } else {
      const newCode = `PK${String(packages.length + 1).padStart(3, '0')}`;
      setPackages([...packages, { id: Date.now(), code: formData.code || newCode, ...formData }]);
    }
    setShowModal(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPackages = [...packages].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">포장 관리</h3>
          <p className="text-sm text-gray-600 mt-1">포장 방식을 확인하고 관리합니다 (옵션선택형)</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          포장 추가
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('code')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    포장코드
                    {sortField === 'code' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameKo')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    포장명(한글)
                    {sortField === 'nameKo' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nameEn')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    포장명(영문)
                    {sortField === 'nameEn' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('isActive')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    상태
                    {sortField === 'isActive' && (
                      sortDirection === 'asc' ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="truncate" title={pkg.code}>{pkg.code}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="truncate" title={pkg.nameKo}>{pkg.nameKo}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="truncate" title={pkg.nameEn}>{pkg.nameEn}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      pkg.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.isActive ? '사용중' : '사용안함'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingPackage ? '포장 수정' : '포장 추가'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  포장코드
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PK001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  포장명(한글)
                </label>
                <input
                  type="text"
                  value={formData.nameKo}
                  onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  포장명(영문)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">사용 가능</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 거래처 탭
function PartnersTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">거래처 관리</h3>
          <p className="text-sm text-gray-600 mt-1">고객사 및 공급처 정보를 확인하고 관리합니다</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">거래처 데이터를 불러오는 중...</p>
        <p className="text-sm text-gray-500 mt-2">이카운트 → 수퍼베이스 동기화 대기 중</p>
      </div>
    </div>
  );
}

// 창고등록 탭
function WarehousesTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">창고 관리</h3>
          <p className="text-sm text-gray-600 mt-1">재고 보관 창고 정보를 확인하고 관리합니다</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <FiHome className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">창고 데이터를 불러오는 중...</p>
        <p className="text-sm text-gray-500 mt-2">이카운트 → 수퍼베이스 동기화 대기 중</p>
      </div>
    </div>
  );
}

// 프로젝트등록 탭
function ProjectsTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">프로젝트 관리</h3>
          <p className="text-sm text-gray-600 mt-1">진행 중인 프로젝트 정보를 확인하고 관리합니다</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">프로젝트 데이터를 불러오는 중...</p>
        <p className="text-sm text-gray-500 mt-2">이카운트 → 수퍼베이스 동기화 대기 중</p>
      </div>
    </div>
  );
}