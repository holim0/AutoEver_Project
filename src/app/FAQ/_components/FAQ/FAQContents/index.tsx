'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';

import { cn } from '@/utils/cn';
import { useCategoryMenuList } from './hooks/useDataQueries';
import SearchIcon from '@/assets/ic_search.svg';
import ClearIcon from '@/assets/ic_clear.svg';
import ResetIcon from '@/assets/ic_init.svg';
import FAQList from '../FAQList';

import useSearch from './hooks/useSearch';

import type { TAB } from './types';
import FAQCategory from '../FAQCategory';
import ModalProvider from '@/components/Modal/ModalProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

const TABS: { type: TAB; name: string }[] = [
  { type: 'CONSULT', name: '서비스 도입' },
  { type: 'USAGE', name: '서비스 이용' },
];

const FAQContentsComponent = () => {
  const [curActivetab, setActiveTab] = useState<TAB>('CONSULT');
  const [faqCategoryID, setFaqCategoryID] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);

  const { onSearch, resetSearch, searchInputRef, searchValue, isInputFilled, setIsInputFilled } =
    useSearch();

  const { data: categoryMenuList } = useCategoryMenuList(curActivetab);

  return (
    <div>
      <ul className="flex mb-[var(--px-lg)] text-[length:var(--tab-fsize)] min-h-[var(--btn-xlg2)]">
        {TABS.map((tab) => (
          <li
            key={tab.type}
            className={cn(
              'border font-semibold relative flex-1 min-h-[var(--btn-xlg2)] flex justify-center items-center',
              tab.type === curActivetab
                ? 'bg-midnight-900 border-midnight-900 text-white font-semibold'
                : 'bg-white border-midnight-100 text-black font-normal'
            )}
            onClick={() => {
              setActiveTab(tab.type);
              setFaqCategoryID('');
              resetSearch();
            }}
          >
            {tab.name}
          </li>
        ))}
      </ul>
      <form
        id="search-form"
        className="flex justify-center bg-gray-10 p-[var(--px-md)] mb-[var(--px-md)]"
        onSubmit={onSearch}
      >
        <div className="relative w-[var(--search-bar-width)]">
          <input
            ref={searchInputRef}
            className="border border-midnight-900 text-base h-[var(--btn-xlg2)] w-full pl-4 pr-[calc(var(--ic-sm)+var(--clear-space)+var(--btn-xlg2)-2px)] focus:outline-none"
            type="text"
            placeholder="찾으시는 내용을 입력해 주세요"
            onChange={() => setIsInputFilled(!!searchInputRef.current?.value)}
          />
          {isInputFilled && (
            <button
              type="button"
              className="absolute top-0 flex items-center h-full right-[calc(-1px+var(--btn-xlg2))]"
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.value = '';
                }
                setIsInputFilled(false);
              }}
            >
              <Image className="size-[var(--ic-md)]" src={ClearIcon} alt="Clear Icon" priority />
            </button>
          )}
          <button
            className="absolute right-2 top-0 flex items-center h-full"
            type="submit"
            form="search-form"
          >
            <Image className="size-[var(--ic-md)]" src={SearchIcon} alt="Search Icon" priority />
          </button>
        </div>
      </form>

      {searchValue && (
        <div className="flex justify-between text-[length:var(--heading-info)] my-[var(--px-md)]">
          <h2 className="font-bold">
            검색결과 총 <em className="text-mint-900 not-italic">{totalRecords}</em>건
          </h2>
          <button
            className="flex items-center text-[16px]"
            type="button"
            onClick={() => resetSearch()}
          >
            <Image src={ResetIcon} alt="Reset Search Icon" />
            <span className="ml-1">검색 초기화</span>
          </button>
        </div>
      )}

      <FAQCategory>
        <FAQCategory.Item
          name="전체"
          isChecked={faqCategoryID === ''}
          onChange={() => setFaqCategoryID('')}
        />
        {categoryMenuList?.map((categoryMenu) => {
          const { categoryID, name } = categoryMenu;
          const isChecked = categoryID === faqCategoryID;
          return (
            <FAQCategory.Item
              key={categoryID}
              name={name}
              isChecked={isChecked}
              onChange={() => setFaqCategoryID(categoryID)}
            />
          );
        })}
      </FAQCategory>

      <Suspense fallback={<LoadingSpinner />}>
        <FAQList
          limit={10}
          tab={curActivetab}
          faqCategoryID={faqCategoryID}
          question={searchValue}
          onTotalRecordsChange={setTotalRecords}
        />
      </Suspense>
    </div>
  );
};

const FAQContents = () => {
  return (
    <ModalProvider>
      <FAQContentsComponent />
    </ModalProvider>
  );
};

export default FAQContents;
