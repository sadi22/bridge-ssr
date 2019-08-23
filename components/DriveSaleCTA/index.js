/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import style from "./index.scss";

import DriveSales from '../DriveSales';
import BottomCTA from '../BottomCTA';

class DriveCTA extends React.Component {
  
  render () {
    return (
        <Fragment>
        
            <Head>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </Head>
        
            <div className="drive-sale-cta pos-relative">
                <div className="overlay"></div>
                
                <DriveSales/>
                <BottomCTA/>
            </div>
        </Fragment>
    )
  }
}


export default DriveCTA;
