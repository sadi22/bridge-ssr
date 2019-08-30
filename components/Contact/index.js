/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
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
        return (
          <Fragment>
            <div className="bridge-contact pos-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="contact-content">
                                <div className="section-title">
                                    <h2>{Parser(title)}</h2>
                                    <p>{Parser(description)}</p>
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

export default Contact;