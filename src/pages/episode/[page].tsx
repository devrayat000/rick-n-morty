import {
  Container,
  Group,
  LoadingOverlay,
  Pagination,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import ExpisodeCard from "~/components/episode/EpisodeCard";
import rqClient from "~/modules/rq-client";
import api from "~/secvices/api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EpisodesPage: NextPage<Props> = ({ page }) => {
  const { data, isFetching } = useQuery(["episodes", page], ({ queryKey }) =>
    api.Episodes({ page: queryKey[1] as number })
  );
  const router = useRouter();

  if (isFetching || router.isFallback) {
    return <LoadingOverlay visible />;
  }

  return (
    <Container>
      <Title order={1} align="center">
        Episodes
      </Title>

      <SimpleGrid
        cols={4}
        breakpoints={[
          {
            minWidth: "md",
            cols: 3,
          },
          {
            minWidth: "lg",
            cols: 4,
          },
        ]}
        mt="xl"
      >
        {data?.episodes?.results?.map((episode) => (
          <ExpisodeCard key={episode?.id} episode={episode} />
        ))}
      </SimpleGrid>

      <Group position="center">
        <Pagination
          mt="xl"
          page={page}
          onChange={(page) =>
            router.push("/episode/[page]", `/episode/${page}`)
          }
          total={data?.episodes?.info?.pages ?? 0}
        />
      </Group>
    </Container>
  );
};

export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
  const { episodes } = await api.EpisodePages();
  return {
    paths: Array.from(new Array(episodes?.info?.pages).keys()).map((page) => ({
      params: { page: String(++page) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { dehydrate } = await import("@tanstack/react-query");
  const page = parseInt(ctx.params?.page as string);

  await rqClient.prefetchQuery(["episodes", page], ({ queryKey }) =>
    api.Episodes({ page: queryKey[1] as number })
  );

  return {
    props: {
      dehydratedState: dehydrate(rqClient),
      page,
    },
  };
};

export default EpisodesPage;
