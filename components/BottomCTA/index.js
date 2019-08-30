/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fade from 'react-reveal/Fade';

import "./index.scss";


class BottomCTA extends Component{
    render() {
        const {title, sub_title} = this.props;
        return (
          <Fragment>
            <div className="bottom-cta">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <Fade left distance="100px"><h2>{Parser(title)}</h2></Fade>
                                <Fade left distance="100px" delay={600}><p>{Parser(sub_title)}</p></Fade>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


          </Fragment>
        )
    }
}

export default BottomCTA;
