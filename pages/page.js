import React, { Component, Fragment } from 'react';
import Error from 'next/error';
import Head from 'next/head';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Config from '../config';
import Footer from "../components/Footer/index";
import Container from 'react-bootstrap/Container'
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
    const { headerMenu, page, logo, social, footer_text, footerMenu } = this.props;
    if (!page.title) return <Error statusCode={404} />;

    return (
      <Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <title>{page.title.rendered}</title>
        </Head>
        <Layout>
            <Menu menu={headerMenu} logo={logo}/>
            <ACFCONTENT {...page}/>
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
