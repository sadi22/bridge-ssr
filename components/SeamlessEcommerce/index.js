/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fade from 'react-reveal/Fade';

import style from "./index.scss";


class SeamlessEcommerce extends Component{
    
    render() {
    	const {title, sub_title, left_image, right_image} = this.props;
    
        return (
          <Fragment>
            <style dangerouslySetInnerHTML={{ __html: style }} />
           
            <div className="seamless-ecommerce">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <Fade bottom><h2>{Parser(title)}</h2></Fade>
                                <Fade bottom delay={500}><p>{Parser(sub_title)}</p></Fade>
                            </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="seamless-image-area">
                                <div className="seamless-image img1">
                                    { left_image ? <Fade left cascade distance="100px"><img src={left_image.url} alt={left_image.alt} title={left_image.title} className="banner-img img-fluid" /></Fade>: ''}
                                </div>

                                <div className="seamless-image img2">
                                    { left_image ? <Fade right cascade delay={500} distance="100px"><img src={right_image.url} alt={right_image.alt} title={right_image.title} className="banner-img img-fluid" /></Fade>: ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
          </Fragment>
        )
    }
}

export default SeamlessEcommerce;