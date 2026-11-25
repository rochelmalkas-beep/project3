import { filterItems, sortItems } from '../utils/itemsHelpers';
import { useUrlState } from './useUrlState';


export function useSearchAndSort(items, searchOptions) {
  const [searchField, , setValues] = useUrlState(
    'searchField',
    searchOptions[0]?.value || ''
  );
  const [searchText, setSearchText] = useUrlState('searchText', '');
  const [sortField, setSortField] = useUrlState('sortField', '');

  const changeSearchField = (newSearchField) => {
    setValues({ searchField: newSearchField, searchText: '' });
  };

  const visibleItems = sortItems(filterItems(items, searchField, searchText), sortField);

  return { searchField, searchText, sortField, setSearchText, setSortField, changeSearchField, visibleItems };
}