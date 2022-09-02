import { Box, Card, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/future/image";

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
      prefetch={false}
      href="/character/details/[id]"
      as={`/character/details/${character?.id}`}
    >
      <Card.Section>
        <Box
          className="mantine-Image-root"
          sx={{ width: "100%", height: "auto" }}
        >
          <Box component="figure" m={0} className="mantine-Image-figure">
            <Box
              className="mantine-Image-ImageWrapper"
              sx={{ position: "relative", aspectRatio: "1/1" }}
            >
              <Image
                src={character?.image!}
                alt={character?.name!}
                fill
                className="mantine-Image-Image"
              />
            </Box>
            <Text
              size="md"
              component="figcaption"
              mt="sm"
              color="dark"
              className="mantine-Image-caption"
              align="center"
            >
              {character?.name}
            </Text>
          </Box>
        </Box>
      </Card.Section>
    </Card>
  );
};

export default CharacterCard;
