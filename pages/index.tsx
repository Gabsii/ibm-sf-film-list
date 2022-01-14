import Head from 'next/head'
import { Page, Text, Grid, Pagination, Input, useTheme } from '@geist-ui/react'
import { useState, useMemo } from 'react'

import fetchMovies from '../utils/fetchMovies';
import useFilmColumns from '../utils/useColumns';
import Table from '../components/Table';
import { RecordLengthProvider } from '../utils/context/RecordLengthContext';
import { PaginationProvider } from '../utils/context/PaginationContext';

export type Film = {
  title: string,
  release_year: string,
  locations: string[],
  fun_facts: string,
  production_company: string,
  director: string,
  writer: string,
  actor_1: string,
  actor_2: string,
  actor_3: string,
}

const PAGE_LENGTH = 20;

export default function Home({ data }: {data: Film[]}) {
  const [page, setPage] = useState(1);
  const [recordLength, setRecordLength] = useState(data.length);
  const columns = useFilmColumns();

  return (
    <div>
      <Head>
        <title>IBM San Francisco Film Locations List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page dotBackdrop width="800px" padding={0}>
        <PaginationProvider page={page} setPage={setPage}>
          <Text h1 mb="20px" style={{ textAlign: 'center'}}>SF Film Locations List</Text>
          <RecordLengthProvider setRecordLength={setRecordLength} recordLength={recordLength}>
          <Grid.Container justify="center" gap={3}>
            <Table columns={columns} data={data}/>
          </Grid.Container>
          </RecordLengthProvider>
          <Grid.Container justify='center' mt="50px">
            <Pagination
              count={parseInt(Math.ceil(recordLength / PAGE_LENGTH).toString())}
              initialPage={page}
              limit={5}
              onChange={(page) => setPage(page)}
            />
          </Grid.Container>
        </PaginationProvider>
      </Page>
    </div>
  )
}

export async function getStaticProps() {
  // fetch all data from API
  const data = await fetchMovies();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }
  }
}
