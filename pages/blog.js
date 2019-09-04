import React, {Component, Fragment} from 'react';
import Head from 'next/head';
import Error from 'next/error';

import WPAPI from 'wpapi';
import {Container, Row, Pagination} from 'react-bootstrap';
import Link from 'next/link';

import SinglePost from '../components/SinglePost';

import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Footer from '../components/Footer/index';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });
wp.total_posts = wp.registerRoute('bridge/v1', '/total_posts');

class Index extends Component {
    state = {
        id: '',
    };

    static async getInitialProps(context) {
        const { pageno, apiRoute } = context.query;
        let page_number = pageno ? pageno : 1;
        try {
            const [page, posts, pages, total_posts] = await Promise.all([
                wp
                    .pages()
                    .slug('blog')
                    .embed()
                    .then(data => {
                        return data[0];
                    }),
                wp.posts().perPage(10).page(page_number),
                wp.pages().embed(),
                wp.total_posts()
            ]);
            return { page, posts, pages, total_posts, page_number };
        } catch (err) {
            console.log(err);
        }
        return null;
    }


    render() {
        const { headerMenu, page, posts, logo, social, footer_text, footerMenu, getting_started_link, gmap_api, total_posts, page_number } = this.props;
        if (!posts) return <Error statusCode={404} />;
        let seo_title = page.title.rendered;
        let seo_description = page.title.rendered;
        let seo_canonical = page.link;
        if(page.yoast_meta) {
            seo_title = page.yoast_meta.yoast_wpseo_title;
            seo_description = page.yoast_meta.yoast_wpseo_metadesc;
            seo_canonical = page.yoast_meta.yoast_wpseo_canonical;
        }        
        let active = page_number;
        let items = [];
        for (let number = 1; number <= Math.ceil(total_posts/10); number++) {
            items.push(
                <Link
                    as={`/blog/${number}`}
                    href={`/blog?pageno=${number}&apiRoute=blog`}
                    key={number}
                >
                    <Pagination.Item key={number} active={number == active} href={`/${number}`}>{number}</Pagination.Item>
                </Link>
                
            );
        }
        console.log('%cMade at %cBridge', 'font-weight: bolder;', ' font-weight: bolder; color: #1FC8C9;');

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
                <Menu menu={headerMenu} logo={logo} getting_started_link={getting_started_link}/>
                <Container style={{paddingTop: '108px'}}>
                    <Row className="justify-content-md-center">
                        {posts.map(function(name, index){
                            return <SinglePost key={index} {...name}/>
                        })}
                        <div className='pagination-wrapper' style={{margin: '10px'}}>
                            
                            <Pagination size="lg">
                                <Link
                                    as={`/blog/${page_number ? (page_number=='1' ? '1' : parseInt(page_number)-1) : 1}`}
                                    href={`/blog?pageno=${page_number ? (page_number=='1' ? '1' : parseInt(page_number)-1) : 1}&apiRoute=blog`}
                                >
                                    <Pagination.Prev 
                                        href={`/${page_number ? (page_number=='1' ? '1' : parseInt(page_number)-1) : 1}`}
                                        disabled={ page_number == 1 }
                                    />
                                </Link>
                                
                                {items}
                                <Link
                                    as={`/blog/${page_number ? (page_number=='1' ? '1' : parseInt(page_number)+1) : 1}`}
                                    href={`/blog?pageno=${page_number ? (page_number=='1' ? '1' : parseInt(page_number)+1) : 1}&apiRoute=blog`}
                                >
                                    <Pagination.Next 
                                        href={`/${page_number ? (page_number>=Math.ceil(total_posts/10) ? '' : parseInt(page_number)+1) : 1}`}
                                        disabled={ page_number >= Math.ceil(total_posts/10) }
                                    />
                                </Link>
                            </Pagination>
                            
                        </div>
                    </Row>
                    
                </Container>
               
                <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
            </Fragment>
        );
    }
}

export default PageWrapper(Index);