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

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
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
  const { classes, cx } = useStyles();
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
        <Title order={3}>R&M</Title>
        <Group key="links" spacing="md" className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Drawer
          padding="md"
          opened={opened}
          onClose={close}
          classNames={{ drawer: classes.dropdown }}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </Header>
  );
}
