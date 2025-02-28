'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface HamburgerButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  onClick,
  className = '',
  ariaLabel = '메뉴 열기',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      className={cn(
        'flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none',
        className
      )}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <span className="sr-only">{isOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
      <div className="w-6 h-6 flex items-center justify-center relative">
        {/* 상단 바 */}
        <span
          className={cn(
            'absolute h-0.5 w-full bg-current rounded-sm transition-all duration-300 ease-in-out',
            isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
          )}
        />
        {/* 중간 바 */}
        <span
          className={cn(
            'absolute h-0.5 w-full bg-current rounded-sm transition-all duration-200 ease-in-out',
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
          )}
        />
        {/* 하단 바 */}
        <span
          className={cn(
            'absolute h-0.5 w-full bg-current rounded-sm transition-all duration-300 ease-in-out',
            isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
          )}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
