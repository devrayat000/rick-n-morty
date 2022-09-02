import type { AppProps } from "next/app";
import {
  Anchor,
  AppShell,
  Button,
  Group,
  Header,
  MantineProvider,
  Title,
} from "@mantine/core";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";

import rqClient from "~/modules/rq-client";
import { NextLink } from "@mantine/next";
import MyHeader from "~/components/common/Header";

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables>
      <AppShell header={<MyHeader />} fixed={false}>
        <QueryClientProvider client={rqClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </AppShell>
    </MantineProvider>
  );
}

export default ExampleApp;
