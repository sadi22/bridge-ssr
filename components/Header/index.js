/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Children } from 'react';
import $ from 'jquery';
import Link from '../ActiveLink'
import { Navbar, Nav } from "react-bootstrap";
import handleViewport from 'react-in-viewport';
import Config from '../../config';
import { CSSTransition } from "react-transition-group";
import {Fade} from 'react-reveal';
import "./index.scss";

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
        
        //------sticky menu----
        $(window).on('scroll', function () {
            if ($(this).scrollTop() >= 5) {
                $(".header-main").addClass("sticked");
            } else {
                $(".header-main").removeClass("sticked");
            }
        });
    }

    render() {
        const { menu, logo, getting_started_link } = this.props;
        const { inViewport } = this.props;
        let menuItems = null;       
        if(menu.items) {
            menuItems = menu.items.map((item, index) => {
                if (item.object === 'custom') {
                    return (
                        <Link activeClassName='active' href={item.url} key={item.ID}>
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
                let as = item.object === 'page' ? `/${slug}` : `/${item.object}/${slug}`;
                return (
                    
                    <Link
                        as={`${as}`}
                        href="/[slug]"
                        key={item.ID}
                        activeClassName='active'
                    >
                        <a style={linkStyle}>{item.title}</a>
                    </Link>
                );
            }); 
        }
       
        let getting_started_slug = '/';
        let getting_started_actualPage = '';
        let getStartedLink = () => {
            return (
                <Link
                    as='/'
                    href='/'
                >
                    <a className="getStarted"> Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>
                    </a>
                </Link>
            );
        };     
        if(getting_started_link) {
            getting_started_slug = getSlug(getting_started_link);
            getting_started_actualPage = 'page';
            getStartedLink = () => {
                return (
                    
                    <Link
                        as={`/${getting_started_slug}`}
                        href="/[slug]"
                    >
                        <a className="getStarted"> Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9">
                                <g><g>
                                    <path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/>
                                </g></g>
                            </svg>
                        </a>
                    </Link>
                );
            }
        } 
        return (
            <Fade delay={600} duration={1000}>
            <header className="header-main">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Navbar expand="lg">
                                <Navbar.Brand href="/">
                                    { logo ? (
                                        <Link
                                            as='/' 
                                            href="/"
                                        >
                                            <img src={logo}/>
                                        </Link>
                                    ) : '' }
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="m-auto">
                                        {menuItems}
                                    </Nav>
                                    {getStartedLink()}
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </div>
                </div>
            </header>
</Fade>
        );
    }
}
export default handleViewport(Menu, {}, {disconnectOnLeave: true});
