import { Card, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";

import type { Episode, Maybe } from "~/graphql/generated";

export type EpisodeCardProps = {
  episode: Maybe<Omit<Episode, "characters">>;
};

const ExpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <Card
      withBorder
      radius="md"
      component={NextLink}
      href="/episode/details/[id]"
      as={`/episode/details/${episode?.id}`}
    >
      <Text weight={500}>{episode?.episode}</Text>
      <Text weight={700}>{episode?.name}</Text>
    </Card>
  );
};

export default ExpisodeCard;
