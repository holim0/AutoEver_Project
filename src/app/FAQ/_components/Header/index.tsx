'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import WibleBizLogo from '@/assets/logo_wible_lg.svg';
import { useDetectScroll } from './useDetectScroll';

const NAV_LIST = [
  { id: 'guide', name: '서비스 소개', href: 'https://wiblebiz.kia.com/Guide', isCurPage: false },
  { id: 'faq', name: '자주 묻는 질문', href: '/FAQ', isCurPage: true },
  { id: 'news', name: '새소식', href: 'https://wiblebiz.kia.com/News', isCurPage: false },
  { id: 'counsel', name: '상담문의', href: 'https://wiblebiz.kia.com/Counsel', isCurPage: false },
] as const;

const Header = () => {
  const isPageScrolled = useDetectScroll();

  return (
    <header
      className={cn(
        ' bg-white sticky top-0 z-[100] px-[var(--side-padding)] transition-shadow mx-auto my-0',
        isPageScrolled && 'shadow-sm'
      )}
    >
      <div className="flex justify-between relative max-w-[var(--max-width)] h-[var(--header-height)] mx-auto">
        <Link className="flex items-center" href="https://wiblebiz.kia.com">
          <Image
            className="w-[120px] h-[40px] lg:w-[160px] lg:h-full"
            src={WibleBizLogo}
            alt="WibleBIZ Logo"
            priority
          />
        </Link>
        <nav className={cn('xl:-mr-[20px] xl:flex-1 xl:h-full lg:-mr-[20px] lg:flex-1 lg:h-full')}>
          <ul className="flex justify-end h-full">
            {NAV_LIST.map((item) => (
              <li className="mx-[16px] my-0" key={item.id}>
                <Link
                  className={cn(
                    'px-1 text-[18px] font-semibold lg:leading-[var(--header-height)] relative h-full flex items-center',
                    'before:absolute before:bottom-0 before:left-0 before:h-1 before:w-0 before:bg-mint-900 before:content-[""]',
                    'before:transition-[width] before:duration-[0.4s] before:[transition-timing-function:var(--cubic-bezier-primary)]',
                    'hover:before:w-full hover:before:opacity-50',
                    item.isCurPage && 'before:w-full'
                  )}
                  href={item.href}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
