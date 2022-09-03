import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import {
  Box,
  Container,
  Group,
  Paper,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconDots } from "@tabler/icons";

import ExpisodeCard from "~/components/episode/EpisodeCard";
import api from "~/secvices/api";

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  episodes,
  characters,
  locations,
}) => {
  return (
    <Container>
      <Head>
        <title>Rock n Morty</title>
        <meta name="description" content="Morty & Rick Database" />
      </Head>

      <Text component="p" size="xl" weight={600} my="0">
        Welcome To
      </Text>
      <Title order={1}>Morty n Rick</Title>

      <Box mt="xl">
        <Title order={2}>Episodes</Title>
        <ScrollArea mt="md" offsetScrollbars style={{ width: "100%" }}>
          <Group sx={{ width: "max-content" }} align="stretch">
            {episodes?.results?.map((episode) => (
              <ExpisodeCard key={episode?.id} episode={episode} />
            ))}
            <Paper
              withBorder
              radius="md"
              p="md"
              component={NextLink}
              href="/episodes"
              color="blue"
            >
              <Text component="p" size="xl" weight={600}>
                See More
                <IconDots />
              </Text>
            </Paper>
          </Group>
        </ScrollArea>
      </Box>
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
