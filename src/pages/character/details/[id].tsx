import {
  Box,
  Container,
  Group,
  LoadingOverlay,
  Paper,
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
import Image from "next/future/image";

import ExpisodeCard from "~/components/episode/EpisodeCard";
import Info from "~/components/common/Info";

function getCharacterById(id: string) {
  return import("~/secvices/api").then((m) => m.default.CharacterById({ id }));
}

const CharacterDetailsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ id }) => {
  const { data, isFetching } = useQuery(["character", id], ({ queryKey }) =>
    getCharacterById(queryKey[1])
  );
  const router = useRouter();

  if (isFetching || router.isFallback) {
    return <LoadingOverlay visible />;
  }

  return (
    <Container>
      <Head>
        <title>{data?.character?.name}</title>
        <meta
          name="description"
          content={`
            Name: ${data?.character?.name}
            Gender: ${data?.character?.gender}
            Species: ${data?.character?.species}${
            data?.character?.type ? "\nType: " + data.character.type : ""
          }
          `}
        />
        <meta name="og:title" content={data?.character?.name!} />
        <meta name="og:image" content={data?.character?.image!} />
        <meta name="og:image:alt" content={data?.character?.name!} />
      </Head>

      <Title weight={700} order={1}>
        {data?.character?.name}
      </Title>

      <Group
        mt="md"
        position="apart"
        align="start"
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
          },
        })}
      >
        <Box>
          <Box mt="md">
            <Info label="Gender">{data?.character?.gender}</Info>
            <Info label="Species">{data?.character?.species}</Info>
            <Info label="Status">{data?.character?.status}</Info>
            <Info label="Type">{data?.character?.type}</Info>
          </Box>

          <Box mt="md">
            <Text component="p" my={0} size="xl">
              Origin:
            </Text>
            <Box>
              <Info label="Name">{data?.character?.origin?.name}</Info>
              <Info label="Type">{data?.character?.origin?.type}</Info>
              <Info label="Dimension">
                {data?.character?.origin?.dimension}
              </Info>
            </Box>
          </Box>
          <Box mt="md">
            <Text component="p" my={0} size="xl">
              Location:
            </Text>
            <Box>
              <Info label="Name">{data?.character?.location?.name}</Info>
              <Info label="Type">{data?.character?.location?.type}</Info>
              <Info label="Dimension">
                {data?.character?.location?.dimension}
              </Info>
            </Box>
          </Box>
        </Box>
        <Paper radius="md" sx={{ overflow: "hidden" }}>
          <Image
            width={320}
            height={320}
            src={data?.character?.image!}
            alt={data?.character?.name!}
          />
        </Paper>
      </Group>

      <Box mt="xl">
        <Title order={2} align="center">
          Episodes
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
          {data?.character?.episode.map((episode) => (
            <ExpisodeCard key={episode?.id} episode={episode} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default CharacterDetailsPage;

export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
  const { default: api } = await import("~/secvices/api");
  const data = await api.CharactersId();

  return {
    paths: data?.characters?.results?.map((r) => ({
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
  await rqClient.prefetchQuery(["character", id], ({ queryKey }) =>
    api.CharacterById({ id: queryKey[1] })
  );

  return {
    props: {
      dehydratedState: dehydrate(rqClient),
      id,
    },
  };
};
