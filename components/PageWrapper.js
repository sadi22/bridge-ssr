import React from 'react';
import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');
wp.site_logo = wp.registerRoute('bridge/v1', 'site_logo');
wp.social = wp.registerRoute('bridge/v1', 'social_links');
wp.footer_text = wp.registerRoute('bridge/v1', 'footer_text');
wp.getting_started = wp.registerRoute('bridge/v1', 'getting_started_link');

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const [headerMenu, footerMenu, logo, social, footer_text, getting_started_link, childProps] = await Promise.all([
         {},
       {},
        wp.site_logo(),
        wp.social(),
        wp.footer_text(),
        wp.getting_started(),
        Comp.getInitialProps(args),
      ]);
      return {
        headerMenu,
        footerMenu,
        logo,
        social,
        footer_text,
        getting_started_link,
        ...(Comp.getInitialProps ? childProps : null),
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
