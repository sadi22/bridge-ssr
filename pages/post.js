import React, { Component } from 'react';
import Error from 'next/error';
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
    const { post, headerMenu, logo, footerMenu } = this.props;
    if (!post.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Container>
          <Menu menu={headerMenu} logo={logo}/>
          <h1>{post.title.rendered}</h1>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
          <Footer logo={logo} menu={footerMenu}/>
        </Container>
      </Layout>
    );
  }
}

export default PageWrapper(Post);
