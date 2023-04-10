import React, { useEffect, useState } from 'react'

import useDebounce from '@/hooks/useDebounce';

type SearchBarProps = {
  placeholder: string;
  onInputSearch: (inputValue: string) => void;
}

function SearchBar({
  placeholder,
  onInputSearch
}:  SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const deboncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onInputSearch(deboncedValue);
  }, [deboncedValue, onInputSearch])

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
    </div>
  )
}

export default SearchBar