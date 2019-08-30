/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import style from "./index.scss";


class CaseStudy extends Component{
    render() {
        return (
          <Fragment>
            <div className="case-study">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="case-study-wrapper">
                                <div className="case-study-img">
                                    <img src='/static/images/case-study.jpg' className="img-fluid" />
                                </div>
            
                                <div className="case-study-content">
                                    <span className="small-title">case study</span>
                                    <h2>How Pernod Ricard’s Mobile Campaign Increased <br/> In-App Sales of Jameson by 600% for Father’s Day</h2>
                                    <a href="#" className="btn-default">Read Full Case Study</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
          </Fragment>
        )
    }
}

export default CaseStudy;