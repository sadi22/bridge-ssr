/* eslint-disable */
import React, { Component, Fragment } from 'react';
import {Col} from 'react-bootstrap';
import Link from 'next/link';
import Parser from 'html-react-parser';
import "./index.scss";


class SinglePost extends Component{
    render() {        
        const {title, excerpt, link, featured_image, slug} = this.props;
        console.log(featured_image);
        return (
            <Fragment>
                <Col md={12}>
                    <div className="single-post">
                        <div className="single-post-wrapper">
                            <div className="single-post-img">
                                <Link
                                    as={`/post/${slug}`}
                                    href={`/post?slug=${slug}&apiRoute=post`}
                                >
                                    <a><img src={featured_image ? featured_image.media_details.sizes.medium.source_url : 'https://via.placeholder.com/300'} alt={featured_image ? featured_image.alt_text : ''} alt={featured_image ? featured_image.alt_text : ''} title={featured_image ? featured_image.media_details.image_meta.title : ''} className="img-fluid" /></a>
                                </Link>
                                
                            </div>
        
                            <div className="single-post-content">
                                <Link
                                    as={`/post/${slug}`}
                                    href={`/post?slug=${slug}&apiRoute=post`}
                                >
                                    <a><h2>{title.rendered}</h2></a>
                                </Link>

                                {Parser(excerpt.rendered.substring(0,300))}
                                
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
            </Fragment>
        )
    }
}

export default SinglePost;