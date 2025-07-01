'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useLog } from '../../../contexts/LogContext';

export default function MyAccountPage() {
  const { user, updateUserProfile } = useAuth();
  const { addChangeLog } = useLog();
  
  // 개인정보 편집 폼
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    address: '',
    profileImage: '',
    joinDate: '',
    birthDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  

  // 근무 기간 계산 함수
  const calculateWorkPeriod = (joinDate: string) => {
    const join = new Date(joinDate);
    const today = new Date();
    
    let years = today.getFullYear() - join.getFullYear();
    let months = today.getMonth() - join.getMonth();
    let days = today.getDate() - join.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return { years, months, days };
  };

  // 만 나이 계산 함수
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // 사용자 정보로 폼 초기화
  useEffect(() => {
    if (user) {
      // localStorage에서 추가 정보 불러오기
      const savedAdditionalInfo = localStorage.getItem('userAdditionalInfo');
      let additionalInfo = {
        phone: '',
        address: '',
        birthDate: '1990-01-01',
        joinDate: '2024-01-01'
      };
      
      if (savedAdditionalInfo) {
        try {
          additionalInfo = JSON.parse(savedAdditionalInfo);
        } catch (e) {
          console.error('추가 정보 로드 실패:', e);
        }
      }
      
      const formData = {
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        phone: additionalInfo.phone || '',
        address: additionalInfo.address || '',
        profileImage: user.profileImage || '',
        joinDate: additionalInfo.joinDate || user.createdAt || '2024-01-01',
        birthDate: additionalInfo.birthDate || '1990-01-01'
      };
      
      console.log('Setting profileForm with joinDate:', formData.joinDate);
      console.log('user.createdAt:', user.createdAt);
      console.log('additionalInfo.joinDate:', additionalInfo.joinDate);
      setProfileForm(formData);
    }
  }, [user]);

  // 프로필 이미지를 Base64로 변환하는 함수
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }
      const base64 = await convertToBase64(file);
      setProfileForm(prev => ({ ...prev, profileImage: base64 }));
      // 즉시 프로필 업데이트
      if (user) {
        const updatedProfile = { 
          ...user,
          ...profileForm, 
          profileImage: base64 
        };
        await updateUserProfile(updatedProfile);
      }
    }
  };

  // 개인정보 저장 핸들러
  const handleProfileSave = async () => {
    if (!user) return;

    try {
      // 추가 정보를 localStorage에 별도 저장
      const additionalInfo = {
        phone: profileForm.phone,
        address: profileForm.address,
        birthDate: profileForm.birthDate,
        joinDate: profileForm.joinDate
      };
      localStorage.setItem('userAdditionalInfo', JSON.stringify(additionalInfo));
      
      const { phone, address, birthDate, joinDate, ...userProfile } = profileForm;
      const success = await updateUserProfile(userProfile);
      
      if (success) {
        setIsEditing(false);
        setProfileUpdateSuccess(true);
        setTimeout(() => setProfileUpdateSuccess(false), 3000);
        
        addChangeLog({
          user: user.name,
          type: 'settings',
          category: '계정설정',
          target: '개인정보',
          field: '프로필 업데이트',
          oldValue: '이전 정보',
          newValue: '새 정보'
        });
      } else {
        alert('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 편집 취소
  const handleEditCancel = () => {
    if (user) {
      // localStorage에서 추가 정보 불러오기
      const savedAdditionalInfo = localStorage.getItem('userAdditionalInfo');
      let additionalInfo = {
        phone: '',
        address: '',
        birthDate: '1990-01-01',
        joinDate: '2024-01-01'
      };
      
      if (savedAdditionalInfo) {
        try {
          additionalInfo = JSON.parse(savedAdditionalInfo);
        } catch (e) {
          console.error('추가 정보 로드 실패:', e);
        }
      }
      
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        phone: additionalInfo.phone || '',
        address: additionalInfo.address || '',
        profileImage: user.profileImage || '',
        joinDate: additionalInfo.joinDate || user.createdAt || '2024-01-01',
        birthDate: additionalInfo.birthDate || '1990-01-01'
      });
    }
    setIsEditing(false);
  };


  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">계정 설정</h1>
        <p className="text-gray-600 mt-1">프로필 정보와 보안 설정을 관리하세요</p>
      </div>

      {/* 프로필 업데이트 성공 메시지 */}
      {profileUpdateSuccess && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">프로필이 성공적으로 업데이트되었습니다.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽: 프로필 카드 */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                {profileForm.profileImage || user.profileImage ? (
                  <img 
                    src={profileForm.profileImage || user.profileImage} 
                    alt={user.name}
                    className="h-24 w-24 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                    <span className="text-gray-500 font-medium text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                {/* 프로필 이미지 변경 버튼 */}
                <div className="mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-image-upload"
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    사진 변경
                  </label>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2">
                <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {user.role === 'admin' ? '관리자' : user.role === 'manager' ? '매니저' : '일반사용자'}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">부서</span>
                    <span className="text-gray-900">{user.department}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">입사일</span>
                    <span className="text-gray-900">{profileForm.joinDate || user.createdAt || '2024-01-01'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">근무 기간</span>
                    <span className="text-gray-900">
                      {(() => {
                        const joinDate = profileForm.joinDate || user.createdAt || '2024-01-01';
                        const period = calculateWorkPeriod(joinDate);
                        return `${period.years}년 ${period.months}개월 ${period.days}일`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 정보 수정 폼 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 개인정보 수정 */}
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h3 className="card-title">개인정보</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  정보 수정
                </button>
              )}
            </div>
            <div className="card-body">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                      <input
                        type="text"
                        value={profileForm.department}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="010-0000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
                    <input
                      type="date"
                      value={profileForm.birthDate}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, birthDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
                    <input
                      type="date"
                      value={profileForm.joinDate}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, joinDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                    <textarea
                      value={profileForm.address}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                      placeholder="주소를 입력하세요"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={handleEditCancel}
                      className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleProfileSave}
                      className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">이름</label>
                    <p className="text-sm text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">이메일</label>
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">부서</label>
                    <p className="text-sm text-gray-900">{user.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">전화번호</label>
                    <p className="text-sm text-gray-900">{profileForm.phone || '미등록'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">생년월일</label>
                    <p className="text-sm text-gray-900">
                      {profileForm.birthDate} (만 {calculateAge(profileForm.birthDate)}세)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">입사일</label>
                    <p className="text-sm text-gray-900">{profileForm.joinDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">근무 기간</label>
                    <p className="text-sm text-gray-900">
                      {profileForm.joinDate ? (() => {
                        const period = calculateWorkPeriod(profileForm.joinDate);
                        return `${period.years}년 ${period.months}개월 ${period.days}일`;
                      })() : '계산 중...'}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-1">주소</label>
                    <p className="text-sm text-gray-900">{profileForm.address || '미등록'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* 보안 설정 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">보안 설정</h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">2단계 인증</h4>
                  <p className="text-xs text-gray-500">계정 보안을 위한 추가 인증</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-600 bg-gray-100" disabled>
                  곧 출시
                </button>
              </div>
              <div className="flex items-center justify-between py-2 border-t pt-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">로그인 알림</h4>
                  <p className="text-xs text-gray-500">새 기기 로그인 시 이메일 알림</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-600 bg-gray-100" disabled>
                  곧 출시
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}