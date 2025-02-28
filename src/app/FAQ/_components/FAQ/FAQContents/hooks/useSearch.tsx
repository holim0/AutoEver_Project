import { useRef, useState } from 'react';
import { useModal } from '@/components/Modal/useModal';

const useSearch = () => {
  const { openModal } = useModal();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = searchInputRef.current?.value || '';

    if (inputValue !== '' && inputValue.length < 2) {
      openModal({
        content: <p>검색어는 2글자 이상 입력해주세요.</p>,
      });
      return;
    }

    setSearchValue(searchInputRef.current?.value || '');
  };

  const resetSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setSearchValue('');
  };

  return { onSearch, resetSearch, searchInputRef, searchValue, isInputFilled, setIsInputFilled };
};

export default useSearch;
