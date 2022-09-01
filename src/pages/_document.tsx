// src/pages/_document.tsx
import { createRelayDocument, RelayDocument } from "relay-nextjs/document";
import NextDocument, {
  Html,
  Head,
  DocumentContext,
  Main,
  NextScript,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";

interface DocumentProps {
  relayDocument: RelayDocument;
}

const stylesServer = createStylesServer();

class ExampleDocument extends NextDocument<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const relayDocument = createRelayDocument();

    const renderPage = ctx.renderPage;
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => relayDocument.enhance(App),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      relayDocument,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render() {
    const { relayDocument } = this.props;

    return (
      <Html>
        <Head>
          <relayDocument.Script />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExampleDocument;
