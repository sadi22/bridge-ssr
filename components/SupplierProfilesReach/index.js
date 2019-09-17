/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"
import handleViewport from 'react-in-viewport';
import "./index.scss";
import $ from "jquery";
import ScrollAnimation from 'react-animate-on-scroll';

function featureMouseHover(e) {
    var dataID = e.target.getAttribute('data-id');
    $('.unique-reach-image-src').hide();
    $(`#unique-reach-hovered-image-${dataID}`).show();

    e.target.parentElement.querySelectorAll( ".active" ).forEach( e => e.classList.remove( "active" ) );
    e.target.classList.add( "active" );
    var this_item_height = e.target.offsetHeight;
    var target_offset = e.target.offsetTop;
    document.getElementsByClassName('vertical-line')[0].setAttribute("style", "top: "+target_offset+"px; height: "+this_item_height+"px;")        
}

const FeatureBlock = (props) => {
    const { inViewport, innerRef, index, features_text_with_image,feature_list_title, feature_description  } = props;
    let defaultImage = '';
    let featureListMarkup = null;
    let featureImagesMarkup = null;

    if(features_text_with_image){
        featureImagesMarkup = features_text_with_image.map((feature, i) => {
            return (
                <motion.img 
                    key={i}
                    style={ i===0 ? {display: 'block'} : {display: 'none'}}
                    src={feature.feature_image.url}
                    alt={feature.feature_image.alt}
                    title={feature.feature_image.title}
                    className="img-fluid unique-reach-image-src"
                    id={`unique-reach-hovered-image-${i}`}
                    whileHover={{
                        scale: 1.1
                    }}
                />
                );
            });
    }
        
    if(features_text_with_image){            
        featureListMarkup = features_text_with_image.map((feature, i) => {
            if(i == 0) defaultImage = feature.feature_image.url;
            return (
                <motion.li 
                    key={i}
                    initial={{ translateX: 50, opacity: 0, visibility:"hidden" }}
                    animate={inViewport ? { opacity: 1, translateX: 0, visibility:"visible"}:{ translateX: 50, opacity: 0, visibility:"hidden" }}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 500,
                        delay: i * 0.2,
                        default: { duration: 1 },
                    }}
                
                    className={`${i==0 ? 'active': ''} unique-reach-list`} 
                    data-id={i}
                    onMouseOver={featureMouseHover.bind(this)}
                >{feature.feature_text}</motion.li>
                );
            });
    }

    
    return (
        <div className="row align-items-center unique-reach" ref={innerRef}>
            <div className="col-lg-6">
                <ScrollAnimation 
                className="unique-reach-image pos-relative"
                animateIn="fadeInLeft" animateOnce={true}
                >
                    <div className="overflow">
                        {featureImagesMarkup}
                    </div>
                </ScrollAnimation>
            </div>
            
            <div className="col-lg-5 ml-auto">
                <div className="unique-reach-content">
                    <div className="section-title">
                    <ScrollAnimation 
                        animateIn="fadeInDown" animateOnce={true} delay={300}
                        >
                        <h3>{Parser(feature_list_title)}</h3></ScrollAnimation>
                        <ScrollAnimation 
                        animateIn="fadeInDown" animateOnce={true} delay={400}
                        >
                        <p>{Parser(feature_description)}</p></ScrollAnimation>
                        
                    </div>
                    
                    <ul className="vertical-line-wrapper unique-reach-wrapper">
                        <span className="vertical-line unique-reach-line"></span>
                        {featureListMarkup}
                    </ul>
                </div>
            </div>
        </div>
    );
  };
   
const VFeatureBlock = handleViewport(FeatureBlock);

class SupplierProfilesReach extends Component{
    
    render() {
        const {title, subtitle, description, image, enable_feature_list_with_image, feature_list_title, feature_description, features_text_with_image} = this.props;
        const { inViewport } = this.props;
        
        return (
            <Fragment>
            <div className="supplier-profiles-reach section-padding">
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
                            </div>
                        </div>
                    </div>
            
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="customer-profiling-content">
                                <div className="section-title">
                                    <motion.h3
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 500,
                                        delay: 0.7,
                                        default: { duration: .8 },
                                        }}
                                    >{Parser(subtitle)}</motion.h3>
                                    <motion.div
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 500,
                                        delay: 0.9,
                                        default: { duration: .8 },
                                        }}
                                    >{Parser(description)}</motion.div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 ml-auto">
                            <motion.div 
                            className="customer-profiling-image pos-relative"
                            initial={{translateX: 100, opacity:0}}
                            animate={inViewport ? { translateX: 0, opacity: 1 }:{translateX: 100, opacity:0}}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 500,
                                delay: 1,
                                default: { duration: 0.8 },
                            }}
                            >
                                <div className="overflow">
                                    { image ? <motion.img 
                                            src={image.url}
                                            alt={image.alt} 
                                            title={image.title} 
                                            className="img-fluid"
                                            whileHover={{
                                                scale: 1.1
                                              }}
                                        />: ''}
                                </div>
                            </motion.div>
                        </div>
                    </div>
            
                    {enable_feature_list_with_image && <VFeatureBlock feature_list_title={feature_list_title} feature_description={feature_description} features_text_with_image={features_text_with_image}/>}
                </div>
            </div>
            </Fragment>
        )
    }
}
export default handleViewport(SupplierProfilesReach, { rootMargin: '10px' }, {disconnectOnLeave: false});
