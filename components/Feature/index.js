/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import handleViewport from 'react-in-viewport';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"
import $ from "jquery";

import "./index.scss";


class Feature extends Component{

    constructor(props) {
        super(props);
    }

    featureMouseHover(e) {
        var dataID = e.target.getAttribute('data-id');
        $('.feature-list-hovered-image').hide();
        $(`#feature-list-hovered-image-${dataID}`).show();
        e.target.parentElement.querySelectorAll( ".active" ).forEach( e => e.classList.remove( "active" ) );
        e.target.classList.add( "active" );
        var this_item_height = e.target.offsetHeight;
        var target_offset = e.target.offsetTop;
        document.getElementsByClassName('line')[0].setAttribute("style", "top: "+target_offset+"px; height: "+this_item_height+"px;")        
    }
    
    render() {
        const {title, description, feature_list, show_more, show_more_link} = this.props;
        const { inViewport } = this.props;
        let defaultImage = '';
        let featureListMarkup = null;
        let featureImagesMarkup = null;
        let initialDelay = 300;
        
        if(feature_list){
    		featureListMarkup = feature_list.map((feature, i) => {
                if(i == 0) defaultImage = feature.feature_image;
                initialDelay = initialDelay + 100;
			    return (
                    <motion.li 
                        key={i}
                        initial={{ translateX: -50, opacity: 0, visibility:"hidden" }}
                        animate={inViewport ? { opacity: 1, translateX: 0, visibility:"visible"}:{ translateX: -50, opacity: 0, visibility:"hidden" }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 500,
                            delay: i * 0.3,
                        }}
                        className={`${i==0 ? 'active': ''} feature-list`} 
                        data-id={i}
                        onMouseOver={this.featureMouseHover.bind(this)}
                    >{feature.feature_title}</motion.li>
			      );
			    });
        }
        
        if(feature_list){
    		featureImagesMarkup = feature_list.map((feature, i) => {
			    return (
                    <motion.img 
                        key={i}
                        style={ i===0 ? {display: 'block'} : {display: 'none'}}
                        src={feature.feature_image.url}
                        alt={feature.feature_image.alt}
                        title={feature.feature_image.title}
                        className="feature-list-hovered-image"
                        id={`feature-list-hovered-image-${i}`}
                        whileHover={{
                            scale: 1.1
                        }}
                    />
			      );
			    });
        }

        return (
            <Fragment>
            <div className="feature">
                
                <div className="feature-list-image">
                    <motion.img 
                        src="/static/images/feature-list-lines-accent.png"
                        alt="bg-img" 
                        className="bg-image" 
                        initial={{ translateX: 150, opacity: 0, visibility:"hidden" }}
                        animate={inViewport ? { opacity: 1, translateX: 0, visibility:"visible"}:{ translateX: 150, opacity: 0, visibility:"hidden" }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 500, 
                            delay: 0.3,
                        }}
                    />
                </div>
            
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <motion.h2
                                    initial={{ translateX: -50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { opacity: 1, translateX: 0, visibility:"visible"}:{ translateX: -50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 500,
                                        delay: 0.3,
                                    }}
                                >{Parser(title)}</motion.h2>
                                <motion.p
                                    initial={{ translateX: -50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { opacity: 1, translateX: 0, visibility:"visible"}:{ translateX: -50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 500,
                                        delay: 0.4,
                                    }}
                                >{Parser(description)}</motion.p>
                            </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="feature-content">
                                <ul id="feature_list" className='vertical-line-wrapper'>
                                    <span className="line vertical-line"></span>
                                    {featureListMarkup}
                                </ul>

                                { show_more ? 
                                    <Link href={show_more_link} as={show_more_link}>
                                        <a className="show-more">Show more</a>
                                    </Link>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="hovered-image-wrapper" id='hovered-image-wrapper'>
                    <motion.div
                        initial={{translateX: 100, opacity:0}}
                        animate={inViewport ? { translateX: 0, opacity: 1 }:{translateX: 100, opacity:0}}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 500,
                            delay: 0.9,
                            default: { duration: 0.8 },
                        }}
                    >
                        {/* <motion.img 
                            src={defaultImage.url}
                            alt={defaultImage.alt}
                            title={defaultImage.title}
                            className="feature-list-hovered-image"
                            id='feature-list-hovered-image'
                            whileHover={{
                                scale: 1.1
                            }}
                        /> */}
                        {featureImagesMarkup}
                    </motion.div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default handleViewport(Feature, {}, {disconnectOnLeave: false});