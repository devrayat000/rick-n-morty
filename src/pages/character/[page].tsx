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

import CharacterCard from "~/components/character/CharacterCard";

function getCharactersByPage(page: number | string) {
  return import("~/secvices/api").then((m) =>
    m.default.Characters({ page: page as number })
  );
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CharactersPage: NextPage<Props> = ({ page }) => {
  const { data, isFetching } = useQuery(["characters", page], ({ queryKey }) =>
    getCharactersByPage(queryKey[1])
  );
  const router = useRouter();

  if (isFetching || router.isFallback) {
    return <LoadingOverlay visible />;
  }

  return (
    <Container>
      <Title order={1} align="center">
        Characters
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
        {data?.characters?.results?.map((character) => (
          <CharacterCard key={character?.id} character={character} />
        ))}
      </SimpleGrid>

      <Group position="center">
        <Pagination
          mt="xl"
          page={page}
          onChange={(page) =>
            router.push("/character/[page]", `/character/${page}`)
          }
          total={data?.characters?.info?.pages ?? 0}
        />
      </Group>
    </Container>
  );
};

export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
  const { default: api } = await import("~/secvices/api");
  const { characters } = await api.CharacterPages();

  return {
    paths: Array.from(new Array(characters?.info?.pages).keys()).map(
      (page) => ({
        params: { page: String(++page) },
      })
    ),
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

  await rqClient.prefetchQuery(["characters", page], ({ queryKey }) =>
    api.Characters({ page: queryKey[1] as number })
  );

  return {
    props: {
      dehydratedState: dehydrate(rqClient),
      page,
    },
  };
};

export default CharactersPage;
