// 88OEM TypeScript Type Definitions

// 주문 관련 타입
export interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  orderDate: string;
  dueDate: string;
  totalAmount: number;
  notes?: string;
}

// 생산 관련 타입
export interface Production {
  id: string;
  orderId: string;
  productName: string;
  quantity: number;
  completedQuantity: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  startDate?: string;
  completedDate?: string;
  assignedWorker?: string;
}

// Notion 데이터베이스 타입
export interface NotionDatabase {
  id: string;
  title: string;
  properties: Record<string, any>;
  results: NotionPage[];
}

export interface NotionPage {
  id: string;
  properties: Record<string, any>;
  created_time: string;
  last_edited_time: string;
}

// NAS 연결 설정 타입
export interface NASConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// 대시보드 통계 타입
export interface DashboardStats {
  totalOrders: number;
  completedOrders: number;
  inProgressOrders: number;
  monthlyRevenue: number;
  completionRate: number;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

// 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'worker';
  avatar?: string;
}