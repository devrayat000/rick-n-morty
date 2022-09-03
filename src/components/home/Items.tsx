import type { UrlObject } from "node:url";
import {
  ActionIcon,
  Box,
  Group,
  Paper,
  ScrollArea,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconCaretRight, IconDots } from "@tabler/icons";

export type ItemsProps = {
  title: string;
  link: UrlObject | string;
  children: React.ReactFragment | undefined;
};

const Items: React.FC<ItemsProps> = ({ title, children, link }) => {
  return (
    <Box mt="xl">
      <Group position="apart">
        <Title order={2}>{title}</Title>
        <ActionIcon component={NextLink} href={link}>
          <IconCaretRight />
        </ActionIcon>
      </Group>
      <ScrollArea mt="md" offsetScrollbars style={{ width: "100%" }}>
        <Group sx={{ width: "max-content" }} align="stretch">
          {children}
          <Paper
            withBorder
            radius="md"
            p="md"
            component={NextLink}
            href={link}
            color="blue"
            sx={{ display: "grid", placeItems: "center" }}
          >
            <Text size="xl" color="blue" weight={600} align="center">
              See More
              <br />
              <ThemeIcon radius="xl" size="lg" variant="outline">
                <IconDots />
              </ThemeIcon>
            </Text>
          </Paper>
        </Group>
      </ScrollArea>
    </Box>
  );
};

export default Items;
