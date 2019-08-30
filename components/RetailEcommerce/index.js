/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import TrackVisibility from 'react-on-screen';
import { motion } from "framer-motion"

import "./index.scss";


class RetailEcommerce extends Component{
    render() {
        const {title, sub_title, left_text, right_image, show_background, enable_drop_shadow, enable_double_line_heading } = this.props;
        return (
            <TrackVisibility once>
                {({ isVisible }) => isVisible && 
                <div>
                    <div className="retail-ecommerce">
                        <div className="container">
                            <div className="row">
                                <div className={`${enable_double_line_heading ? 'col-lg-8' : 'col-12'} m-auto`}>
                                    <div className="section-title text-center">
                                        <motion.h2
                                            initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                            animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                            transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 500,
                                            default: { duration: 0.8 },
                                            }}
                                        >{Parser(title)}</motion.h2>
                                        <motion.p
                                            initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                            animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                            transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 500,
                                            delay: 0.5,
                                            default: { duration: 0.8 },
                                            }}
                                        >{Parser(sub_title)}</motion.p>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <motion.div 
                                        className="retailer-content"
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 500,
                                            delay: 0.8,
                                            duration: 0.8,
                                        }}
                                    >
                                        {Parser(left_text)}
                                        <div className="newsletterForm">
                                        <h6>Interested in getting started? Shoot us an email and we'll get back to you the same day.</h6>
                                        </div>
                                    </motion.div>
                                </div>
                                
                                <div className="col-lg-6">
                                    <div className={`${enable_drop_shadow ? 'image-shadow' : ''} retailer-image pos-relative`}>
                                        <div className="lines-accent">
                                            { show_background ? <motion.img 
                                            src='/static/images/lines-accent.png' 
                                            initial={{ translateX: 100, opacity: 0, visibility:"hidden" }}
                                            animate={{ translateX: 0, opacity: 1, visibility:"visible" }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 500,
                                                delay: 1,
                                                duration: 1,
                                            }}
                                            /> : '' }
                                        </div>
                                        {right_image ? <motion.img 
                                        src={right_image.url} alt={right_image.alt} title={right_image.title} className="img-fluid"
                                        initial={{ translateY: 100, opacity: 0, visibility:"hidden" }}
                                        animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 500,
                                            delay: 1.4,
                                            duration: 1,
                                        }}
                                        />: ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </TrackVisibility>
          
        )
    }
}

export default RetailEcommerce;