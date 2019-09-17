/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import { Enhance } from "../Enhance";
import ScrollAnimation from 'react-animate-on-scroll';

import "./index.scss";


class SeamlessEcommerce extends Component{
    
    render() {
    	const {title, sub_title, left_image, right_image} = this.props;
        const { inViewport } = this.props;

        return (
            <Fragment>
            <div className="seamless-ecommerce">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                                    <h2>{Parser(title)}</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={300}>
                                    <p>{Parser(sub_title)}</p>
                                </ScrollAnimation>
                                
                            </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="seamless-image-area">
                                <div className="seamless-image img1">
                                    { left_image ? <ScrollAnimation animateIn="slideInLeft" animateOnce={true}><motion.img 
                                         src={left_image.url} alt={left_image.alt} title={left_image.title} className="banner-img img-fluid" 
                                         whileHover={{
                                            scale: 1.1
                                          }}
                                         /></ScrollAnimation>: ''}
                                </div>

                                <div className="seamless-image img2"> 
                                    { right_image ? <ScrollAnimation animateIn="slideInRight" animateOnce={true}><motion.img 
                                         src={right_image.url} alt={right_image.alt} title={right_image.title} className="banner-img img-fluid" 
                                         whileHover={{
                                            scale: 1.1
                                          }}
                                         /></ScrollAnimation>: ''}
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

export default handleViewport(SeamlessEcommerce, {}, {disconnectOnLeave: false});
