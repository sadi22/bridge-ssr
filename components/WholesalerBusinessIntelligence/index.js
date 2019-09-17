/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import "./index.scss";
import ScrollAnimation from 'react-animate-on-scroll';


class WholesalerBusinessIntelligence extends Component{
    render() {
        const {title, image, feature_list} = this.props;
        const { inViewport, index } = this.props;
        let featureListMarkup = null;
    	if(feature_list){            
    		featureListMarkup = feature_list.map((feature, i) => {
			    return (
                    <ScrollAnimation 
                    className="single-block supply" 
                    key={i}
                    animateIn="slideInLeft" animateOnce={true} delay={400}
                    >
                        <ScrollAnimation 
                        animateIn="fadeInUp" animateOnce={true} delay={300}
                        >
                        <h3>{Parser(feature.feature_title)}</h3></ScrollAnimation>
                        <ScrollAnimation 
                        animateIn="fadeInUp" animateOnce={true} delay={400}
                        >
                        <p>{Parser(feature.feature_description)}</p></ScrollAnimation>
                    </ScrollAnimation>
			      );
			    });
    	}
        return (
            <div className="wholesaler-business-intelligence">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <ScrollAnimation 
                            animateIn="fadeInUp" animateOnce={true} delay={400}
                            >
                                <div className="overflow">
                                    {image ? <motion.img 
                                        src={image.url} 
                                        alt={image.alt} 
                                        title={image.title} 
                                        className="img-fluid"
                                        whileHover={{
                                            scale: 1.1
                                        }}
                                     /> : ''}
                                </div>
                            </ScrollAnimation>
                        </div>
                        <div className="col-lg-5">
                            <div className="business-intelligence-content">
                            <ScrollAnimation 
                        animateIn="fadeInUp" animateOnce={true} delay={300}
                        >
                        <h2>{Parser(title)}</h2></ScrollAnimation>
                                {featureListMarkup}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default handleViewport(WholesalerBusinessIntelligence, { rootMargin: '-10.0px' }, {disconnectOnLeave: false});
