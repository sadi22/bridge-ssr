import React from 'react'
import App from 'next/app'
// import { PageTransition } from 'next-page-transitions'
import MorphTransition from 'nextjs-morph-page';
import Head from 'next/head';
import AOS from 'aos';
import Loader from '../components/Loader'

const TIMEOUT = 0

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
        
        <MorphTransition timeout={50} classNames="morph">
          <Component {...pageProps} />
        </MorphTransition>
        <style jsx global>{`
          .morph.enter {
            opacity: 0;
          }
          .morph.enter.active {
            opacity: 1;
          }
          .morph.exit {
            opacity: 1;
          }
          .morph.exit.active {
            opacity: 0;
            transition: opacity 300ms;
          }
          .morph.exit.active .bottom-cta,
          .morph.enter.active .bottom-cta {
            display: none;
          }
         
        `}</style>
      
      </>
    )
  }
}