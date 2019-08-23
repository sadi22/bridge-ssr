/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import Container from 'react-bootstrap/Container'

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

    return { categories };
  }

  render() {
    const { categories, posts, headerMenu, logo, footerMenu } = this.props;
    if (categories.length === 0) return <Error statusCode={404} />;

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
      <Container>
        <Layout>
          <Menu menu={headerMenu} logo={logo}/>

          <h1>{categories[0].name} Posts</h1>
          {fposts}
          <Footer logo={logo} menu={footerMenu}/>
        </Layout>
      </Container>
    );
  }
}

export default PageWrapper(Category);
