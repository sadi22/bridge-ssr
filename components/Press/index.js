/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';

import style from "./index.scss";


class Press extends Component{
    render() {
        const {title, press_list} = this.props;
        let pressListMarkup = null;
    	if(press_list){            
    		pressListMarkup = press_list.map((press, i) => {
                console.log(press);
			    return (
                    <div className="col-lg-3 col-sm-6 single-col" key={i}>
                        <div className="single-press">
                            <a href={press.link} target='_blank'>
                                {press.image ? <img src={press.image.url} alt={press.image.alt} title={press.image.title} /> : ''}
                            </a>
                        </div>
                    </div>
			      );
			    });
    	}
        return (
          <Fragment>
            <div>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </div>
            
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

export default Press;