/* eslint-disable */
import React, { Component, Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link';

import style from "./index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit);

const getSlug = url => {
    console.log(url);
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
};
class Footer extends Component{
    render() {
        const { logo, menu, social, footer_text } = this.props;
        const menuItems = menu.items.map(item => {
            const slug = getSlug(item.url);
            let actualPage = 'page';
            if(item.object === 'page') {
                actualPage = 'page'
            }else if(item.object === 'post') {
                actualPage = 'post'
            }else if(item.object === 'category') {
                actualPage = 'category'
            }
            return (
                <li key={item.ID}>
                    <Link
                        as={`/${item.object}/${slug}`}
                        href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                        key={item.ID}
                    >
                        <a>{item.title}</a>
                    </Link>
                </li>
            );
        });
        return (
          <Fragment>
            <div>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </div>

            <footer className="site-footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="footer-logo">
                                { logo ? (
                                    <Link href="/">
                                        <a><img src={logo}/></a>
                                    </Link>
                                ) : '' }
                            </div>    
                        </div>
                        <div className="col-lg-6">
                            <div className="footer-menu text-center">
                                <ul>
                                    {menuItems}
                                </ul>
                            </div> 
                        </div>
                        <div className="col-lg-3">
                            <div className="footer-social-contact text-center">
                                <ul>
                                    <li><a href={social.facebook} title="Facebook" target='_balnk'><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a></li>
                                    <li><a href={social.linkedin} title="Linked-in" target='_balnk'><FontAwesomeIcon icon={["fab", "linkedin-in"]} /></a></li>
                                </ul>
                            </div> 
                        </div>
                    </div>
                    
                    <div className="row copyright-text text-center">
                        <div className="col-12">
                            <p>{footer_text}</p>
                        </div>
                    </div>
                </div>
            </footer>
          </Fragment>
        )
    }
}

export default Footer;