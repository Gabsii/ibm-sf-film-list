import { createContext } from 'react';

export const PaginationContext = createContext({ page: 1,});

export const PaginationProvider = ({ children, page, setPage }) => (
  <PaginationContext.Provider
    value={{
      page,
      setPage,
    }}
  >
    {children}
  </PaginationContext.Provider>
);
