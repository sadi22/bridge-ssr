/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import { Enhance } from "../Enhance";
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import "./index.scss";
import MapContainer from './Map';



class Contact extends Component{
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
    render() {
        const { title, description, api, location } = this.props;
        const { inViewport } = this.props;
        return (
            <Fragment>
            <div className="bridge-contact pos-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="contact-content">
                                <div className="section-title">
                                    <motion.h2
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={inViewport && { translateY: 0, opacity: 1, visibility:"visible" }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 500,
                                        delay: 0.4,
                                        default: { duration: .8 },
                                        }}
                                    >{Parser(title)}</motion.h2>
                                    <motion.p
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={inViewport && { translateY: 0, opacity: 1, visibility:"visible" }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 500,
                                        delay: 0.4,
                                        default: { duration: .8 },
                                        }}
                                    >{Parser(description)}</motion.p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="google-map overlay">
                    <MapContainer apiKey={api} location={location}/>
                </div>
            </div>
            </Fragment>
        )
    }
}
export default handleViewport(Contact, {}, {disconnectOnLeave: true});
