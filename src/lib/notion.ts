// Notion API 연결 라이브러리
import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 환경변수로부터 데이터베이스 ID 읽기
export const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

// Notion 데이터 조회 함수
export async function getNotionData() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
    });

    return {
      success: true,
      data: response.results,
      total: response.results.length,
    };
  } catch (error) {
    console.error('Notion API 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      data: [],
      total: 0,
    };
  }
}

// 주문 데이터 매핑 함수
export async function getOrdersFromNotion() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: { does_not_equal: 'Cancelled' },
      },
    });

    const orders = response.results.map((page: any) => ({
      id: page.id,
      customerName:
        page.properties.Customer?.title?.[0]?.plain_text || '',
      productName:
        page.properties.Product?.rich_text?.[0]?.plain_text || '',
      quantity: page.properties.Quantity?.number || 0,
      status: page.properties.Status?.select?.name || 'pending',
      orderDate: page.properties.OrderDate?.date?.start || '',
      dueDate: page.properties.DueDate?.date?.start || '',
      totalAmount: page.properties.Amount?.number || 0,
      notes: page.properties.Notes?.rich_text?.[0]?.plain_text || '',
    }));

    return {
      success: true,
      data: orders,
      total: orders.length,
    };
  } catch (error) {
    console.error('주문 데이터 조회 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      data: [],
      total: 0,
    };
  }
}

// Notion에 새 주문 생성 함수
export async function createOrderInNotion(orderData: {
  customerName: string;
  productName: string;
  quantity: number;
  dueDate: string;
  totalAmount: number;
  notes?: string;
}) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Customer: {
          title: [ { text: { content: orderData.customerName } } ],
        },
        Product: {
          rich_text: [ { text: { content: orderData.productName } } ],
        },
        Quantity: { number: orderData.quantity },
        Status: { select: { name: 'pending' } },
        OrderDate: {
          date: { start: new Date().toISOString().split('T')[0] },
        },
        DueDate: { date: { start: orderData.dueDate } },
        Amount: { number: orderData.totalAmount },
        Notes: {
          rich_text: [ { text: { content: orderData.notes || '' } } ],
        },
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('주문 생성 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

// Notion 연결 테스트 함수
export async function testNotionConnection() {
  try {
    if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
      return {
        success: false,
        error: 'Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다.',
      };
    }

    // 데이터베이스 메타정보 조회
    const response = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });

    // 'Name' 필드(제목)에서 첫 번째 타이틀 텍스트 추출
    const nameProp = (response.properties as any).Name as {
      title: { plain_text: string }[];
    };
    const databaseTitle =
      Array.isArray(nameProp?.title) && nameProp.title.length > 0
        ? nameProp.title[0].plain_text
        : 'Unknown';

    return {
      success: true,
      message: 'Notion 연결 성공',
      databaseTitle,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '연결 실패',
    };
  }
}
