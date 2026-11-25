import { createContext, useRef } from 'react';
import { createCache } from '../utils/cache';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const cacheRef = useRef(createCache());

  return (
    <DataContext.Provider value={{ cache: cacheRef.current }}>
      {children}
    </DataContext.Provider>
  );
}
