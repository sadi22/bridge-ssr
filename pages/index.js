import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import Head from 'next/head';
import Router from 'next/router';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import ACFCONTENT from '../components/AcfContent';

import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Footer from '../components/Footer/index';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });
class Index extends Component {
    state = {
        id: '',
    };

    static async getInitialProps() {
        try {
            const [page, posts, pages] = await Promise.all([
                wp
                    .pages()
                    .slug('home')
                    .embed()
                    .then(data => {
                        return data[0];
                    }),
                wp.posts().embed(),
                wp.pages().embed(),
            ]);

            return { page, posts, pages };
        } catch (err) {
            console.log(err);
        }
        return null;
    }


    render() {
        const { headerMenu, page, logo, social, footer_text, footerMenu, getting_started_link, gmap_api } = this.props;
        let seo_title = page.title.rendered;
        let seo_description = page.title.rendered;
        let seo_canonical = page.link;
        if(page.yoast_meta) {
            seo_title = page.yoast_meta.yoast_wpseo_title;
            seo_description = page.yoast_meta.yoast_wpseo_metadesc;
            seo_canonical = page.yoast_meta.yoast_wpseo_canonical;
        }
        console.log( this.props);
        return (
            <Fragment>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <title>{seo_title}</title>
                    <meta name="description" content={seo_description}></meta>
                    <meta name="og:title" content={seo_title}></meta>
                    <meta name="og:description" content={seo_description}></meta>
                </Head>
                <Layout>
                    <Menu menu={headerMenu} logo={logo} getting_started_link={getting_started_link}/>
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

export default PageWrapper(Index);