/* eslint-disable */
import React, { Component, Fragment } from 'react';
import {Col} from 'react-bootstrap';
import Link from 'next/link';
import Parser from 'html-react-parser';

import style from "./index.scss";


class CaseStudy extends Component{
    render() {        
        const {title, excerpt, link, featured_image, slug} = this.props;
        return (
            <Col md={12}>
                <div className="single-post">
                    <div className="single-post-wrapper">
                        <div className="single-post-img">
                            <img src={featured_image ? featured_image.media_details.sizes.medium.source_url : 'https://via.placeholder.com/300'} className="img-fluid" />
                        </div>
    
                        <div className="single-post-content">
                            <Link
                                as={`/post/${slug}`}
                                href={`/post?slug=${slug}&apiRoute=post`}
                            >
                                <a><h2>{title.rendered}</h2></a>
                            </Link>

                            {Parser(excerpt.rendered)}
                            
                            <Link
                                as={`/post/${slug}`}
                                href={`/post?slug=${slug}&apiRoute=post`}
                            >
                                <a className="btn-default">Read more</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Col>
           
        )
    }
}

export default CaseStudy;