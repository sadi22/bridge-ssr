import React from 'react'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head';
import AOS from 'aos';
import { TransitionGroup, CSSTransition } from "react-transition-group";

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  componentDidMount() {
    AOS.init()
  }

  render () {
    const { Component, pageProps, router } = this.props
    return (
      <>
        <Head>
          <title>Bridge</title>
        </Head>

        <TransitionGroup className="page-transitions">
          <CSSTransition
              key={router.asPath}
              timeout={200}
              classNames="bridge-contents"
            >
              <Component {...pageProps} key={router.route} />
            </CSSTransition>
        </TransitionGroup>
        <style jsx global>{`
          .bridge-contents-enter {
            display: none;
            opacity: 0;
          }
          .bridge-contents-enter-active {
            opacity: 1;
            transition: opacity 200ms;
          }
          .bridge-contents-exit {
            display: none;
            opacity: 0;
            position: static;
          }
          .bridge-contents-exit-active {
            display: none;
            opacity: 0;
            transition: opacity 200ms;
          }

        `}</style>
      
      </>
    )
  }
}