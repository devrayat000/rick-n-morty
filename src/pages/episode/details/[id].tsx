import {
  Box,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";

import rqClient from "~/modules/rq-client";
import api from "~/secvices/api";
import CharacterCard from "~/components/character/CharacterCard";

const EpisodeDetailsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ id }) => {
  const { data, isFetching } = useQuery(["episode", id], ({ queryKey }) =>
    api.EpisodeById({ id: queryKey[1] })
  );
  const router = useRouter();

  if (isFetching || router.isFallback) {
    return <LoadingOverlay visible />;
  }

  return (
    <Container>
      <Head>
        <title>{data?.episode?.name}</title>
        <meta
          name="description"
          content={`${data?.episode?.episode} - ${data?.episode?.name}`}
        />
      </Head>
      <Title weight={700} order={1}>
        {data?.episode?.name}
      </Title>
      <Text weight={500} size="xl">
        {data?.episode?.episode}
      </Text>
      <Text size="lg">
        <b>Aired:</b> {data?.episode?.air_date}
      </Text>

      <Box mt="xl">
        <Title order={2} align="center">
          Characters
        </Title>
        <SimpleGrid
          mt="xl"
          cols={2}
          breakpoints={[
            {
              minWidth: "md",
              cols: 3,
            },
          ]}
        >
          {data?.episode?.characters.map((character) => (
            <CharacterCard key={character?.id} character={character} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default EpisodeDetailsPage;

export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
  const data = await api.EpisodesId();

  return {
    paths: data?.episodes?.results?.map((r) => ({
      params: { id: r?.id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { dehydrate } = await import("@tanstack/react-query");

  const id = ctx.params?.id as string;
  await rqClient.prefetchQuery(["episode", id], ({ queryKey }) =>
    api.EpisodeById({ id: queryKey[1] })
  );

  return {
    props: {
      dehydratedState: dehydrate(rqClient),
      id,
    },
  };
};
