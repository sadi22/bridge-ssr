/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';

import style from "./index.scss";


class BottomCTA extends Component{
    render() {
        const {title, sub_title} = this.props;
        return (
          <Fragment>
             <div>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </div>

            <div className="bottom-cta">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{Parser(title)}</h2>
                                <p>{Parser(sub_title)}</p>
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
