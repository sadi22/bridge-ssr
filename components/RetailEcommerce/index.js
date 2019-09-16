/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import { Enhance } from "../Enhance";
import { toast } from 'react-toastify';
import Config from '../../config';
import {Spinner,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faCaretDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
library.add(faEdit, faCaretDown, faEnvelope);
import ScrollAnimation from 'react-animate-on-scroll';

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
                                <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                                    <h2>{Parser(title)}</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOnce={true} delay={300}>
                                    <p className='primary-color'>{Parser(sub_title)}</p>
                                </ScrollAnimation>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <ScrollAnimation
                                className="retailer-content"
                                animateIn="fadeInUp" animateOnce={true} delay={300}
                            >
                                {Parser(left_text)}
                                {gravity_form_id &&  <ScrollAnimation
                                    className="newsletter-form retailer-newsletter-form"
                                    animateIn="fadeInUp" animateOnce={true} delay={400}
                                    >
                                    <h6>{Parser(getting_started_text)}</h6>
                                    <form onSubmit={this.handleSubmit.bind(this, gravity_form_id)}>
                                        <span className="input-wrapper pos-relative">
                                            <FontAwesomeIcon icon={["fas", "envelope"]} />
                                            <input type="email" name="email" placeholder="Enter your email" required/>
                                        </span>
                                        <button className="btn-default">
                                            Get Started
                                            {this.state.startSubmission && <Spinner animation="border" variant="light" size="sm" style={{marginLeft: '5px'}}/>}
                                        </button>
                                    </form>
                                </ScrollAnimation>}
                            </ScrollAnimation>
                        </div>
                        <div className="col-lg-6">
                            <div className={`${enable_drop_shadow ? 'image-shadow' : ''} retailer-image pos-relative`}>
                                
                                {right_image ? 
                                <ScrollAnimation 
                                    className="img-wrapper"
                                    animateIn="slideInRight" animateOnce={true} delay={600}
                                    >
                                    <motion.img 
                                    src={right_image.url} alt={right_image.alt} title={right_image.title} className="img-fluid"
                                    whileHover={{
                                        scale: 1.1
                                    }}
                                    />
                                </ScrollAnimation>: ''}
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
