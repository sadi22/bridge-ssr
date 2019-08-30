/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';

import TrackVisibility from 'react-on-screen';
import { motion } from "framer-motion"

import Parser from 'html-react-parser';
import "./index.scss";

class DriveSales extends Component{
    render() {
        const { title, feature_box } = this.props;
    
        let featureBoxMarkup = null;
        let initialDelay = 0;
    	if(feature_box){
    		featureBoxMarkup = feature_box.map((feature, i) => {
                  initialDelay = initialDelay + 0.7;
			      return (

			        <div className="col-lg-6" key={i}>
                        <motion.div 
                            className="single-drive"
                            initial={{ scale:0.5, opacity: 0, visibility:"hidden" }}
                            animate={{ scale:1, opacity: 1, visibility:"visible" }}
                            transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 500,
                            delay: initialDelay,
                            }}
                        >
                            <motion.span 
                                className="icon" style={{backgroundColor: feature.image_background_color}}
                                initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 500,
                                delay: initialDelay + 0.3,
                                }}
                            >
                            { feature.image ? <motion.img 
                                src={feature.image.url} alt={feature.image.alt} title={feature.image.title} className="img-fluid" 
                                initial={{ translateY: 20, opacity: 0, visibility:"hidden" }}
                                animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 500,
                                delay: initialDelay + 0.4,
                                }}
                            />: ''}
                            </motion.span>
                            <div className="drive-content">
                                <motion.h4
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 500,
                                    delay: initialDelay + 0.5,
                                    }}
                                >{feature.title}</motion.h4>
                                <motion.p
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 500,
                                    delay: initialDelay + 0.7,
                                    }}
                                >{feature.description}</motion.p>
                            </div>
                        </motion.div>
		            </div>
			      );
			    });
    	}

        return (
            <TrackVisibility once key='DriveSales'>
                {({ isVisible }) => isVisible && 
                <div>
                    <div className="drive-sales pos-relative">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <motion.h2
                                            initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                            animate={{ translateY: 0, opacity: 1, visibility:"visible" }}
                                            transition={{
                                            type: "spring",
                                            stiffness: 60,
                                            damping: 500,
                                            delay: 0.4,
                                            }}
                                        >{Parser(title)}</motion.h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {featureBoxMarkup}
                            </div>
                        </div>
                    </div>

                </div>}
            </TrackVisibility>
        )
    }
}

export default DriveSales;
