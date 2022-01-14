import { ChevronDown, ChevronUp, ChevronUpDown } from '@geist-ui/react-icons';

const SortedIcon = ({ column }) => (
  <span>
    {column.canSort ? (
      column.isSorted ? (
        column.isSortedDesc ? (
          <ChevronDown size={12} />
        ) : (
          <ChevronUp size={12} />
        )
      ) : (
        <ChevronUpDown size={12} />
      )
    ) : null}
  </span>
);

export default SortedIcon;
