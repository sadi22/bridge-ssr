/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import {Fade, Slide} from 'react-reveal';

import Parser from 'html-react-parser';
import "./index.scss";

class DriveSales extends Component{
    render() {
        const { title, feature_box } = this.props;
    
        let featureBoxMarkup = null;
        let initialDelay = 400;
    	if(feature_box){
    		featureBoxMarkup = feature_box.map((feature, i) => {
                  initialDelay = initialDelay + 100;
			      return (

			        <div className="col-lg-6" key={i}>
                        <Fade top delay={initialDelay} duration={2000} distance="100px">
                            <div className="single-drive">
                                <span className="icon" style={{backgroundColor: feature.image_background_color}}>
                                { feature.image ? <Slide bottom delay={initialDelay+100}><img src={feature.image.url} alt={feature.image.alt} title={feature.image.title} className="img-fluid" /></Slide>: ''}
                                </span>
                                <div className="drive-content">
                                    <Fade top delay={initialDelay+200}><h4>{feature.title}</h4></Fade>
                                    <Fade top delay={initialDelay+300}><p>{feature.description}</p></Fade>
                                </div>
                            </div>
                        </Fade>
		            </div>
			      );
			    });
    	}

        return (
          <Fragment>
            <div className="drive-sales pos-relative">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2>{Parser(title)}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {featureBoxMarkup}
                    </div>
                </div>
            </div>


          </Fragment>
        )
    }
}

export default DriveSales;
