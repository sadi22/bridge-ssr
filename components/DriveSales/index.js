/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { motion } from "framer-motion";
import handleViewport from 'react-in-viewport';
import Parser from 'html-react-parser';

import "./index.scss";

const FeatureBlock = (props) => {
    const { inViewport, innerRef, feature, index } = props;
    return (
        <div className="col-lg-6" ref={innerRef} data-aos="fade-up" data-aos-delay={`${index*400}`}>
            <div className="single-drive">   
                
                <span  className="icon" style={{backgroundColor: feature.image_background_color}} >
                    { feature.image ? <motion.img 
                        src={feature.image.url} alt={feature.image.alt} title={feature.image.title} className="img-fluid" 
                        data-aos="fade-up" data-aos-delay={`${index*500}`}
                    />: ''}
                </span>
                <div className="drive-content">
                    <h4 data-aos="fade-left" data-aos-delay={`${index*600}`}>{feature.title}</h4>
                    <p  data-aos="fade-left" data-aos-delay={`${index*800}`}>{feature.description}</p>
                </div>
            </div>
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
                                        <h2 data-aos="fade-up" data-aos-delay="300">{Parser(title)}</h2>
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
