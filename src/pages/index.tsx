import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Container, Text, Title } from "@mantine/core";

import ExpisodeCard from "~/components/episode/EpisodeCard";
import api from "~/secvices/api";
import Items from "~/components/home/Items";
import CharacterCard from "~/components/character/CharacterCard";

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  episodes,
  characters,
  locations,
}) => {
  return (
    <Container>
      <Head>
        <title>Rick n Morty</title>
        <meta
          name="description"
          content="Rick n Morty Database is a free website where you can find every information about episodes, characters and locations (coming soon)"
        />
      </Head>

      <Text component="p" size="xl" weight={600} my="0">
        Welcome To
      </Text>
      <Title order={1}>Morty n Rick</Title>

      <Items title="Episodes" link="/episode">
        {episodes?.results?.map((episode) => (
          <ExpisodeCard key={episode?.id} episode={episode} />
        ))}
      </Items>
      <Items title="Characters" link="/character">
        {characters?.results?.map((character) => (
          <CharacterCard key={character?.id} character={character} />
        ))}
      </Items>
      {/* <Items title="Episodes" link="/episodes">
        {episodes?.results?.map((episode) => (
          <ExpisodeCard key={episode?.id} episode={episode} />
        ))}
      </Items> */}
    </Container>
  );
};

export default HomePage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: await api.Everything(),
    revalidate: 86400 * 7, // 7 days
  };
};
