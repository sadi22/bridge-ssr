/* eslint-disable */
import React, { Component, Fragment } from 'react'
import Link from 'next/link';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"
import $ from "jquery";
import Config from '../../config';
import axios from 'axios';
import handleViewport from 'react-in-viewport';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faCaretDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit, faCaretDown, faEnvelope);

import {Fade} from 'react-reveal';

import "./index.scss";

config.autoAddCss = false;

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Banner extends Component{
    constructor(props) {
      super(props);
      this.state = {
          email: '',
          startSubmission: false,
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

    handleChange = evt => {
      this.setState({
          [evt.target.name]: evt.target.value,
      });
    };

    handleSubmit = (formID,evt) => {
      evt.preventDefault();
      this.setState({
          startSubmission : !this.state.startSubmission
      });
      axios({
          method: 'post',
          url: `${Config.apiUrl}/bridge/v1/forms/${formID}`,
          data: {
              email:this.state.email,
          },
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        },
        )
        .then((response) => {
          toast.success("🔥 Congratulations. You will be notified", {
              position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch((error) => {
            console.log(error);
          toast.error("⚠️ Upps! Something wrong !", {
              position: toast.POSITION.TOP_RIGHT
          });
        })
        .then(() => {
          this.setState({
              startSubmission : !this.state.startSubmission
          })
        });
    }
    render() {
        const {image, heading, description, enable_user_type_dropdown, user_heading, text, user, user_type, gravity_form_id } = this.props;
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
                  <a className={`button user-type-link ${item.type.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').toLowerCase()}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>
                  </a>
              </Link>
                
            );
          });
        }
        return (
          <Fragment>
            <div className="bridge-banner pos-relative">
                    
                  <motion.div
                      initial={{ height:0 }}
                      animate={inViewport ? { height:"77%" } : { height:0 }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 500,
                        delay: 0,
                      }} 
                      className="overlay"
                  ></motion.div>
                  
                  <div className="container">
                      <div className="row">
                          <div className="col-12">
                                <div className="banner-content text-center">
                                  
                                  <div className="banner-text">
                                    <Fade ssrFadeout  bottom delay={800} duration={1000}><h1>{ heading } </h1></Fade>
                                    <Fade ssrFadeout  bottom delay={1100} duration={1000}><p>{description}</p></Fade>
                                  </div>

                                  {gravity_form_id && 
                                    <Fade ssrFadeout  bottom delay={1300} duration={1000}>
                                        <div class="newsletter-form">
                                            <form onSubmit={this.handleSubmit.bind(this, gravity_form_id)}>
                                                <span className="input-wrapper pos-relative">
                                                  <FontAwesomeIcon icon={["fas", "envelope"]} />
                                                  <input type="email" name="email" placeholder="Enter your email" required/>
                                                </span>
                                                <button class="btn-default">
                                                  Get Started
                                                  {!this.state.startSubmission &&<svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>}
                                                  {this.state.startSubmission && <Spinner animation="border" variant="light" size="sm" style={{marginLeft: '5px'}}/>}
                                                </button>
                                            </form>
                                        </div>
                                    </Fade>}

                                  

                                  { image ? <Fade ssrFadeout  delay={1500} duration={1000}><img 
                                      src={image.url} 
                                      alt={image.alt} 
                                      title={image.title} 
                                      className="banner-img img-fluid" 
                                      
                                  /></Fade>: ''}
                              </div>

                              {enable_user_type_dropdown ? 
                                <div className="banner-select-option text-center bridge-user-type-container">
                                  <Fade ssrFadeout  bottom delay={500} duration={1000}><p>{Parser(user_heading)}</p>
                                    <div className="business-type-area">
                                        <h3><span>{text}</span></h3>
                                        <div className="bridge-select-container">
                                            {currentType}
                                            <div className='select-items-container' style={this.state.showUserTypeDropDown ? {display: 'block'} : {display: 'none'}}>
                                              {userDropdownMarkup}
                                            </div>
                                        </div>
                                        {userDropdownLinkMarkup}
                                    </div>
                                    </Fade>
                                </div>
                              : ''}
                          </div>
                      </div>
                  </div>
              </div>
              
          </Fragment>
        )
    }
}

export default handleViewport(Banner, {}, {disconnectOnLeave: false});
