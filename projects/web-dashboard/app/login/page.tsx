'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // 로그인 페이지 접근 시 홈으로 리다이렉트
  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-600">홈으로 리다이렉트 중...</p>
      </div>
    </div>
  );
}