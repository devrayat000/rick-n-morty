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

import CharacterCard from "~/components/character/CharacterCard";

function getEpisodeById(id: string) {
  return import("~/secvices/api").then((m) => m.default.EpisodeById({ id }));
}

const EpisodeDetailsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ id }) => {
  const { data, isFetching } = useQuery(["episode", id], ({ queryKey }) =>
    getEpisodeById(queryKey[1])
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
  const { default: api } = await import("~/secvices/api");
  const data = await api.EpisodesId();

  return {
    paths: data?.episodes?.results?.map((r) => ({
      params: { id: r?.id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const [{ dehydrate }, { default: rqClient }, { default: api }] =
    await Promise.all([
      import("@tanstack/react-query"),
      import("~/modules/rq-client"),
      import("~/secvices/api"),
    ]);

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
