'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import WibleBizLogo from '@/assets/logo_wible_lg.svg';
import { useDetectScroll } from './useDetectScroll';
import HamburgerButton from '@/components/HamburgerButton';
import { useState } from 'react';

const NAV_LIST = [
  { id: 'guide', name: '서비스 소개', href: 'https://wiblebiz.kia.com/Guide', isCurPage: false },
  { id: 'faq', name: '자주 묻는 질문', href: '/FAQ', isCurPage: true },
  { id: 'news', name: '새소식', href: 'https://wiblebiz.kia.com/News', isCurPage: false },
  { id: 'counsel', name: '상담문의', href: 'https://wiblebiz.kia.com/Counsel', isCurPage: false },
] as const;

const Header = () => {
  const isPageScrolled = useDetectScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    // 메뉴가 열릴 때 스크롤 방지
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <header
      className={cn(
        'bg-white sticky top-0 z-[100] px-[var(--side-padding)] transition-shadow mx-auto my-0',
        isPageScrolled && 'shadow-sm'
      )}
    >
      <div className="flex justify-between items-center relative max-w-[var(--max-width)] h-[var(--header-height)] mx-auto">
        <Link className="flex items-center" href="https://wiblebiz.kia.com">
          <Image
            className="w-[120px] h-full lg:w-[160px] xl:w-[160px] sm:h-[40px]"
            src={WibleBizLogo}
            sizes="fill"
            alt="WibleBIZ Logo"
            priority
          />
        </Link>

        {/* 데스크탑 메뉴 -  lg, xl 크기 이상에서만 표시 */}
        <nav
          className={cn(
            'sm:hidden md:hidden xl:-mr-[20px] xl:flex-1 xl:h-full lg:-mr-[20px] lg:flex-1 lg:h-full'
          )}
        >
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

        {/* 모바일 햄버거 버튼 - sm, md 크기에서만 표시 */}
        <div className="hidden md:block sm:block flex items-center z-[102]">
          <HamburgerButton onClick={toggleMenu} />
        </div>

        {/* 모바일 메뉴 패널 - 전체 화면 */}
        <div
          className={cn(
            'fixed left-0 right-0 bottom-0 bg-white z-[101] top-[var(--header-height)] transition-transform duration-500 ease-menu-cubic transform lg:hidden xl:hidden',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <nav className="p-6">
            <ul className="flex flex-col space-y-6 mt-[80px]">
              {NAV_LIST.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-center w-full rounded-md transition-colors duration-300 ease-menu-cubic active:bg-gray-100/30"
                >
                  <Link
                    className={cn(
                      'flex items-center justify-center w-full text-center',
                      'text-[24px] font-semibold py-4',
                      'transition-colors duration-300 ease-menu-cubic',
                      item.isCurPage ? 'text-mint-900' : 'text-gray-800'
                    )}
                    href={item.href}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
