import {
  Box,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";

import CharacterCard from "~/components/character/CharacterCard";

function getEpisodeById(id: string) {
  return import("~/secvices/api").then((m) => m.default.EpisodeById({ id }));
}

const EpisodeDetailsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ id, data }) => {
  const router = useRouter();

  if (router.isFallback) {
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
  const { default: api } = await import("~/secvices/fetch");
  const data = await api.EpisodesId();

  return {
    paths: data?.episodes?.results?.map((r) => ({
      params: { id: r?.id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { default: api } = await import("~/secvices/fetch");

  const id = ctx.params?.id as string;

  return {
    props: {
      data: await api.EpisodeById({ id }),
      id,
    },
  };
};
