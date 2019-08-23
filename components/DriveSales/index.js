/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import style from "./index.scss";


class DriveSales extends Component{
    render() {
    	const { title, feature_box } = this.props;
    	let featureBoxMarkup = null;
    	if(feature_box){
    		featureBoxMarkup = feature_box.map((feature, i) => {
			      return (
			        <div className="col-lg-6" key={i}>
		                <div className="single-drive">
		                    <span className="icon">
                            { feature.image ? <img src={feature.image} alt="image" className="img-fluid" />: ''}
		                    </span>
		                    <div className="drive-content">
		                        <h4>{feature.title}</h4>
		                        <p>{feature.description}</p>
		                    </div>
		                </div>
		            </div>
			      );
			    });
    	}

        return (
          <Fragment>
            <Head>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </Head>

            <div className="drive-sales pos-relative">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2>Everything You Need to Drive Sales</h2>
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
