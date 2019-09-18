/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import "./index.scss";
import ScrollAnimation from 'react-animate-on-scroll';
import {Fade} from 'react-reveal';


class WholesalerBusinessIntelligence extends Component{
    render() {
        const {title, image, feature_list} = this.props;
        const { inViewport, index } = this.props;
        let featureListMarkup = null;
    	if(feature_list){            
    		featureListMarkup = feature_list.map((feature, i) => {
			    return (
                    <Fade ssrFadeout bottom delay={(i+1)*300} duration={1000} distance="50px" key={i}>
                        <div className="single-block supply">
                            <h3>{Parser(feature.feature_title)}</h3>
                            <p>{Parser(feature.feature_description)}</p>
                        </div>
                    </Fade>
			      );
			    });
    	}
        return (
            <div className="wholesaler-business-intelligence">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <Fade ssrFadeout left delay={500} duration={1000} distance="100px">
                                <div className="overflow business-intelligence-img">
                                    {image ? <motion.img 
                                        src={image.url} 
                                        alt={image.alt} 
                                        title={image.title} 
                                        className="img-fluid"
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                     /> : ''}
                                </div>
                            </Fade>
                        </div>
                        <div className="col-lg-5">
                            <div className="business-intelligence-content">                                
                                <Fade ssrFadeout bottom delay={300} duration={1000} distance="100px"><div><h2>{Parser(title)}</h2></div></Fade>
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
