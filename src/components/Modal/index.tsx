'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from './useModal';
import { ModalProps } from './types';
import { cn } from '@/utils/cn';

const Modal: React.FC<ModalProps> = ({ content, closeText = '확인' }) => {
  const { isOpen, closeModal } = useModal();

  // 모달이 열릴 때 body의 스크롤을 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키를 눌렀을 때 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  // React Portal을 사용하여 모달을 body 바로 아래에 렌더링
  return createPortal(
    <>
      <div
        onClick={closeModal}
        className={cn(
          'fixed inset-0 top-0 left-0 w-full h-full bg-black/50 z-[9999] transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <div
        className={cn(
          'flex flex-col items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg z-[10000] rounded-lg',
          'transition-all duration-300 ease-in-out transform',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        )}
      >
        {content}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors cursor-pointer border-none"
        >
          {closeText}
        </button>
      </div>
    </>,
    document.body
  );
};

export default Modal;
