/* eslint-disable */
import React, { Component, Fragment } from 'react'
import Head from 'next/head'
import style from "./index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faCaretDown } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit, faCaretDown);

class Banner extends Component{
    render() {
        const {image, heading, description} = this.props;
        return (
          <Fragment>
            <Head>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </Head>

            <div className="bridge-banner pos-relative">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-content text-center">
                                <div className="banner-text">
                                    <h1>{ heading }</h1>
                                    <p>{ description }</p>
                                </div>
                                { image ? <img src={image} alt="hero image" className="banner-img img-fluid" />: ''}
                            </div>
                            
                            <div className="banner-select-option text-center">
                                <p>SEE WHAT BRIDGE CAN DO FOR YOUR BUSINESS</p>
                                <div className="select-area">
                                    <h3>I am a <span className="primary-color">Retailer</span> <FontAwesomeIcon icon={["fas", "caret-down"]} /> </h3>
                                    <button className="button"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg></button>
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

export default Banner;