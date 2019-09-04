/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import { Enhance } from "../Enhance";
import { ToastContainer, toast } from 'react-toastify';
import Config from '../../config';
import {Spinner,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faCaretDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import "./index.scss";


class RetailEcommerce extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            startSubmission: false,
        };
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
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST',
                'Access-Control-Allow-Headers':'application/json',
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
        const {title, sub_title, left_text, right_image, show_background, enable_drop_shadow, enable_double_line_heading, gravity_form_id, getting_started_text } = this.props;
        const { inViewport } = this.props;
        return (
            <Fragment>
            <div className="retail-ecommerce">
                <div className="container">
                    <div className="row">
                        <div className={`${enable_double_line_heading ? 'col-lg-8' : 'col-12'} m-auto`}>
                            <div className="section-title text-center">
                                <motion.h2
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    default: { duration: 0.8 },
                                    }}
                                >{Parser(title)}</motion.h2>
                                <motion.p
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    delay: 0.5,
                                    default: { duration: 0.8 },
                                    }}
                                >{Parser(sub_title)}</motion.p>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="retailer-content"
                                initial={{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    delay: 0.8,
                                    duration: 0.8,
                                }}
                            >
                                {Parser(left_text)}
                                {gravity_form_id &&  <motion.div
                                    className="newsletter-form retailer-newsletter-form"
                                    initial={{ translateY: 50, opacity: 0, visibility:"hidden" } }
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    delay: 0.9,
                                    default: { duration: 0.8 },
                                    }}
                                    >
                                    <h6>{Parser(getting_started_text)}</h6>
                                    <form onSubmit={this.handleSubmit.bind(this, gravity_form_id)}>
                                        <span className="input-wrapper pos-relative">
                                            <FontAwesomeIcon icon={["fas", "envelope"]} />
                                            <input type="email" name="email" placeholder="Enter your email" required/>
                                        </span>
                                        <button class="btn-default">
                                            Get Started
                                            {this.state.startSubmission && <Spinner animation="border" variant="light" size="sm" style={{marginLeft: '5px'}}/>}
                                        </button>
                                    </form>
                                </motion.div>}
                            </motion.div>
                        </div>

                        <div className="col-lg-6">
                            <div className={`${enable_drop_shadow ? 'image-shadow' : ''} retailer-image pos-relative`}>
                                <div className="lines-accent">
                                    { show_background ? <motion.img
                                    src='/static/images/lines-accent.png'
                                    initial={{ translateX: 100, opacity: 0, visibility:"hidden" }}
                                    animate={inViewport ? { translateX: 0, opacity: 1, visibility:"visible" }:{ translateX: 100, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 500,
                                        delay: 1,
                                        duration: 1,
                                    }}
                                    /> : '' }
                                </div>
                                {right_image ? <motion.img
                                src={right_image.url} alt={right_image.alt} title={right_image.title} className="img-fluid"
                                initial={{ translateY: 100, opacity: 0, visibility:"hidden" }}
                                animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }:{ translateY: 100, opacity: 0, visibility:"hidden" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    delay: 1.4,
                                    duration: 1,
                                }}
                                />: ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default handleViewport(RetailEcommerce, { rootMargin: '-10.0px' }, {disconnectOnLeave: false});
