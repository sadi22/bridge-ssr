import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {  
  render() {
    // make the environment available on the client
    return (
      <html lang="en">
        <Head>
         
          <link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple-icon-57x57.png"></link>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple-icon-60x60.png"></link>
          <link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple-icon-72x72.png"></link>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple-icon-76x76.png"></link>
          <link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple-icon-114x114.png"></link>
          <link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120x120.png"></link>
          <link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple-icon-144x144.png"></link>
          <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152x152.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png"></link>
          <link rel="icon" type="image/png" sizes="192x192"  href="/static/icons/android-icon-192x192.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png"></link>
          <link rel="manifest" href="/static/icons/manifest.json"></link>
          <meta name="msapplication-TileColor" content="#ffffff"></meta>
          <meta name="msapplication-TileImage" content="/static/icons/ms-icon-144x144.png"></meta>
          <meta name="theme-color" content="#ffffff"></meta>

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />


          <meta name="og:title" content="Bridge"/>
          <meta name="og:type" content="article"/>
          <meta name="og:url" content="https://bridgssrelive.wpengine.com/wp-content/uploads/2019/08/site-logo.png"/>
          <meta name="og:image" content="https://bridgssrelive.wpengine.com/wp-content/uploads/2019/08/site-logo.png"/>
          <meta name="og:site_name" content="Bridge"/>
          <meta name="og:description" content="Bridge"/>
        
          
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
