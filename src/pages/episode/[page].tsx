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

function getEpisodesByPage(page: number | string) {
  return import("~/secvices/api").then((m) =>
    m.default.Episodes({ page: page as number })
  );
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EpisodesPage: NextPage<Props> = ({ page }) => {
  const { data, isFetching } = useQuery(["episodes", page], ({ queryKey }) =>
    getEpisodesByPage(queryKey[1])
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
        cols={2}
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
  const { default: api } = await import("~/secvices/api");
  const { episodes } = await api.EpisodePages();

  return {
    paths: Array.from(new Array(episodes?.info?.pages).keys()).map((page) => ({
      params: { page: String(++page) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const [{ dehydrate }, { default: rqClient }, { default: api }] =
    await Promise.all([
      import("@tanstack/react-query"),
      import("~/modules/rq-client"),
      import("~/secvices/api"),
    ]);
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
