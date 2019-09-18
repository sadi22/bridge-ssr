/* eslint-disable */
import React, { Component, Fragment } from 'react'
import handleViewport from 'react-in-viewport';
import Link from '../ActiveLink'
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion"
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit);
import {Fade} from 'react-reveal';

const getSlug = url => {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
};
class Footer extends Component{
    render() {
        const { logo, menu, social, footer_text } = this.props;
        const { inViewport } = this.props;
        const menuItems = menu.items.map((item, index) => {
            const slug = getSlug(item.url);
            let actualPage = 'page';
            if(item.object === 'page') {
                actualPage = 'page'
            }else if(item.object === 'post') {
                actualPage = 'post'
            }else if(item.object === 'category') {
                actualPage = 'category'
            }
            let as = item.object === 'page' ? `/${slug}` : `/${item.object}/${slug}`;
            return (
                <li 
                    key={item.ID}
                    
                >
                    <Link
                        as={`${as}`}
                        href="/[slug]"
                        key={item.ID}
                        activeClassName='active'
                    >
                        <a>{item.title}</a>
                    </Link>
                </li>
            );
        });
        return (
        <Fade ssrFadeout bottom delay={600} duration={1000}>
            <footer className="site-footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="footer-logo">
                                { logo ? (
                                    <Link href="/" as='/'>
                                        <a>
                                            <img 
                                                src={logo}
                                                
                                            />
                                        </a>
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
                                    <li style={{marginRight: '10px'}}>
                                        <a 
                                            href={social.facebook} 
                                            title="Facebook" 
                                            target='_balnk'
                                            
                                        ><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a>
                                    </li>
                                    <li>
                                        <a href={social.linkedin} title="Linked-in" target='_balnk'>
                                            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                                        </a>
                                    </li>
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
        </Fade>
        )
    }
}

export default handleViewport(Footer, {}, {disconnectOnLeave: false});
