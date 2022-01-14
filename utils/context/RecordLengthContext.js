import { createContext } from 'react';

export const RecordLengthContext = createContext(null);

export const RecordLengthProvider = ({ children, recordLength, setRecordLength }) => (
  <RecordLengthContext.Provider
    value={{
      recordLength,
      setRecordLength,
    }}
  >
    {children}
  </RecordLengthContext.Provider>
);
