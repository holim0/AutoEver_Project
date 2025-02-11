import { useRef, useState } from 'react';

const useSearch = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
