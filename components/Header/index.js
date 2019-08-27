/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import { Navbar, Nav } from "react-bootstrap";

import Config from '../../config';
import style from "./index.scss";

const linkStyle = {
    marginRight: 15,
};

const getSlug = url => {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Menu extends Component {
    state = {
        token: null,
        username: null,
    };

    componentDidMount() {
        const token = localStorage.getItem(Config.AUTH_TOKEN);
        const username = localStorage.getItem(Config.USERNAME);
        this.setState({ token, username });
    }

    render() {
        const { menu, logo, getting_started_link } = this.props;
        const { token, username } = this.state;
        let menuItems = null;
        if(menu.items) {
            menuItems = menu.items.map(item => {
                if (item.object === 'custom') {
                    return (
                        <Link href={item.url} key={item.ID}>
                            <a style={linkStyle}>{item.title}</a>
                        </Link>
                    );
                }
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
                    <Link
                        as={`/${item.object}/${slug}`}
                        href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                        key={item.ID}
                    >
                        <a style={linkStyle}>{item.title}</a>
                    </Link>
                );
            }); 
        }
       
        const getting_started_slug = getSlug(getting_started_link);
        let getting_started_actualPage = 'page';
        
        return (
            <div>
                <style
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: style }}
                />
                <header className="header-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Navbar expand="lg">
                                    <Navbar.Brand href="#home">
                                        { logo ? (
                                            <Link href="/">
                                                <img src={logo}/>
                                            </Link>
                                        ) : '' }
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="m-auto">
                                            <Link href="/">
                                                <a style={linkStyle}>Home</a>
                                            </Link>
                                            {menuItems}
                                        </Nav>
                                        <Link
                                            as={`/${getting_started_actualPage}/${getting_started_slug}`}
                                            href={`/${getting_started_actualPage}?slug=${getting_started_slug}&apiRoute=${getting_started_actualPage}`}
                                        >
                                            <a className="getStarted"> Get Started
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>
                                            </a>
                                        </Link>
                                    </Navbar.Collapse>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </header>

            </div>
        );
    }
}
export default Menu;
