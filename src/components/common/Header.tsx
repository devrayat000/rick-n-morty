import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
  Button,
  Stack,
  Overlay,
  Drawer,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    top: "calc(var(--mantine-header-height) + 16px)",
    left: 0,
    right: 0,
    bottom: "unset",
    width: "auto",
    marginRight: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

interface HeaderResponsiveProps {
  links?: { link: string; label: string }[];
}

const DEFAULT_LINKS: HeaderResponsiveProps["links"] = [
  {
    label: "Episodes",
    link: "/episode",
  },
  {
    label: "Characters",
    link: "/character",
  },
  {
    label: "Locations",
    link: "/location",
  },
];

export default function MyHeader({
  links = DEFAULT_LINKS,
}: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const router = useRouter();

  const items = links?.map((link) => (
    <Button
      key={link.label}
      component={NextLink}
      size="sm"
      href={link.link}
      variant={router.pathname.includes(link.link) ? "light" : "subtle"}
      color={router.pathname.includes(link.link) ? undefined : "gray"}
    >
      {link.label}
    </Button>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Anchor
          size="xl"
          variant="text"
          weight={900}
          component={NextLink}
          href="/"
        >
          R&M
        </Anchor>
        <Group key="links" spacing="md" className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          aria-label="Navigation Menu"
        />

        <Drawer
          padding="md"
          opened={opened}
          onClose={close}
          classNames={{ drawer: classes.dropdown }}
          overlayBlur={3}
          closeOnEscape
          shadow="sm"
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </Header>
  );
}
