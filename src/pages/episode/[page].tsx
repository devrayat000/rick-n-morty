import { Container, Group, Pagination, SimpleGrid, Title } from "@mantine/core";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import ExpisodeCard from "~/components/episode/EpisodeCard";
import api from "~/secvices/api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EpisodesPage: NextPage<Props> = ({ page, data }) => {
  const router = useRouter();

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
  const { episodes } = await api.EpisodePages();

  return {
    paths: Array.from(new Array(episodes?.info?.pages).keys()).map((page) => ({
      params: { page: String(++page) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const page = parseInt(ctx.params?.page as string);

  return {
    props: {
      data: await api.Episodes({ page }),
      page,
    },
  };
};

export default EpisodesPage;
