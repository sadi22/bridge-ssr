import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {  
  render() {
    // make the environment available on the client
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <link href="/static/styles/lib/bootstrap.min.css" rel="stylesheet" />
          <link href="/static/styles/lib/gutenberg.min.css" rel="stylesheet" />
          <link href="/static/styles/lib/npProgress.css" rel="stylesheet" />
          <link href="/static/styles/style.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }

}
