import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mantine/core";

const HomePage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Rock n Morty</title>
        <meta name="description" content="Morty & Rick Database" />
      </Head>

      {/* <Suspense>
        <Expisodes preloadedQuery={preloadedQuery} CSN={CSN} />
      </Suspense> */}
    </Container>
  );
};

export default HomePage;
