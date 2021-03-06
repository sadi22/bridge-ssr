/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"
import { Enhance } from "../Enhance";

import "./index.scss";


class SupplierProfilesReach extends Component{
    
    featureMouseHover(e) {
        e.target.parentElement.querySelectorAll( ".active" ).forEach( e => e.classList.remove( "active" ) );
        e.target.classList.add( "active" );
        var imgSrc = e.target.getAttribute('data-src');
        document.getElementById("unique-reach-image-src").src = imgSrc;
        var this_item_height = e.target.offsetHeight;
        var target_offset = e.target.offsetTop;
        document.getElementsByClassName('vertical-line')[0].setAttribute("style", "top: "+target_offset+"px; height: "+this_item_height+"px;")        
    }

    render() {
        const {title, subtitle, description, image, enable_feature_list_with_image, feature_list_title, feature_description, features_text_with_image} = this.props;
        let defaultImage = '';
        let featureListMarkup = null;
        const variants = {
            visible: i => ({
              opacity: 1,
              translateY: 0,
              visibility:"visible",
              transition: {
                type: "spring",
                stiffness: 60,
                damping: 500,
                delay: i * 0.3,
              },
            }),
            hidden: { opacity: 0 },
        }
          
    	if(features_text_with_image){            
    		featureListMarkup = features_text_with_image.map((feature, i) => {
                if(i == 0) defaultImage = feature.feature_image.url;
			    return (
                    <motion.li 
                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                        custom={i}
                        animate="visible"
                        variants={variants}
                        className={`${i==0 ? 'active': ''} unique-reach-list`} 
                        data-src={feature.feature_image.url} 
                        key={i} 
                        onMouseOver={this.featureMouseHover.bind(this)}
                    >{feature.feature_text}</motion.li>
			      );
			    });
    	}
        return (
            <div className="supplier-profiles-reach section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                            <motion.h2
                                className="single-drive"
                                initial={{ scale:0.5, opacity: 0, visibility:"hidden" }}
                                animate={{ scale:1, opacity: 1, visibility:"visible" }}
                                transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 500,
                                delay: 0.3,
                                }}
                            >{Parser(title)}</motion.h2>
                            </div>
                        </div>
                    </div>
            
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="customer-profiling-content">
                                <div className="section-title">
                                    <h3>{Parser(subtitle)}</h3>
                                    {Parser(description)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 ml-auto">
                            <div className="customer-profiling-image pos-relative">
                                { image ? <img src={image.url} alt={image.alt} title={image.title} className="img-fluid" />: ''}
                            </div>
                        </div>
                    </div>
            
                    {enable_feature_list_with_image ? 
                        <div className="row align-items-center unique-reach">
                            <div className="col-lg-6">
                                <div className="unique-reach-image pos-relative">
                                    <img src={defaultImage} className="img-fluid unique-reach-image-src" id="unique-reach-image-src"/>
                                </div>
                            </div>
                            
                            <div className="col-lg-5 ml-auto">
                                <div className="unique-reach-content">
                                    <div className="section-title">
                                        <h3>{Parser(feature_list_title)}</h3>
                                        <p>{Parser(feature_description)}</p>
                                    </div>
                                    
                                    <ul className="vertical-line-wrapper unique-reach-wrapper">
                                        <span className="vertical-line unique-reach-line"></span>
                                        {featureListMarkup}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    : ''}
                </div>
            </div>
        )
    }
}

export default Enhance(SupplierProfilesReach);