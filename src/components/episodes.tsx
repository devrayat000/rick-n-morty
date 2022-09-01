import { Card, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { usePreloadedQuery } from "react-relay";
import { RelayProps } from "relay-nextjs";
import { graphql } from "relay-runtime";
import { episodes_EpisodesQuery } from "~/queries/__generated__/episodes_EpisodesQuery.graphql";

export const EpisodesQuery = graphql`
  query episodes_EpisodesQuery {
    episodes {
      info {
        count
      }
      results {
        id
        name
        created
      }
    }
  }
`;

const Expisodes: React.FC<RelayProps<{}, episodes_EpisodesQuery>> = ({
  preloadedQuery,
}) => {
  const query = usePreloadedQuery(EpisodesQuery, preloadedQuery);

  return (
    <SimpleGrid cols={3}>
      {query.episodes?.results?.map((episode: any) => (
        <Card key={episode?.id}>
          <Text>{episode?.name}</Text>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Expisodes;
