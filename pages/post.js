import React, { Component,Fragment } from 'react';
import Error from 'next/error';
import Head from 'next/head';
import WPAPI from 'wpapi';
import Link from 'next/link';

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Config from '../config';
import Footer from "../components/Footer/index";
import {Container, Form, Button} from 'react-bootstrap'
const wp = new WPAPI({ endpoint: Config.apiUrl });


function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


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
        <Layout style={{marginTop: '108px'}}>
          <Container>
            <Menu menu={headerMenu} logo={logo} getting_started_link ={getting_started_link}/>
            <article id={post.id} style={{paddingTop: '108px'}}>
              <header>
                <h1>{post.title.rendered}</h1>
              </header>
              <div className='post-meta'>
                  <ul className='d-inline'>
                      <li>
                          <span itemProp="name">By: <span itemProp="author" itemScope="" itemType="http://schema.org/Person">{post.author_name}</span></span>
                      </li>
                      <li>
                          <time className="entry-date published updated" dateTime={post.date_gmt} itemProp="datePublished" pubdate={post.date_gmt}>{formatDate(new Date(post.date_gmt))}</time>
                      </li>

                      <li>
                          {Object.keys(post.category_info).map((item,i) => 
                              <Link
                                  as={`/category/${post.category_info[item].term_slug}`}
                                  href={`/category?slug=${post.category_info[item].term_slug}&apiRoute=post`}
                                  key={item}
                              >
                                  <a>{post.category_info[item].term_name}</a>
                              </Link>
                          )}
                      </li>
                  </ul>
              </div>
              <div className='featured-image' style={{paddingTop: '30px'}}>
                <img src={featured_image ? featured_image.source_url : 'https://via.placeholder.com/1024x400'} alt={featured_image ? featured_image.alt_text : ''} alt={featured_image ? featured_image.alt_text : ''} title={featured_image ? featured_image.media_details.image_meta.title : ''} className="img-fluid" />
              </div>
              <div className="post-content" style={{paddingTop: '30px'}}>
                
                <div
                // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: post.content.rendered,
                    }}
                />

              </div>
            </article>
            <div className="comment-form">
              <Form>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Control as="textarea" rows="5" placeholder="Write your comment"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                
                <Button variant="primary" type="submit" className='btn-default'>
                  Submit
                </Button>
              </Form>
            </div>
            
            <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
          </Container>
        </Layout>
      </Fragment>
    );
  }
}

export default PageWrapper(Post);
