import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          <meta name="HandheldFriendly" content="true" />
          <meta name="MobileOptimized" content="640" />
          
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}