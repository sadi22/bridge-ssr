/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import TrackVisibility from 'react-on-screen';
import { motion } from "framer-motion"

import "./index.scss";


class BottomCTA extends Component{
    render() {
        const {title, sub_title} = this.props;
        return (
            <TrackVisibility once key='bottomCTA'>
                {({ isVisible }) => isVisible && 
                <div>
                    <div className="bottom-cta">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <motion.h2
                                            initial={{ translateX: -50, opacity: 0, visibility:"hidden" }}
                                            animate={{ translateX: 0, opacity: 1, visibility:"visible" }}
                                            transition={{
                                            type: "spring",
                                            stiffness: 60,
                                            damping: 500,
                                            delay: 0.4,
                                            default: { duration: .8 },
                                            }}
                                        >{Parser(title)}</motion.h2>
                                        <motion.p
                                            initial={{ translateX: -50, opacity: 0, visibility:"hidden" }}
                                            animate={{ translateX: 0, opacity: 1, visibility:"visible" }}
                                            transition={{
                                            type: "spring",
                                            stiffness: 60,
                                            damping: 500,
                                            delay: 0.6,
                                            default: { duration: .8 },
                                            }}
                                        >{Parser(sub_title)}</motion.p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>}
            </TrackVisibility>
        )
    }
}

export default BottomCTA;
