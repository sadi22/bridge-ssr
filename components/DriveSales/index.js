/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { motion } from "framer-motion";
import handleViewport from 'react-in-viewport';
import Parser from 'html-react-parser';
import {Fade} from 'react-reveal';

import "./index.scss";

const FeatureBlock = (props) => {
    const { inViewport, innerRef, feature, index } = props;
    return (
        <div className="col-lg-6">
            <Fade ssrFadeout  bottom delay={200*index} duration={1000} distance="50px">
                <div className="single-drive">   
                    <span  className="icon" style={{backgroundColor: feature.image_background_color}} >
                        { feature.image ?
                        <Fade ssrFadeout  bottom delay={350*index} duration={1300}>
                            <img src={feature.image.url} alt={feature.image.alt} title={feature.image.title} className="img-fluid" 
                        /></Fade>: ''}
                    </span>
                    <div className="drive-content">
                        <Fade ssrFadeout  right cascade delay={450*index} duration={800}  distance="150px"><h4>{feature.title}</h4></Fade>
                        <Fade ssrFadeout  right cascade delay={550*index} duration={800}  distance="150px"><p>{feature.description}</p></Fade>
                    </div>
                </div>
            </Fade>
        </div>
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
                                        <Fade ssrFadeout  bottom delay={300} duration={1000}><h2>{title}</h2></Fade>
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
