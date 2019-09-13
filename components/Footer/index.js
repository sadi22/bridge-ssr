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
                <motion.li 
                    key={item.ID}
                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" } : { translateY: 50, opacity: 0, visibility:"hidden" }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 500,
                        delay: index * 0.6,
                        default: { duration: 0.6 },
                    }}
                >
                    <Link
                        as={`${as}`}
                        href="/[slug]"
                        key={item.ID}
                        activeClassName='active'
                    >
                        <a>{item.title}</a>
                    </Link>
                </motion.li>
            );
        });
        return (
            <footer className="site-footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="footer-logo">
                                { logo ? (
                                    <Link href="/" as='/'>
                                        <a>
                                            <motion.img 
                                                src={logo}
                                                initial={!inViewport && { translateY: 50, opacity: 0, visibility:"hidden" }}
                                                animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" } : { translateY: 50, opacity: 0, visibility:"hidden" }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 500,
                                                    delay: 0.6,
                                                    default: { duration: 0.6 },
                                                }}
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
                                    <motion.li
                                        style={{marginRight: '10px'}}
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 500,
                                            delay: 0.6,
                                            default: { duration: 0.6 },
                                        }}
                                    >
                                        <a 
                                            href={social.facebook} 
                                            title="Facebook" 
                                            target='_balnk'
                                            
                                        ><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a>
                                    </motion.li>
                                    <motion.li
                                        initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 500,
                                            delay: 0.6,
                                            default: { duration: 0.6 },
                                        }}
                                    >
                                        <a href={social.linkedin} title="Linked-in" target='_balnk'>
                                            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                                        </a>
                                    </motion.li>
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
        )
    }
}

export default handleViewport(Footer, {}, {disconnectOnLeave: false});