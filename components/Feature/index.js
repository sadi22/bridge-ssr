/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Parser from 'html-react-parser';
import style from "./index.scss";


class Feature extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var changed_img = document.getElementsByClassName('feature-list-hovered-image');
        var items = document.getElementsByClassName('feature-list');
        var item_height = document.getElementsByClassName('feature-list')[0].offsetHeight;
        document.getElementsByClassName('line')[0].style.height = item_height + 'px';

        for(var i=0; i<items.length; i++) {

            items[i].onmouseover = function(e) {
                var myTarget = e.target;
                var imgSrc = myTarget.getAttribute('data-src');
                changed_img[0].setAttribute('src', imgSrc);
                e.target.parentElement.querySelectorAll( ".active" ).forEach( e => e.classList.remove( "active" ) );
                e.target.classList.add( "active" );
                var this_item_height = myTarget.offsetHeight;
                var target_offset = myTarget.offsetTop;
                document.getElementsByClassName('line')[0].setAttribute("style", "top: "+target_offset+"px; height: "+this_item_height+"px;");

            }
        }
    }
    
    render() {
        const {title, description, feature_list, show_more, show_more_link} = this.props;
        let defaultImage = '';
        let featureListMarkup = null;
    	if(feature_list){
    		featureListMarkup = feature_list.map((feature, i) => {
                if(i == 0) defaultImage = feature.feature_image.url;
			    return (
                    <li className="feature-list active" data-src={feature.feature_image.url} key={i}>{feature.feature_title}</li>
			      );
			    });
    	}
        return (
          <Fragment>
             <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
            />
            
            <div className="feature">
                
                <div className="feature-list-image">
                    <img src="/static/images/feature-list-lines-accent.png" alt="bg-img" className="bg-image" />
                </div>
            
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{Parser(title)}</h2>
                                <p>{Parser(description)}</p>
                            </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="feature-content">
                                <ul id="feature_list">
                                    <span className="line"></span>
                                    {featureListMarkup}
                                </ul>

                                { show_more ? 
                                    <Link href={show_more_link} as={show_more_link}>
                                        <a className="show-more">Show more</a>
                                    </Link>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="hovered-image-wrapper">
                    <img src={defaultImage} alt="hovered-image" className="feature-list-hovered-image" />
                </div>
            </div>
          </Fragment>
        )
    }
}

export default Feature;