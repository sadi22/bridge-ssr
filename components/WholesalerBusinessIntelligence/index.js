/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import "./index.scss";


class WholesalerBusinessIntelligence extends Component{
    render() {
        const {title, image, feature_list} = this.props;
        const { inViewport } = this.props;
        let featureListMarkup = null;
    	if(feature_list){            
    		featureListMarkup = feature_list.map((feature, i) => {
			    return (
                    <div className="single-block supply" key={i}>
                        <motion.h4
                            initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                            animate={inViewport && { translateY: 0, opacity: 1, visibility:"visible" }}
                            transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 500,
                            default: { duration: 0.8 },
                            }}
                        >{Parser(feature.feature_title)}</motion.h4>
                        <motion.p
                            initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                            animate={inViewport && { translateY: 0, opacity: 1, visibility:"visible" }}
                            transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 500,
                            default: { duration: 0.8 },
                            }}
                        >{Parser(feature.feature_description)}</motion.p>
                        
                    </div>
			      );
			    });
    	}
        return (
            <div className="wholesaler-business-intelligence">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="business-intelligence-img">
                                {image ? <motion.img 
                                    src={image.url} 
                                    alt={image.alt} 
                                    title={image.title} 
                                    className="img-fluid"
                                    initial={{ translateY: 100, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport && { translateY: 0, opacity: 1, visibility:"visible" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 500,
                                        delay: 1.4,
                                        duration: 1,
                                    }}
                                 /> : ''}
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="business-intelligence-content">
                            <motion.h2
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport && { translateY: 0, opacity: 1, visibility:"visible" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    default: { duration: 0.8 },
                                    }}
                                >{Parser(title)}</motion.h2>
                                {featureListMarkup}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default handleViewport(WholesalerBusinessIntelligence, { rootMargin: '-10.0px' }, {disconnectOnLeave: true});