/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fade from 'react-reveal/Fade';

import "./index.scss";


class RetailEcommerce extends Component{
    render() {
        const {title, sub_title, left_text, right_image, show_background, enable_drop_shadow, enable_double_line_heading } = this.props;
        return (
          <Fragment>
            <div className="retail-ecommerce">
                <div className="container">
                    <div className="row">
                        <div className={`${enable_double_line_heading ? 'col-lg-8' : 'col-12'} m-auto`}>
                            <div className="section-title text-center">
                                <Fade bottom><h2>{Parser(title)}</h2></Fade>
                                <Fade bottom delay={500}><p>{Parser(sub_title)}</p></Fade>
                            </div>
                        </div>
                    </div>
            
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="retailer-content">
                                <Fade bottom  delay={600}>{Parser(left_text)}</Fade>
                                <div className="newsletterForm">
                                    <Fade bottom  delay={800}><h6>Interested in getting started? Shoot us an email and we'll get back to you the same day.</h6></Fade>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className={`${enable_drop_shadow ? 'image-shadow' : ''} retailer-image pos-relative`}>
                                <div className="lines-accent">
                                    { show_background ? <img src='/static/images/lines-accent.png' /> : '' }
                                </div>
                                {right_image ? <Fade right cascade delay={700} distance="100px"><img src={right_image.url} alt={right_image.alt} title={right_image.title} className="img-fluid"/></Fade>: ''}
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