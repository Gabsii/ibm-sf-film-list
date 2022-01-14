import * as React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { Spacer, Table as GeistTable } from '@geist-ui/react';
import styled from 'styled-components';

import SortedIcon from "./SortedIcon"
import GlobalFilter from "./GlobalFilter"
import DefaultColumnFilter from "./DefaultColumnFilter"
import {RecordLengthContext} from '../utils/context/RecordLengthContext';
import {PaginationContext} from '../utils/context/PaginationContext';

const TR = styled.tr`
  text-align: center;
`;

const TH = styled.th`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 0.8rem;

  padding: 1rem;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;

  cursor: pointer;

  &:first-of-type {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-left: 1px solid gray;
  }

  &:last-of-type {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-right: 1px solid gray;
  }
`;

const TD = styled.td`
  padding: 0.66rem;
  text-align: center;
  font-size: 14px;
`;

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  )

  const { setRecordLength } = React.useContext(RecordLengthContext);
  const { page } = React.useContext(PaginationContext);
  setRecordLength(rows.length);

  const start = (page - 1) * 20;
  const end = start + 20;

  const firstPageRows = state.globalFilter ? rows : rows.slice(start, end)

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <GeistTable {...getTableProps()} mt="20px" style={{ backgroundColor: 'white' }}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <TR {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <TH
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                  >
                  {column.render('Header')}
                  <SortedIcon column={column} />
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </TH>
              ))}
            </TR>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <TR {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return <TD {...cell.getCellProps()} key={i}>{cell.render('Cell')}</TD>
                })}
              </TR>
            )
          })}
        </tbody>
      </GeistTable>
      <div style={{ backgroundColor: 'white' }}>
        <br />
        <Spacer w={20}/>
        <div>Showing the first {rows.length < 20 ? rows.length : 20} results of {rows.length} rows</div>
      </div>
    </>
  )
}

export default Table;
