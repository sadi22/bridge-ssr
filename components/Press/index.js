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
                                {press.image ? <motion.img
                                    src={press.image.url}
                                    alt={press.image.alt}
                                    title={press.image.title} 
                                    whileHover={{ scale: 1.1 }}
                                    initial={{scale: 0.7, opacity:0}}
                                    animate={inViewport ? { scale: 1, opacity: 1 }:{scale: 0.7, opacity:0}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 500,
                                        delay: 0.9,
                                        default: { duration: 0.8 },
                                    }}
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
                                <h2>{Parser(title)}</h2>
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
