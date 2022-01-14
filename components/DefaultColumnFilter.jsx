import { useContext } from "react";
import { Input } from "@geist-ui/react";

import { RecordLengthContext } from "../utils/context/RecordLengthContext";

function DefaultColumnFilter({
  column: { filterValue, setFilter },
}) {
  const {recordLength} = useContext(RecordLengthContext);

  return (
    <Input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${recordLength} records...`}
      style={{width: '100%'}}
    />
  )
}

export default DefaultColumnFilter;
