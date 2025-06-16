// 88OEM Utility Functions

/**
 * 날짜 포맷팅 함수
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 짧은 날짜 포맷팅 함수
 */
export function formatShortDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * 통화 포맷팅 함수
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

/**
 * 숫자 포맷팅 함수 (천단위 구분)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 백분율 계산 함수
 */
export function calculatePercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * 상태 텍스트 변환 함수
 */
export function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': '대기중',
    'in-progress': '진행중',
    'completed': '완료',
    'cancelled': '취소됨',
    'not-started': '시작안함',
    'on-hold': '보류',
  };
  return statusMap[status] || status;
}

/**
 * 상태 색상 반환 함수
 */
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'not-started': 'bg-gray-100 text-gray-800',
    'on-hold': 'bg-orange-100 text-orange-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
}

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

/**
 * 클래스네임 조합 함수
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 로컬 스토리지 헬퍼
 */
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 실패 시 무시
    }
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

/**
 * API 오류 메시지 추출
 */
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return '알 수 없는 오류가 발생했습니다.';
}