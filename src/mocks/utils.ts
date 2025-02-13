import { HttpResponse } from 'msw';

const faqCategoryMapping: Record<string, string> = {
  PRODUCT: '서비스 상품',
  COUNSELING: '도입 상담',
  CONTRACT: '계약',
  SIGN_UP: '가입문의',
  BUSINESS: '비즈니스(업무용)',
  ACCIDENT: '사고/보험',
  RESERVATION: '예약/결제',
  VEHICLE: '차량문의',
  REFUEL: '충전',
  COUPON: '쿠폰/기타',
};

export const categoryIdToName = (id: string): string => {
  return faqCategoryMapping[id] || id;
};

export const getNextOffset = (offset: number, limit: number, totalRecord: number): number => {
  return offset + limit < totalRecord ? offset + limit : offset;
};

export const createErrorResponse = (message: string) =>
  HttpResponse.json({ error: message }, { status: 400 });
