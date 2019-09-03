import React, { Component,Fragment } from 'react';
import Error from 'next/error';
import Head from 'next/head';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Config from '../config';
import Footer from "../components/Footer/index";
import Container from 'react-bootstrap/Container'
const wp = new WPAPI({ endpoint: Config.apiUrl });

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    let apiMethod = wp.posts();

    switch (apiRoute) {
      case 'category':
        apiMethod = wp.categories();
        break;
      case 'page':
        apiMethod = wp.pages();
        break;
      default:
        break;
    }

    const post = await apiMethod
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });

    return { post };
  }

  render() {
    const { headerMenu, post, logo, social, footer_text, footerMenu, getting_started_link, gmap_api } = this.props;
    if (!post.title) return <Error statusCode={404} />;
    let seo_title = post.title.rendered;
    let seo_description = post.title.rendered;
    let seo_canonical = post.link;
    if(post.yoast_meta) {
      seo_title = post.yoast_meta.yoast_wpseo_title;
      seo_description = post.yoast_meta.yoast_wpseo_metadesc;
      seo_canonical = post.yoast_meta.yoast_wpseo_canonical;
    }
    if (!post.title) return <Error statusCode={404} />;
    let {featured_image} = post;
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
          <Container>
            <Menu menu={headerMenu} logo={logo} getting_started_link ={getting_started_link}/>
            <article id={post.id} style={{paddingTop: '108px'}}>
              <header>
                <h1>{post.title.rendered}</h1>
              </header>
              <div className='featured-image' style={{paddingTop: '30px'}}>
                <img src={featured_image ? featured_image.source_url : 'https://via.placeholder.com/1024x400'} alt={featured_image ? featured_image.alt_text : ''} alt={featured_image ? featured_image.alt_text : ''} title={featured_image ? featured_image.media_details.image_meta.title : ''} className="img-fluid" />
              </div>
              <div className="entry-content" style={{paddingTop: '30px'}}>
                
                <div
                // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: post.content.rendered,
                    }}
                />

              </div>
            </article>
            <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
          </Container>
        </Layout>
      </Fragment>
    );
  }
}

export default PageWrapper(Post);
