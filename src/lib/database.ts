// MySQL/NAS �����ͺ��̽� ���� ���̺귯��
import mysql from 'mysql2/promise';

// �����ͺ��̽� ���� ����
const dbConfig = {
  host: process.env.NAS_HOST || 'localhost',
  port: parseInt(process.env.NAS_PORT || '3306'),
  user: process.env.NAS_USERNAME || 'root',
  password: process.env.NAS_PASSWORD || '',
  database: process.env.NAS_DATABASE || '88oem',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// ���� Ǯ ����
let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// �����ͺ��̽� ���� �׽�Ʈ
export async function testDatabaseConnection() {
  try {
    const connection = await getPool().getConnection();
    await connection.ping();
    connection.release();
    
    return {
      success: true,
      message: 'NAS 데이터베이스 연결 성공',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '연결 실패',
    };
  }
}

// ֹ� ������ ��������
export async function getOrdersFromDatabase() {
  try {
    const [rows] = await getPool().execute(`
      SELECT 
        id,
        customer_name,
        product_name,
        quantity,
        status,
        order_date,
        due_date,
        total_amount,
        notes,
        created_at,
        updated_at
      FROM orders 
      ORDER BY created_at DESC
    `);

    return {
      success: true,
      data: rows,
      total: Array.isArray(rows) ? rows.length : 0,
    };
  } catch (error) {
    console.error('�ֹ� ������ ��ȸ ����:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '������ ��ȸ ����',
      data: [],
      total: 0,
    };
  }
}

// ���� ��Ȳ ������ ��������
export async function getProductionFromDatabase() {
  try {
    const [rows] = await getPool().execute(`
      SELECT 
        id,
        order_id,
        product_name,
        quantity,
        completed_quantity,
        status,
        start_date,
        completed_date,
        assigned_worker,
        created_at,
        updated_at
      FROM production 
      ORDER BY created_at DESC
    `);

    return {
      success: true,
      data: rows,
      total: Array.isArray(rows) ? rows.length : 0,
    };
  } catch (error) {
    console.error('���� ������ ��ȸ ����:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '������ ��ȸ ����',
      data: [],
      total: 0,
    };
  }
}

// �� �ֹ� �߰�
export async function createOrderInDatabase(orderData: {
  customerName: string;
  productName: string;
  quantity: number;
  dueDate: string;
  totalAmount: number;
  notes?: string;
}) {
  try {
    const [result] = await getPool().execute(`
      INSERT INTO orders (
        customer_name, 
        product_name, 
        quantity, 
        status, 
        order_date, 
        due_date, 
        total_amount, 
        notes
      ) VALUES (?, ?, ?, 'pending', NOW(), ?, ?, ?)
    `, [
      orderData.customerName,
      orderData.productName,
      orderData.quantity,
      orderData.dueDate,
      orderData.totalAmount,
      orderData.notes || '',
    ]);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('�ֹ� ���� ����:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '�ֹ� ���� ����',
    };
  }
}

// ��ú��� ��� ��������
export async function getDashboardStats() {
  try {
    // �� �ֹ� ��
    const [totalOrdersResult] = await getPool().execute(
      'SELECT COUNT(*) as total FROM orders'
    );
    const totalOrders = Array.isArray(totalOrdersResult) ? (totalOrdersResult[0] as any).total : 0;

    // �Ϸ�� �ֹ� ��
    const [completedOrdersResult] = await getPool().execute(
      "SELECT COUNT(*) as completed FROM orders WHERE status = 'completed'"
    );
    const completedOrders = Array.isArray(completedOrdersResult) ? (completedOrdersResult[0] as any).completed : 0;

    // ���� ���� �ֹ� ��
    const [inProgressOrdersResult] = await getPool().execute(
      "SELECT COUNT(*) as inProgress FROM orders WHERE status = 'in-progress'"
    );
    const inProgressOrders = Array.isArray(inProgressOrdersResult) ? (inProgressOrdersResult[0] as any).inProgress : 0;

    // �̹� �� ����
    const [monthlyRevenueResult] = await getPool().execute(`
      SELECT COALESCE(SUM(total_amount), 0) as revenue 
      FROM orders 
      WHERE DATE_FORMAT(order_date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m')
      AND status != 'cancelled'
    `);
    const monthlyRevenue = Array.isArray(monthlyRevenueResult) ? (monthlyRevenueResult[0] as any).revenue : 0;

    return {
      success: true,
      data: {
        totalOrders,
        completedOrders,
        inProgressOrders,
        monthlyRevenue,
        completionRate: totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0,
      },
    };
  } catch (error) {
    console.error('��� ��ȸ ����:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '��� ��ȸ ����',
      data: {
        totalOrders: 0,
        completedOrders: 0,
        inProgressOrders: 0,
        monthlyRevenue: 0,
        completionRate: 0,
      },
    };
  }
}

// �����ͺ��̽� ���̺� ���� (�ʱ� ������)
export async function createTables() {
  try {
    // �ֹ� ���̺� ����
    await getPool().execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        status ENUM('pending', 'in-progress', 'completed', 'cancelled') DEFAULT 'pending',
        order_date DATE NOT NULL,
        due_date DATE,
        total_amount DECIMAL(10,2) DEFAULT 0.00,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // ���� ���̺� ����
    await getPool().execute(`
      CREATE TABLE IF NOT EXISTS production (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        completed_quantity INT DEFAULT 0,
        status ENUM('not-started', 'in-progress', 'completed', 'on-hold') DEFAULT 'not-started',
        start_date DATE,
        completed_date DATE,
        assigned_worker VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    return {
      success: true,
      message: '�����ͺ��̽� ���̺� ���� �Ϸ�',
    };
  } catch (error) {
    console.error('���̺� ���� ����:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '���̺� ���� ����',
    };
  }
}