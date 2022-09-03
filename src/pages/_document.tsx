// src/pages/_document.tsx
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

class ExampleDocument extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExampleDocument;
