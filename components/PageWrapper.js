import React from 'react';
import { getDataByEndPoint } from '../api/api';


const PageWrapper = Comp =>
  class extends React.Component {
    static pageTransitionDelayEnter = true

    static async getInitialProps(args) {
      const [headerMenu, footerMenu, logo, social, footer_text, getting_started_link, gmap_api, site_info, childProps] = await Promise.all([
        getDataByEndPoint('menus/v1/menus/header-menu').then(data=>{return data}),
        getDataByEndPoint('menus/v1/menus/footer-menu').then(data=>{return data}),
        getDataByEndPoint('bridge/v1/site_logo').then(data=>{return data}),
        getDataByEndPoint('bridge/v1/social_links').then(data=>{return data}),
        getDataByEndPoint('bridge/v1/footer_text').then(data=>{return data}),
        getDataByEndPoint('bridge/v1/getting_started_link').then(data=>{return data}),
        getDataByEndPoint('bridge/v1/gmap_api').then(data=>{return data}),
        '',
        Comp.getInitialProps(args),
      ]);
      return {
        headerMenu,
        footerMenu,
        logo,
        social,
        footer_text,
        getting_started_link,
        gmap_api,
        site_info,
        ...(Comp.getInitialProps ? childProps : null),
      };
    }  

    render() {
      // if (!this.state.loaded) return null
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;