/* eslint-disable */
import React, { Component, Fragment } from 'react'
import Link from 'next/link';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"
import $ from "jquery";
import handleViewport from 'react-in-viewport';
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faCaretDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit, faCaretDown, faEnvelope);
import Router from 'next/router'
import "./index.scss";

config.autoAddCss = false;

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class UserType extends Component{
    constructor(props) {
      super(props);
      this.state = {
          email: '',
          startSubmission: false,
          showUserTypeDropDown: false
      };
    }

    componentDidMount(){
      document.addEventListener('click', this.bodyClickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.bodyClickHandler);
    }

    bodyClickHandler = (e)  => {
      if(e.target.matches('.select-selected')) {
        this.setState({
          showUserTypeDropDown: true
        })
      }else {
        this.setState({
          showUserTypeDropDown: false
        })
      }
    }

    userTypeSelect = (i, type, e) => {
      $('.currentType').html(type);
      $('.user-type-selected-link').hide();
      $(`.user-type-link-${i}`).css('display', 'flex');
    }

    render() {
        const { user_heading, text, user } = this.props;
        const { inViewport } = this.props;
        let userDropdownMarkup = null;
        let userDropdownLinkMarkup = null;
        let defaultOption = '';
        let currentType = null;
        if(user){            
          userDropdownMarkup = user.map((item, i) => {
            const slug = item.link ? getSlug(item.link) : '';
            let actualPage = slug ? 'page' : '';
            let as = actualPage === 'page' ? `/${slug}` : `/${actualPage}/${slug}` ;
            if(i==0) currentType = <div className='select-selected currentType'>{item.type}</div>
            return (
                <Fragment key={i}>
                    <div className='userdropdownType'>
                      <Link
                          as={`${as}`}
                          href="/[slug]"
                          key={i}
                      >
                          <a className={`user-type-link`}>{item.type}</a>
                      </Link>
                    </div>
                </Fragment>
                
            );
          });

          userDropdownLinkMarkup = user.map((item, i) => {
            const slug = item.link ? getSlug(item.link) : '';
            let actualPage = slug ? 'page' : '';
            let as = actualPage === 'page' ? `/${slug}` : `/${actualPage}/${slug}` ;
            return (
              <Link
                  as={`${as}`}
                  href="/[slug]"
                  key={i}
              >
                  <a className={`button user-type-selected-link user-type-link-${i} ${item.type.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').toLowerCase()}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>
                  </a>
              </Link>
                
            );
          });
        }
      
        return (
          <Fragment>
            <div className="bridge-user-type-container pos-relative">
                  <div className="container">
                      <div className="row">
                          <div className="col-12">
                                <motion.div 
                                    className="banner-select-option text-center"
                                    initial={false}
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{translateY: 50, visibility:"hidden"}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 500,
                                    }}
                                    >
                                    <p>{Parser(user_heading)}</p>
                                    <div className="user-type-area">
                                        <h3><span>{text}</span></h3>
                                        <div className="bridge-select-container">
                                            {currentType}
                                            <div className='select-items-container' style={this.state.showUserTypeDropDown ? {display: 'block'} : {display: 'none'}}>
                                              {userDropdownMarkup}
                                            </div>
                                           
                                        </div>
                                    </div>
                                </motion.div>
                          </div>
                      </div>
                  </div>
              </div>
              
          </Fragment>
        )
    }
}

export default handleViewport(UserType, {}, {disconnectOnLeave: false});
