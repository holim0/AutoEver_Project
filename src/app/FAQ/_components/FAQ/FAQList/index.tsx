import Image from 'next/image';
import { useContext, createContext, RefObject, useEffect } from 'react';

import useFAQListToggle from './useFAQListToggle';
import ArrowIcon from '@/assets/ic_arrow.svg';

import type { TAB } from '../FAQContents/types';
import { useFAQList } from '../FAQContents/hooks/useDataQueries';
import NoData from '../../NoData';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FAQListToggleContext {
  openId: number | null;
  toggleItem: (id: number) => void;
  faqItemRefs: RefObject<Record<string, HTMLDivElement | null>>;
}

const FAQListToggleContext = createContext<FAQListToggleContext>({} as FAQListToggleContext);

interface FAQListProps {
  limit: number;
  tab: TAB;
  faqCategoryID: string;
  question: string;
  onTotalRecordsChange: (totalRecords: number) => void;
}

const FAQList = ({ limit, tab, faqCategoryID, question, onTotalRecordsChange }: FAQListProps) => {
  const FAQListToggleState = useFAQListToggle();
  const {
    isLoading,
    isFetchingNextPage,
    data: faqList,
    hasNextPage,
    fetchNextPage,
  } = useFAQList({ limit, tab, faqCategoryID, question });

  useEffect(() => {
    if (faqList?.pages[0]?.pageInfo?.totalRecord) {
      onTotalRecordsChange(faqList.pages[0].pageInfo.totalRecord);
    } else {
      onTotalRecordsChange(0);
    }
  }, [faqList, onTotalRecordsChange]);

  const isEmpty = !faqList || faqList.pages.every((page) => page.items.length === 0);

  if (isEmpty && !isLoading) {
    return <NoData />;
  }

  return (
    <FAQListToggleContext.Provider value={FAQListToggleState}>
      <ul className="border-t-2 border-t-[var(--midnight-900)]">
        {faqList?.pages.flatMap((page) =>
          page.items.map((item) => <FAQList.Item key={item.id} curActivetab={tab} {...item} />)
        )}
      </ul>
      {isFetchingNextPage && <LoadingSpinner />}
      {hasNextPage && (
        <button
          className="flex items-center justify-center text-[var(--list-more-size)] h-[var(--btn-xlg2)] mt-[calc(var(--px-lg)-8px)] w-full cursor-pointer"
          onClick={() => fetchNextPage()}
        >
          + 더보기
        </button>
      )}
    </FAQListToggleContext.Provider>
  );
};

const Items = ({
  id,
  question,
  answer,
  categoryName,
  subCategoryName,
  curActivetab,
}: {
  id: number;
  question: string;
  answer: string;
  categoryName: string;
  subCategoryName: string;
  curActivetab: TAB;
}) => {
  const { openId, toggleItem, faqItemRefs } =
    useContext<FAQListToggleContext>(FAQListToggleContext);

  return (
    <li className="border-b border-gray-100 text-[var(--faq-list-a-size)]">
      <button
        className={`relative w-full flex sm:flex-col md:flex-col sm:items-start md:items-start items-center py-[var(--faq-list-a-padding-v)] pr-[calc(var(--px-xlg)+1.6em)] text-left text-lg font-semibold transition-colors duration-300 ${openId === id ? 'bg-gray-10' : 'bg-white'}`}
        onClick={() => toggleItem(id)}
      >
        <div className="flex sm:flex md:flex sm:items-center md:items-center">
          <span className="text-gray-500 text-[calc(1em-4px)] mr-2 sm:mr-0 md:mr-0 px-[var(--faq-list-a-padding-h)] sm:pr-0 md:pr-0 w-[8em] sm:w-auto md:w-auto font-normal text-center">
            {categoryName}
          </span>
          {curActivetab === 'USAGE' && (
            <>
              <Image
                className="lg:hidden xl:hidden -rotate-90"
                src={ArrowIcon}
                alt="Category Arrow Icon"
                height={16}
                priority
              />
              <span className="text-gray-500 text-[calc(1em-4px)] mr-2 px-[var(--faq-list-a-padding-h)] sm:pl-0 md:pl-0 w-[8em] sm:w-auto md:w-auto font-normal text-center">
                {subCategoryName}
              </span>
            </>
          )}
        </div>

        <strong className="flex-1 text-[length:var(--faq-list-a-size)] pl-[var(--faq-list-a-padding-h)]">
          {question}
        </strong>
        <Image
          className={`absolute right-3 top-1/2 -translate-y-1/2 size-[var(--ic-md)] transition-transform duration-300 [transition-timing-function:cubic-bezier(1,0,0.2,1)] ${openId === id ? 'rotate-180' : ''}`}
          src={ArrowIcon}
          alt="Expand Arrow Icon"
          priority
        />
      </button>
      <div
        ref={(el) => {
          faqItemRefs.current[id] = el;
        }}
        className="transition-[max-height] duration-500 [transition-timing-function:cubic-bezier(1,0,0.2,1)] overflow-hidden"
        style={{ maxHeight: openId === id ? `${faqItemRefs.current[id]?.scrollHeight}px` : '0px' }}
      >
        <div
          className="text-gray-700 border-t border-gray-300 p-4"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </li>
  );
};

FAQList.Item = Items;
export default FAQList;
