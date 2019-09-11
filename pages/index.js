import React, {Component, Fragment} from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ACFCONTENT from '../components/AcfContent';
import Error from './_error';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Footer from '../components/Footer/index';
import { getPostBySlug } from '../api/api';
import fetch from 'node-fetch';


class Index extends Component {
    static async getInitialProps() {
        try {
            const page = await getPostBySlug('home').then(data=>{return data[0]});
            return { page };
        } catch (err) {
            console.log(err);
            return err;
        }
    }


    render() {
        const { headerMenu, page, logo, social, footer_text, footerMenu, getting_started_link, gmap_api } = this.props;
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
                    <meta name="og:title" content={seo_title}/>
                    <meta name="og:type" content="article"/>
                    <meta name="og:url" content={seo_canonical}/>
                    <meta name="og:image" content="https://bridgssrelive.wpengine.com/wp-content/uploads/2019/08/site-logo.png"/>
                    <meta name="og:site_name" content="Bridge"/>
                    <meta name="og:description" content={seo_description}/>
                </Head>
                <Layout>
                    <Menu menu={headerMenu} logo={logo} getting_started_link={getting_started_link}/>
                    <ACFCONTENT {...page} gmap_api={gmap_api}/>
                    <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
                </Layout>
            </Fragment>
        );
    }
}

export default PageWrapper(Index);

