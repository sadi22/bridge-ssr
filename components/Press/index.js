/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"
import handleViewport from 'react-in-viewport';
import "./index.scss";


class Press extends Component{
    render() {
        const {title, press_list} = this.props;
        const { inViewport } = this.props;
        let pressListMarkup = null;
    	if(press_list){            
    		pressListMarkup = press_list.map((press, i) => {
			    return (
                    <div className="col-lg-3 col-sm-6 single-col" key={i}>
                        <div className="single-press">
                            <a href={press.link} target='_blank'>
                                {press.image ? <img
                                    src={press.image.url}
                                    alt={press.image.alt}
                                    title={press.image.title} 
                                    data-aos="zoom-in" data-aos-duration="700" data-aos-delay="150"
                                /> : ''}
                            </a>
                        </div>
                    </div>
			      );
			    });
    	}
        return (
          <Fragment>
            
            <div className="bridge-press-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-content">
                                <h2  data-aos="fade-up" data-aos-delay="150">{Parser(title)}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bridge-press-list">
                <div className="container">
                    <div className="row align-items-center">
                        {pressListMarkup}
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }
}

export default handleViewport(Press, {}, {disconnectOnLeave: false});
