import React, {Fragment} from 'react'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";


Router.events.on('routeChangeStart', url => {
    let pages = ['/', '/retailer', '/supplier', '/wholesaler'];
    if (!pages.includes(url)) {
      NProgress.start();
    }
    
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


  render () {
    const { Component, pageProps, router } = this.props;
    let pages = ['/', '/retailer', '/supplier', '/wholesaler'];
    const spring = {
      type: "spring",
      damping: 20,
      stiffness: 100,
      when: "afterChildren"
    };
    return (
      <Fragment>
        <Head>
          <title>Bridge</title>
        </Head>
        <AnimatePresence>
          <div className="page-transition-wrapper">
            <motion.div
              transition={spring}
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="page-transition-container"
            >
              <Component {...pageProps} key={router.asPath} path={router.query}/>
            </motion.div>
          </div>
        </AnimatePresence>
        
        
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
      
      </Fragment>
    )
  }
}