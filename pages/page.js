import React, { Component, Fragment } from 'react';
import Error from 'next/error';
import Head from 'next/head';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Config from '../config';
import Footer from "../components/Footer/index";
import ACFCONTENT from '../components/AcfContent';

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    let apiMethod = wp.pages();
    const page = await apiMethod
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });

    return { page };
  }

  render() {
    const { headerMenu, page, logo, social, footer_text, footerMenu, getting_started_link, gmap_api } = this.props;
    if (!page.title) return <Error statusCode={404} />;
    let seo_title = page.title.rendered;
    let seo_description = page.title.rendered;
    let seo_canonical = page.link;
    if(page.yoast_meta) {
      seo_title = page.yoast_meta.yoast_wpseo_title;
      seo_description = page.yoast_meta.yoast_wpseo_metadesc;
      seo_canonical = page.yoast_meta.yoast_wpseo_canonical;
    }

    return (
      <Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <title>{seo_title}</title>
            <meta name="og:title" content={seo_title}/>
            <meta name="og:type" content="article"/>
            <meta name="og:url" content={seo_canonical}/>
            <meta name="og:image" content="https://bridgssrelive.wpengine.com/wp-content/uploads/2019/08/site-logo.png"/>
            <meta name="og:site_name" content="Bridge"/>
            <meta name="og:description" content={seo_description}/>
        </Head>
        <Layout>
            <Menu menu={headerMenu} logo={logo} getting_started_link ={getting_started_link}/>
            <ACFCONTENT {...page} gmap_api={gmap_api}/>
            <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: page.content.rendered,
                }}
            />
            <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
        </Layout>
      </Fragment>
    );
  }
}

export default PageWrapper(Post);
