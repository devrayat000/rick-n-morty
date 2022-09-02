import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";

import rqClient from "~/modules/rq-client";

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={rqClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default ExampleApp;
