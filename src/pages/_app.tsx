import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";

import MyHeader from "~/components/common/Header";
import { RouterTransition } from "~/components/common/RouterTransition";
import Seo from "~/components/common/Seo";
import Script from "next/script";

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
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
        `}
      </Script> */}
    </MantineProvider>
  );
}

export default ExampleApp;
