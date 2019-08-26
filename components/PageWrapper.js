import React from 'react';
import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');
wp.site_logo = wp.registerRoute('bridge/v1', 'site_logo');
wp.social = wp.registerRoute('bridge/v1', 'social_links');
wp.footer_text = wp.registerRoute('bridge/v1', 'footer_text');

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const [headerMenu, footerMenu, logo, social, footer_text, childProps] = await Promise.all([
        wp.menus().id('header-menu'),
        wp.menus().id('footer-menu'),
        wp.site_logo(),
        wp.social(),
        wp.footer_text(),
        Comp.getInitialProps(args),
      ]);
      return {
        headerMenu,
        footerMenu,
        logo,
        social,
        footer_text,
        ...(Comp.getInitialProps ? childProps : null),
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
