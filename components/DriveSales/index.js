/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { motion } from "framer-motion";
import handleViewport from 'react-in-viewport';
import Parser from 'html-react-parser';
import ScrollAnimation from 'react-animate-on-scroll';

import "./index.scss";

const FeatureBlock = (props) => {
    const { inViewport, innerRef, feature, index } = props;
    return (
        <ScrollAnimation className="col-lg-6" animateIn="fadeInUp" animateOnce={true} delay={300*index}>
            <div className="single-drive">   
                <span  className="icon" style={{backgroundColor: feature.image_background_color}} >
                    { feature.image ? <ScrollAnimation animateIn="fadeInLeft" animateOnce={true} delay={400*index}><img 
                        src={feature.image.url} alt={feature.image.alt} title={feature.image.title} className="img-fluid" 
                    /></ScrollAnimation>: ''}
                </span>
                <div className="drive-content">
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={500*index}><h4>{feature.title}</h4></ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={600*index}><p>{feature.description}</p></ScrollAnimation>
                </div>
            </div>
        </ScrollAnimation>
    );
  };
   
const VFeatureBlock = handleViewport(FeatureBlock);


class DriveSales extends Component{
    render() {
        const { title, feature_box } = this.props;
        const { inViewport } = this.props;    
        return (
            <Fragment>
                <div className="drive-sales pos-relative">
                    <div className="drive-sales pos-relative">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={300}><h2>{title}</h2></ScrollAnimation>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {feature_box && feature_box.map((item, i)=>(
                                    <VFeatureBlock feature={item} key={i} index={i}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default handleViewport(DriveSales, { rootMargin: '-200px' }, {disconnectOnLeave: true});
