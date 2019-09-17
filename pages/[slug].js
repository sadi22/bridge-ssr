import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import Error from './_error';
import Head from 'next/head';
import { getPostBySlug } from '../api/api';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Footer from "../components/Footer/index";
import ACFCONTENT from '../components/AcfContent';

class Page extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    try {
      const page = await getPostBySlug(slug)
        .then(data =>{
          return data[0]
        });
      return { page };
    } catch (err) {
        console.log(err);
        return err;
    }
  }

  
  render () {
    const { headerMenu, page, logo, social, footer_text, footerMenu, getting_started_link, gmap_api } = this.props;
//    console.log('%cMade at %cBridge', 'font-weight: bolder;', ' font-weight: bolder; color: #1FC8C9;');
    if (!page) return <Error statusCode={404} />;
    let seo_title = page.title.rendered;
    let seo_description = page.title.rendered;
    let seo_canonical = page.link;
    if(page.yoast_meta_rest) {
      seo_title = page.yoast_meta_rest.yoast_wpseo_title;
      seo_description = page.yoast_meta_rest.yoast_wpseo_metadesc;
      seo_canonical = page.yoast_meta_rest.yoast_wpseo_canonical;
    }

    return (
      <Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <title>{seo_title}</title>
            {page.yoast_meta && page.yoast_meta.map(meta=>{
                return (
                    <Fragment>
                        {meta.name && <meta name={meta.name} content={meta.content}/>}
                        {meta.property && (<meta property={meta.property} content={meta.content}/>)}
                    </Fragment>
                    
                )
                
            })}
        </Head>
        <Layout>
            <Menu menu={headerMenu} logo={logo} getting_started_link ={getting_started_link}/>
            <ACFCONTENT {...page} gmap_api={gmap_api}/>
            <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
        </Layout>
      </Fragment>
    )
  }
}

Page.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func
}

Page.defaultProps = {
  pageTransitionReadyToEnter: () => {}
}

export default PageWrapper(Page)