import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  Card,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from "@mantine/core";

const HomePage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Rock n Morty</title>
        <meta name="description" content="Morty & Rick Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Suspense>
        <Expisodes preloadedQuery={preloadedQuery} CSN={CSN} />
      </Suspense> */}
    </Container>
  );
};

export default HomePage;
