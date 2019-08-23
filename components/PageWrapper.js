import React from 'react';
import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');
wp.site_logo = wp.registerRoute('bridge/v1', 'site_logo');

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const [headerMenu, footerMenu, logo, childProps] = await Promise.all([
        {},
        {},
        '',
        Comp.getInitialProps(args),
      ]);

      return {
        headerMenu,
        footerMenu,
        logo,
        ...(Comp.getInitialProps ? childProps : null),
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
