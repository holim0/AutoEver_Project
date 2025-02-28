import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getCategoryMenuList, getFAQList } from '../api';

import type { TAB } from '../types';

export const useCategoryMenuList = (tab: TAB) =>
  useQuery({
    queryKey: ['categoryMenuList', tab],
    queryFn: () => getCategoryMenuList(tab),
  });

export const useFAQList = ({
  limit,
  tab,
  faqCategoryID,
  question,
}: {
  limit: number;
  tab: TAB;
  faqCategoryID?: string;
  question?: string;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['FAQList', tab, faqCategoryID, question],
    queryFn: async ({ pageParam = 0 }) =>
      getFAQList({
        limit,
        offset: pageParam * limit,
        tab,
        faqCategoryID,
        question,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { nextOffset, offset, totalRecord } = lastPage.pageInfo;
      return nextOffset > offset && nextOffset < totalRecord ? nextOffset / limit : undefined;
    },
  });
};
