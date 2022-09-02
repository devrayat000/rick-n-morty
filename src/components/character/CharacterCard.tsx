import { Card, Image, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";

import type { EpisodeByIdQuery } from "~/graphql/generated";

export type CharacterCardProps = {
  character: Exclude<
    Exclude<EpisodeByIdQuery, null | undefined>["episode"],
    null | undefined
  >["characters"][number];
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card
      component={NextLink}
      href="/character/details/[id]"
      as={`/character/details/${character?.id}`}
    >
      <Card.Section>
        <Image
          src={character?.image!}
          alt={character?.name!}
          caption={
            <Text weight={600} size="lg" component="p">
              {character?.name}
            </Text>
          }
        />
      </Card.Section>
    </Card>
  );
};

export default CharacterCard;
