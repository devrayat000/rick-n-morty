import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";

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
      <RouterTransition />
      <AppShell header={<MyHeader />} fixed={false}>
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}

export default ExampleApp;
