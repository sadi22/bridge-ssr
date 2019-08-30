/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Parser from 'html-react-parser';


import "./index.scss";


class SupplierProfilesReach extends Component{
    componentDidMount() {
        if(this.props.enable_feature_list_with_image) {
            var changed_img = document.getElementsByClassName('unique-reach-image-src');
            var items = document.getElementsByClassName('unique-reach-list');
            var item_height = document.getElementsByClassName('unique-reach-list')[0].offsetHeight;
            document.getElementsByClassName('unique-reach-line')[0].style.height = item_height + 'px';
    
            for(var i=0; i<items.length; i++) {
    
                items[i].onmouseover = function(e) {
                    var myTarget = e.target;
                    var imgSrc = myTarget.getAttribute('data-src');
                    changed_img[0].setAttribute('src', imgSrc);
    
                    e.target.parentElement.querySelectorAll( ".active" ).forEach( e => e.classList.remove( "active" ) );
                    e.target.classList.add( "active" );
    
                    var this_item_height = myTarget.offsetHeight;
                    var target_offset = myTarget.offsetTop;
    
                    document.getElementsByClassName('unique-reach-line')[0].setAttribute("style", "top: "+target_offset+"px; height: "+this_item_height+"px;");
    
                }
            }
        }
        
    }

    render() {
        const {title, subtitle, description, image, enable_feature_list_with_image, feature_list_title, feature_description, features_text_with_image} = this.props;
        let defaultImage = '';
        let featureListMarkup = null;
    	if(features_text_with_image){            
    		featureListMarkup = features_text_with_image.map((feature, i) => {
                if(i == 0) defaultImage = feature.feature_image.url;
			    return (
                    <li className="unique-reach-list active" data-src={feature.feature_image.url} key={i}>{feature.feature_text}</li>
			      );
			    });
    	}
        return (
          <Fragment>
            <div className="supplier-profiles-reach section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                            <h2>{Parser(title)}</h2>
                            </div>
                        </div>
                    </div>
            
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="customer-profiling-content">
                                <div className="section-title">
                                    <h3>{Parser(subtitle)}</h3>
                                    {Parser(description)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 ml-auto">
                            <div className="customer-profiling-image pos-relative">
                                { image ? <img src={image.url} alt={image.alt} title={image.title} className="img-fluid" />: ''}
                            </div>
                        </div>
                    </div>
            
                    {enable_feature_list_with_image ? 
                        <div className="row align-items-center unique-reach">
                            <div className="col-lg-6">
                                <div className="unique-reach-image pos-relative">
                                    <img src={defaultImage} className="img-fluid unique-reach-image-src" />
                                </div>
                            </div>
                            
                            <div className="col-lg-5 ml-auto">
                                <div className="unique-reach-content">
                                    <div className="section-title">
                                        <h3>{Parser(feature_list_title)}</h3>
                                        <p>{Parser(feature_description)}</p>
                                    </div>
                                    
                                    <ul className="vertical-line-wrapper unique-reach-wrapper">
                                        <span className="vertical-line unique-reach-line"></span>
                                        {featureListMarkup}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    : ''}
                </div>
            </div>
          </Fragment>
        )
    }
}

export default SupplierProfilesReach;