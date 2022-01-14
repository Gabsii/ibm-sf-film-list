import { Page, Text } from "@geist-ui/react";
import Head from "next/head";

import type {Film} from '../index';
import fetchMovies from '../../utils/fetchMovies';
import slugify from '../../utils/slugify';
import Link from "next/link";

export default function FilmDetail({ film }: {film: Film}) {
  console.log(film);
  return (
    <div>
      <Head>
        <title>IBM San Francisco Film Locations List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page dotBackdrop width="800px" padding={0}>
        <Text h1>{film.title}</Text>
        <Text>{film.release_year && (<><Text b>Release Year: </Text>{film.release_year}</>)}</Text>
        <Text>{film.locations && (<><Text b>Locations: </Text>{film.locations.join(', ')}</>)}</Text>
        <Text>{film.production_company && (<><Text b>Production Company: </Text>{film.production_company}</>)}</Text>
        <Text>{film.director && (<><Text b>Director: </Text>{film.director}</>)}</Text>
        <Text>{film.actor_1 && (<><Text b>Actors: </Text>{`${film.actor_1}, ${film.actor_2}, ${film.actor_3}`}</>)}</Text>
        <Link href="/" passHref>
          <a style={{marginTop: '20px'}}>Back to Overview</a>
        </Link>
      </Page>
    </div>
  )
}


export async function getStaticPaths() {
  // fetch all data from API
  const data = await fetchMovies();

  if (!data) {
    return {
      notFound: true,
    }
  }

  const paths = data.map(item => {
    return {
      params: {
        slug: slugify(item.title),
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  const data = await fetchMovies();

  if (!data) {
    return {
      notFound: true,
    }
  }

  const film = data.filter(item => slugify(item.title) === params.slug)[0]

  return {
    props: { film }
  }
}
