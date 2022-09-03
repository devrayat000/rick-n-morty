import { Container, Group, Pagination, SimpleGrid, Title } from "@mantine/core";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import CharacterCard from "~/components/character/CharacterCard";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CharactersPage: NextPage<Props> = ({ page, data }) => {
  const router = useRouter();

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
  const { default: api } = await import("~/secvices/fetch");
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
  const { default: api } = await import("~/secvices/fetch");
  const page = parseInt(ctx.params?.page as string);

  return {
    props: {
      data: await api.Characters({ page }),
      page,
    },
  };
};

export default CharactersPage;
