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
        let initialDelay = 450;
        
        if(feature_list){
    		featureListMarkup = feature_list.map((feature, i) => {
                if(i == 0) defaultImage = feature.feature_image;
                initialDelay = initialDelay + 100;
			    return (
                    <li 
                        key={i}
                        data-aos="fade-right" data-aos-delay="150"
                        className={`${i==0 ? 'active': ''} feature-list`} 
                        data-id={i}
                        onMouseOver={this.featureMouseHover.bind(this)}
                    >{feature.feature_title}</li>
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
                    <img 
                        src="/static/images/feature-list-lines-accent.png"
                        alt="bg-img" 
                        className="bg-image" 
                        data-aos="fade-left" data-aos-delay="450"
                    />
                </div>
            
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2 data-aos="fade-up" data-aos-delay="300">{Parser(title)}</h2>
                                <p data-aos="fade-up" data-aos-delay="400">{Parser(description)}</p>
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
                    <div data-aos="fade-left" data-aos-delay="700">
                        
                        {featureImagesMarkup}
                    </div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default handleViewport(Feature, {}, {disconnectOnLeave: false});