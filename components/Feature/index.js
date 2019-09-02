/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"

import { Enhance } from "../Enhance";

import "./index.scss";


class Feature extends Component{

    constructor(props) {
        super(props);
    }

    featureMouseHover(e) {
        var imgSrc = e.target.getAttribute('data-src');
        document.getElementById("feature-list-hovered-image").src = imgSrc;
        var this_item_height = e.target.offsetHeight;
        var target_offset = e.target.offsetTop;
        document.getElementsByClassName('line')[0].setAttribute("style", "top: "+target_offset+"px; height: "+this_item_height+"px;")        
    }
    
    render() {
        const {title, description, feature_list, show_more, show_more_link} = this.props;
        let defaultImage = '';
        let featureListMarkup = null;
        let initialDelay = 300;
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
          
    	if(feature_list){
    		featureListMarkup = feature_list.map((feature, i) => {
                if(i == 0) defaultImage = feature.feature_image;
                initialDelay = initialDelay + 100;
			    return (
                    <motion.li 
                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                        custom={i}
                        animate="visible"
                        variants={variants}

                        className={`${i==0 ? 'active': ''} feature-list`} 
                        data-src={feature.feature_image.url} key={i} 
                        onMouseOver={this.featureMouseHover.bind(this)}
                    >{feature.feature_title}</motion.li>
			      );
			    });
    	}
        return (
            <div className="feature">
                
                <div className="feature-list-image">
                    <img src="/static/images/feature-list-lines-accent.png" alt="bg-img" className="bg-image" />
                </div>
            
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{Parser(title)}</h2>
                                <p>{Parser(description)}</p>
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
                    <motion.img 
                        src={defaultImage.url}
                        alt={defaultImage.alt}
                        title={defaultImage.title}
                        className="feature-list-hovered-image"
                        id='feature-list-hovered-image'
                        initial={{scale: 0.7, opacity:0}}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 500,
                            delay: 0.9,
                            default: { duration: 0.8 },
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Enhance(Feature);