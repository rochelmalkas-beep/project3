import { useState } from 'react';
import { filterItems, sortItems } from '../utils/utils';


export function useSearchAndSort(items, searchOptions) {
  const [searchField, setSearchField] = useState(searchOptions[0]?.value || '');
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('');

  const changeSearchField = (newSearchField) => {
    setSearchField(newSearchField);
    setSearchText('');
  };

  const visibleItems = sortItems(filterItems(items, searchField, searchText), sortField);

  return { searchField, searchText, sortField, setSearchText, setSortField, changeSearchField, visibleItems };
}