import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";

import rqClient from "~/modules/rq-client";
import MyHeader from "~/components/common/Header";
import { RouterTransition } from "~/components/common/RouterTransition";
import Seo from "~/components/common/Seo";

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={{
        components: {
          Progress: {
            defaultProps: {
              "aria-label": "Progress",
            },
          },
        },
      }}
    >
      <Seo />
      <AppShell header={<MyHeader />} fixed={false}>
        <RouterTransition />
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
