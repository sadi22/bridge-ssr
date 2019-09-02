/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';

import "./index.scss";


class WholesalerBusinessIntelligence extends Component{
    render() {
        const {title, image, feature_list} = this.props;
        let featureListMarkup = null;
    	if(feature_list){            
    		featureListMarkup = feature_list.map((feature, i) => {
			    return (
                    <div className="single-block supply" key={i}>
                        <h4>{feature.feature_title}</h4>
                        <p>{feature.feature_description}</p>
                    </div>
			      );
			    });
    	}
        return (
            <div className="wholesaler-business-intelligence">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="business-intelligence-img">
                                {image ? <img src={image.url} alt={image.alt} title={image.title} className="img-fluid" /> : ''}
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="business-intelligence-content">
                                <h2>{Parser(title)}</h2>
                                {featureListMarkup}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WholesalerBusinessIntelligence;