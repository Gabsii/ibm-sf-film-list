/* eslint-disable prettier/prettier */
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format } from 'date-fns';
import { Text } from '@geist-ui/react';

import slugify from '../utils/slugify';

const Header = ({ column, text }) => (
  <Text span i={column.isSorted}>
    {text}
  </Text>
);

Header.propTypes = {
  column: PropTypes.object,
  text: PropTypes.string,
};

const useFilmColumns = () =>
  useMemo(
    () => [
      {
        Header: (data) => <Header column={data.column} text="Title" />,
        id: 'title',
        accessor: (originalRow) =>
          <Link href={`/film/${slugify(originalRow.title)}`}>
          {originalRow.title}
          </Link>,
      },
      {
        Header: (data) => <Header column={data.column} text="Release Year" />,
        id: 'release_year',
        accessor: (originalRow) =>
          format(new Date(originalRow.release_year), 'dd-MM-yyyy'),
      },
      {
        Header: (data) => <Header column={data.column} text="Director" />,
        accessor: 'director',
      },
    ],
    [],
  );
export default useFilmColumns;
