/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import style from "./index.scss";


class BottomCTA extends Component{
    render() {
        const {title, sub_title} = this.props;
        return (
          <Fragment>
            <Head>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </Head>

            <div className="bottom-cta">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{title}</h2>
                                <p>{sub_title}</p>
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
