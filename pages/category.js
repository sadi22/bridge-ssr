/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import SinglePost from '../components/SinglePost';
import {Container, Row, Pagination} from 'react-bootstrap';

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Header/index';
import Config from '../config';
import Footer from "../components/Footer/index";


const wp = new WPAPI({ endpoint: Config.apiUrl });

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;

    const categories = await wp
      .categories()
      .slug(slug)
      .embed();

    if (categories.length > 0) {
      const posts = await wp
        .posts()
        .category(categories[0].id)
        .embed();
      return { categories, posts };
    }

    return { categories, posts };
  }

  render() {
    const { categories, headerMenu, page, posts, logo, social, footer_text, footerMenu, getting_started_link, gmap_api, total_posts, page_number } = this.props;
    if (categories.length === 0) return <Error statusCode={404} />;
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
    const fposts = posts.map(post => {
      return (
        <ul key={post.slug}>
          <li>
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Fragment>
          <Menu menu={headerMenu} logo={logo} getting_started_link={getting_started_link}/>
          <Container style={{paddingTop: '108px'}}>
              <Row className="justify-content-md-center">
                  {posts.map(function(name, index){
                      return <SinglePost key={index} {...name}/>
                  })}
                 
              </Row>
              
          </Container>
          
          <Footer menu={footerMenu} logo={logo} social={social} footer_text={footer_text}/>
      </Fragment>
    );
  }
}

export default PageWrapper(Category);
