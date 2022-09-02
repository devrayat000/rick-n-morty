import { Card, Skeleton, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";

import type { Episode, Maybe } from "~/graphql/generated";

export type EpisodeCardProps = {
  episode: Maybe<Omit<Episode, "characters">>;
};

const ExpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Skeleton height={80} radius="md" />;
  }

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
