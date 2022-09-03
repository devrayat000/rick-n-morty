import { Card, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";

import type { Episode, Maybe } from "~/graphql/generic";

export type EpisodeCardProps = {
  episode: Maybe<Omit<Episode, "characters">>;
};

const ExpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <Card
      withBorder
      radius="md"
      component={NextLink}
      prefetch={false}
      href="/episode/details/[id]"
      as={`/episode/details/${episode?.id}`}
      // sx={{ flex: "1 1 0px" }}
    >
      <Text weight={500}>{episode?.episode}</Text>
      <Text weight={700}>{episode?.name}</Text>
    </Card>
  );
};

export default ExpisodeCard;
