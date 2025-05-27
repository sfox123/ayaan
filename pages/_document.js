import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://use.typekit.net/jgh1rza.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Goldman:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
