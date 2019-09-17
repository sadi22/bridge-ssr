/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import {Fade, Zoom} from 'react-reveal';
import { motion } from "framer-motion"
import "./index.scss";


class Press extends Component{
    render() {
        const {title, press_list} = this.props;
        let pressListMarkup = null;
    	if(press_list){            
    		pressListMarkup = press_list.map((press, i) => {
			    return (
                    <div className="col-lg-3 col-sm-6 single-col" key={i}>
                        <div className="single-press">
                            <a href={press.link} target='_blank'>
                                {press.image ? <Zoom delay={1000}><motion.img
                                    src={press.image.url}
                                    alt={press.image.alt}
                                    title={press.image.title} 
                                    whileHover={{
                                        scale: 1.2,
                                    }}
                                /></Zoom> : ''}
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
                                <Fade bottom delay={800} duration={1000}><h2>{Parser(title)}</h2></Fade>
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

export default Press;
