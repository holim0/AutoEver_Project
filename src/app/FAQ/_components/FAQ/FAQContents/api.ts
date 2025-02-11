import type { TAB, CategoryMenu, FAQList } from './types';

export const getCategoryMenuList = async (tab: TAB): Promise<CategoryMenu[]> => {
  const res = await fetch(`/api/faq/category?tab=${tab}`);
  return res.json();
};

export const getFAQList = async ({
  limit,
  offset,
  tab,
  faqCategoryID,
  question,
}: {
  limit: number;
  offset: number;
  tab: TAB;
  faqCategoryID?: string;
  question?: string;
}): Promise<FAQList> => {
  const queryString = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    tab,
    ...(faqCategoryID && { faqCategoryID }),
    ...(question && { question }),
  }).toString();

  const res = await fetch(`/api/faq?${queryString}`);

  return res.json();
};
