'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  profileImage?: string;
  createdAt?: string;
}

interface Permission {
  path: string;
  roles: ('admin' | 'manager' | 'user')[];
  name: string;
  category: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  updateUserProfile: (profileData: Partial<User>) => Promise<boolean>;
  hasPermission: (path: string) => boolean;
  isAuthenticated: boolean;
}

const permissions: Permission[] = [
  // 대시보드
  { path: '/', roles: ['admin', 'manager', 'user'], name: '대시보드', category: '일반' },
  
  // 오프라인 사업
  { path: '/offline', roles: ['admin', 'manager', 'user'], name: '오프라인 사업', category: '사업관리' },
  { path: '/offline/channels', roles: ['admin', 'manager', 'user'], name: '거래처 관리', category: '사업관리' },
  { path: '/offline/automation', roles: ['admin', 'manager'], name: '오프라인 자동화', category: '사업관리' },
  
  // 온라인 사업
  { path: '/online', roles: ['admin', 'manager', 'user'], name: '온라인 사업', category: '사업관리' },
  { path: '/online/ads', roles: ['admin', 'manager'], name: '광고 관리', category: '사업관리' },
  { path: '/online/automation', roles: ['admin', 'manager'], name: '온라인 자동화', category: '사업관리' },
  
  // 제품 관리
  { path: '/products', roles: ['admin', 'manager', 'user'], name: '제품 관리', category: '제품' },
  { path: '/products/inventory', roles: ['admin', 'manager'], name: '재고 관리', category: '제품' },
  
  // 캐릭터 관리
  { path: '/characters', roles: ['admin', 'manager', 'user'], name: '캐릭터 관리', category: '콘텐츠' },
  { path: '/characters/library', roles: ['admin', 'manager', 'user'], name: '캐릭터 라이브러리', category: '콘텐츠' },
  
  // 관리자
  { path: '/admin', roles: ['admin'], name: '관리자', category: '시스템' },
  { path: '/admin/users', roles: ['admin'], name: '사용자 관리', category: '시스템' },
  { path: '/admin/permissions', roles: ['admin'], name: '권한 관리', category: '시스템' },
  { path: '/admin/logs', roles: ['admin', 'manager'], name: '로그 관리', category: '시스템' },
  { path: '/admin/system', roles: ['admin'], name: '시스템 설정', category: '시스템' },
  
  // 내 정보
  { path: '/mypage', roles: ['admin', 'manager', 'user'], name: '내 정보', category: '개인' },
  { path: '/mypage/account', roles: ['admin', 'manager', 'user'], name: '계정 설정', category: '개인' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// 비밀번호 저장을 위한 인터페이스
interface StoredUser extends User {
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // 기본 관리자 계정 (항상 로그인된 상태)
  const defaultAdmin: User = {
    id: '1',
    name: 'Ann',
    email: 'ann.88toy@gmail.com',
    role: 'admin',
    department: '경영지원',
    createdAt: '2024-01-01'
  };
  
  const [user, setUser] = useState<User | null>(defaultAdmin);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // 컴포넌트 마운트 시 기본 사용자 설정
  useEffect(() => {
    // localStorage에서 저장된 사용자 정보 확인
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch {
        setUser(defaultAdmin);
        localStorage.setItem('currentUser', JSON.stringify(defaultAdmin));
      }
    } else {
      setUser(defaultAdmin);
      localStorage.setItem('currentUser', JSON.stringify(defaultAdmin));
    }
    setIsAuthenticated(true);
  }, []);

  // 로그인 (더 이상 사용하지 않지만 인터페이스 호환성을 위해 유지)
  const login = async (email: string, password: string): Promise<boolean> => {
    // 항상 성공 반환
    return true;
  };

  // 로그아웃 (더 이상 사용하지 않지만 인터페이스 호환성을 위해 유지)
  const logout = () => {
    // 로그아웃해도 기본 사용자 유지
    setUser(defaultAdmin);
    setIsAuthenticated(true);
  };

  // 비밀번호 변경 (더 이상 사용하지 않지만 인터페이스 호환성을 위해 유지)
  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    // 항상 성공 반환
    return true;
  };

  // 프로필 업데이트
  const updateUserProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      // 현재 사용자 정보 업데이트
      const updatedCurrentUser = {
        ...user,
        name: profileData.name || user.name,
        email: profileData.email || user.email,
        department: profileData.department || user.department,
        profileImage: profileData.profileImage || user.profileImage
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
      setUser(updatedCurrentUser);
      
      return true;
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      return false;
    }
  };

  // 권한 확인 (항상 true 반환)
  const hasPermission = (path: string): boolean => {
    // 모든 권한 허용
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      changePassword,
      updateUserProfile,
      hasPermission,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { permissions };