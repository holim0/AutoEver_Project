export type TAB = 'CONSULT' | 'USAGE';

export interface CategoryMenu {
  categoryID: string;
  name: string;
}

export type FAQItem = {
  answer: string;
  categoryName: string;
  id: number;
  question: string;
  subCategoryName: string;
};

export interface FAQList {
  items: FAQItem[];

  pageInfo: {
    limit: number;
    nextOffset: number;
    offset: number;
    prevOffset: number;
    totalRecord: number;
  };
}
