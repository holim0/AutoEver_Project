import { useEffect, useRef, useState } from 'react';

const useFAQListToggle = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const faqItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (openId !== null && faqItemRefs.current[openId]) {
      faqItemRefs.current[openId].style.maxHeight = `${faqItemRefs.current[openId].scrollHeight}px`;
    }
  }, [openId]);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return { openId, toggleItem, faqItemRefs };
};

export default useFAQListToggle;
