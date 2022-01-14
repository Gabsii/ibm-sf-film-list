import { Input } from '@geist-ui/react';
import * as React from 'react';
import { useAsyncDebounce } from "react-table"
// necessary for useAsyncDebounce to work
import regeneratorRuntime from "regenerator-runtime";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <Input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
          width: '100%',
        }}
      />
    </span>
  )
}

export default GlobalFilter;
