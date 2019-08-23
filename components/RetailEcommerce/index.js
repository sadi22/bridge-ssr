/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import style from "./index.scss";


class RetailEcommerce extends Component{
    render() {
        return (
          <Fragment>
            <Head>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </Head>
            
            <div className="retail-ecommerce">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2>Cutting-Edge Retail Ecommerce. <span className="primary-color pos-relative underline">Totally FREE.</span> Forever.</h2>
                                <p>No long term contracts, no strings attached</p>
                            </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="retailer-content">
                                <h5>Introducing Bridge, the industry’s most anticipated and progressive ecommerce platform designed exclusively for independent off-premise retailers.</h5>
                                <p>We've purposefully built our software based on feedback from retailers like yourself, so we've made sure to include the most sought-after consumer-facing features as well as back-off business intelligence tools to help keep you one step ahead of your competition.</p>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className="retailer-image pos-relative">
                                <div className="retailer-image pos-relative">
                                </div>
                                <img src='/static/images/retail-ecommerce.jpg' className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
          </Fragment>
        )
    }
}

export default RetailEcommerce;