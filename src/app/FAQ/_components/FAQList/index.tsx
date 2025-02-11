import Image from 'next/image';
import { ReactNode, useContext, createContext, RefObject } from 'react';

import useFAQListToggle from './useFAQListToggle';
import ArrowIcon from '@/assets/ic_arrow.svg';

import type { TAB } from '../FAQContents/types';

interface FAQListToggleContext {
  openId: number | null;
  toggleItem: (id: number) => void;
  faqItemRefs: RefObject<Record<string, HTMLDivElement | null>>;
}

const FAQListToggleContext = createContext<FAQListToggleContext>({} as FAQListToggleContext);

const FAQList = ({ children }: { children: ReactNode }) => {
  const FAQListToggleState = useFAQListToggle();

  return (
    <FAQListToggleContext.Provider value={FAQListToggleState}>
      <ul className="border-t-2 border-t-[var(--midnight-900)]">{children}</ul>
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
          className={`absolute right-3 size-[var(--ic-md)] transition-transform duration-300 [transition-timing-function:cubic-bezier(1,0,0.2,1)] ${openId === id ? 'rotate-180' : ''}`}
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
