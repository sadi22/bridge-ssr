/* eslint-disable */
import React, { Component, Fragment } from 'react';
import {Col} from 'react-bootstrap';
import Link from 'next/link';
import Parser from 'html-react-parser';
import "./index.scss";


function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

class SinglePost extends Component{
    render() {        
        const {title, excerpt, link, featured_image, slug, author_name, date_gmt, category_info} = this.props;
        return (
            <Fragment>
                <Col md={12}>
                    <div className="single-post">
                        <div className="single-post-wrapper">
                            <div className="single-post-featured-img">
                                <Link
                                    as={`/post/${slug}`}
                                    href={`/post?slug=${slug}&apiRoute=post`}
                                >
                                    <a><img src={featured_image ? featured_image.source_url : 'https://via.placeholder.com/300'} alt={featured_image ? featured_image.alt_text : ''} alt={featured_image ? featured_image.alt_text : ''} title={featured_image ? featured_image.media_details.image_meta.title : ''} className="img-fluid" /></a>
                                </Link>
                            </div>
        
                            <div className="single-post-content">
                                <div className='post-header'>
                                    <Link
                                        as={`/post/${slug}`}
                                        href={`/post?slug=${slug}&apiRoute=post`}
                                    >
                                        <a><h1>{title.rendered}</h1></a>
                                    </Link>
                                </div>

                                <div className='post-meta'>
                                    <ul className='d-inline'>
                                        <li>
                                            <span itemProp="name">By: <span itemProp="author" itemScope="" itemType="http://schema.org/Person">{author_name}</span></span>
                                        </li>
                                        <li>
                                            <time className="entry-date published updated" dateTime={date_gmt} itemProp="datePublished" pubdate={date_gmt}>{date_gmt ? formatDate(new Date(date_gmt)) : ''}</time>
                                        </li>

                                        <li>
                                            {Object.keys(category_info).map((item,i) => 
                                                <Link
                                                    as={`/category/${category_info[item].term_slug}`}
                                                    href={`/category?slug=${category_info[item].term_slug}&apiRoute=post`}
                                                    key={item}
                                                >
                                                    <a>{category_info[item].term_name}</a>
                                                </Link>
                                            )}
                                        </li>
                                    </ul>
                                </div>

                                {Parser(excerpt.rendered.substring(0,300))}
                                
                                <Link
                                    as={`/post/${slug}`}
                                    href={`/post?slug=${slug}&apiRoute=post`}
                                >
                                    <a className="read-more">Read more</a>
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