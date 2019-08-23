import React, {Component, Fragment} from 'react';
// import Link from 'next/link';
// import dynamic from 'next/dynamic'
// import Head from 'next/head';
// import Router from 'next/router';
import WPAPI from 'wpapi';
// import Layout from '../components/Layout';

// import PageWrapper from '../components/PageWrapper';
// import Menu from '../components/Header/index';
// import Footer from '../components/Footer/index';
// import Config from '../config';

// const wp = new WPAPI({ endpoint: Config.apiUrl });

// const Banner = dynamic(() => import('../components/Banner/index'));
// const BottomCTA = dynamic(() => import('../components/BottomCTA/index'));
// const DriveSaleCTA = dynamic(() => import('../components/DriveSaleCTA/index'));
// const DriveSales = dynamic(() => import('../components/DriveSales/index'));
// const RetailEcommerce = dynamic(() => import('../components/RetailEcommerce/index'));
// const SeamlessEcommerce = dynamic(() => import('../components/SeamlessEcommerce/index'));


// const tokenExpired = () => {
//   if (process.browser) {
//     localStorage.removeItem(Config.AUTH_TOKEN);
//   }
//   wp.setHeaders('Authorization', '');
//   Router.push('/login');
// };

// class Index extends Component {
//   state = {
//     id: '',
//   };

//   static async getInitialProps() {
//     try {
//       const [page, posts, pages] = await Promise.all([
//         wp
//           .pages()
//           .slug('home')
//           .embed()
//           .then(data => {
//             return data[0];
//           }),
//         wp.posts().embed(),
//         wp.pages().embed(),
//       ]);

//       return { page, posts, pages };
//     } catch (err) {
//       if (err.data.status === 403) {
//         tokenExpired();
//       }
//     }
//     return null;
//   }


//   render() {
//     const { id } = this.state;
//     const { posts, pages, headerMenu, page, logo, footerMenu } = this.props;
//     const {acf} = page;
//     const fposts = posts.map(post => {
//       return (
//         <ul key={post.slug}>
//           <li>
//             <Link
//               as={`/post/${post.slug}`}
//               href={`/post?slug=${post.slug}&apiRoute=post`}
//             >
//               <a>{post.title.rendered}</a>
//             </Link>
//           </li>
//         </ul>
//       );
//     });
//     const fpages = pages.map(ipage => {
//       return (
//         <ul key={ipage.slug}>
//           <li>
//             <Link
//               as={`/page/${ipage.slug}`}
//               href={`/post?slug=${ipage.slug}&apiRoute=page`}
//             >
//               <a>{ipage.title.rendered}</a>
//             </Link>
//           </li>
//         </ul>
//       );
//     });

//     const Section = acf.sections.map(section => {
//         return (
//             <Fragment key={section.acf_fc_layout}>
//                 {section.acf_fc_layout === 'banner' ? <Banner {...section}/> : ''}
//                 {section.acf_fc_layout === 'title_and_two_image_columns' ? <SeamlessEcommerce {...section}/> : ''}
//                 {section.acf_fc_layout === 'feature_box_with_column' ? <DriveSales {...section}/> : ''}
//                 {section.acf_fc_layout === 'bottom_cta' ? <BottomCTA {...section}/> : ''}
//             </Fragment>

//         );
//     });

//     return (
//         <Fragment>
//             <Head>
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />
//                 <meta charSet="utf-8" />
//                 <title>{page.title.rendered}</title>
//             </Head>
//             <Layout>
//                 <Menu menu={headerMenu} logo={logo}/>
//                 {Section}
//                 <div
//                     // eslint-disable-next-line react/no-danger
//                     dangerouslySetInnerHTML={{
//                         __html: page.content.rendered,
//                     }}
//                 />
//                 <Footer menu={footerMenu} logo={logo}/>
//             </Layout>
//         </Fragment>
//     );
//   }
// }

// export default PageWrapper(Index);



class Index extends Component {
  render() {
    console.log(wp.posts().embed());
    return <p>Hello World</p>
  }
}
export default Index;
