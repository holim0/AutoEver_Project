import { useEffect, useState } from 'react';

/**
 * 스크롤 여부를 감지하는 커스텀 훅
 * @returns {boolean} isScrolled - 스크롤이 0px 이상 이동했는지 여부
 */
export function useDetectScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
}
