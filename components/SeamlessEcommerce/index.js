/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import { Enhance } from "../Enhance";

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
                                <motion.h2
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 500,
                                    delay: 0.4,
                                    default: { duration: .8 },
                                    }}
                                >{Parser(title)}</motion.h2>
                                <motion.p
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 500,
                                    delay: 0.6,
                                    default: { duration: .8 },
                                    }}
                                >{Parser(sub_title)}</motion.p>
                            </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="seamless-image-area">
                                <div className="seamless-image img1">
                                    { left_image ? <motion.img 
                                    src={left_image.url} alt={left_image.alt} title={left_image.title} 
                                    className="banner-img img-fluid" 
                                    initial={{ translateX: -80, opacity:0 }}
                                    animate={inViewport ? { translateX: 0, opacity:1 }:{ translateX: -80, opacity:0 }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.8,
                                    default: { duration: 0.5 },
                                    }}
                                    />: ''}
                                </div>

                                <div className="seamless-image img2">
                                    { left_image ? <motion.img 
                                        src={right_image.url} alt={right_image.alt} title={right_image.title} className="banner-img img-fluid" 
                                        initial={{ translateX: 80, opacity:0 }}
                                        animate={inViewport ? { translateX: 0, opacity:1 }:{ translateX: 80, opacity:0 }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 1,
                                        default: { duration: 0.5 },
                                        }}
                                        />: ''}
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