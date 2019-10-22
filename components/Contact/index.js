/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import $ from "jquery";
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import "./index.scss";
import axios from 'axios';
import MapContainer from './Map';
import {Spinner,Button} from 'react-bootstrap'
import {  toast } from 'react-toastify';
import Config from '../../config';
import ScrollAnimation from 'react-animate-on-scroll';
import {Fade, Zoom} from 'react-reveal';

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            msg: '',
            inquiry:'',
            freeAudit: true,
            startSubmission: false,
        };
    }
    static defaultProps = {
      center: {
        lat: 27.941930,
        lng: -82.466850
      },
      zoom: 11
    };
    componentDidMount(){
        // $('.contact-single-input').on('click', function(e){
        //     e.stopPropagation();
        //     $(this).children('label').hide();
        // });

        $("input, textarea").focus(function() { 
            // $(this).children('label').hide();
            $(this).parent().find('label').hide();
        });

        // $('body').on('click', function(){
        //     $('.contact-single-input').each(function(){
        //         var eachVal = $(this).children('.inputVal').val();
        //         if(eachVal) {
        //             $(this).children('label').hide();
        //         }else {
        //             $(this).children('label').show();
        //         }
        //     });
        // });
    }
    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    handleCheckClick = (evt) => {
        this.setState({ freeAudit: !this.state.freeAudit });
    }

    onChange = () => {
        this.setState({inquiry: event.target.value});
        
    }

  
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
                fullName:this.state.fullName,
                msg:this.state.msg,
            },
          
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
        const { title, description, api, location, gravity_form_id } = this.props;
        const { inViewport } = this.props;
        return (
            <Fragment>
            <div className="bridge-contact pos-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="contact-content">
                                <div className="section-title">
                                    <Fade ssrFadeout  bottom delay={800} duration={1000}>
                                        <h2>{Parser(title)}</h2>
                                    </Fade>
                                    <Fade ssrFadeout  bottom delay={900} duration={1000}>
                                        <p>{Parser(description)}</p>
                                    </Fade>
                                </div>
                                {gravity_form_id &&
                                <form onSubmit={this.handleSubmit.bind(this, gravity_form_id)} className="contact-form">
                                    <Fade ssrFadeout  left delay={1000} duration={1000}>
                                        <div className="contact-single-input">
                                            <label htmlFor="contactEmail">Enter your email<span>*</span></label>
                                            <input type="email" name="email" id="contactEmail" value={this.state.email} onChange={this.handleChange} className="inputVal" required/>
                                        </div>
                                    </Fade>
                                    
                                    <Fade ssrFadeout  left delay={1100} duration={1000}>
                                    <div className="contact-single-input">
                                        <label htmlFor="contactfName">Full Name<span>*</span></label>
                                        <input type="text" name="fullName" id="contactfName" className="inputVal" value={this.state.fullName} onChange={this.handleChange} className="inputVal" required/>
                                    </div>
                                    </Fade>
                                    <Fade ssrFadeout  left delay={1200} duration={1000}>
                                    <div className="contact-single-input">
                                        <label htmlFor="contactMsg">How can we help you<span>*</span></label>
                                        <textarea name="msg" id="msg" cols="30" rows="10" value={this.state.msg} onChange={this.handleChange} className="inputVal" required></textarea>
                                    </div>
                                    </Fade>
                                    <Fade ssrFadeout  left delay={1300} duration={1000}>
                                    <div className="contact-single-input">
                                        <div className="bridge-switcher">
                                            <span className="title">Request a free technical audit of your organization, organize an online demo, or just let us know you are interested in learning <a href="">more</a>.</span>
                                        </div>
                                    </div>
                                    </Fade>
                                    <Fade ssrFadeout  left delay={1400} duration={1000}>
                                    <div className="contact-single-input submit-btn">
                                        <Button className="btn-default" type="submit">
                                            Send
                                            {this.state.startSubmission && <Spinner animation="border" variant="light" size="sm" style={{marginLeft: '5px'}}/>}
                                        </Button>
                                    </div>
                                    </Fade>
                                </form>}
                            </div>
                        </div>
                    </div>
                </div>
                
                <Fade ssrFadeout  delay={800} duration={1000}>
                    <div className="google-map overlay">
                        <MapContainer apiKey={api} location={location}/>
                    </div>
                </Fade>
            </div>
            </Fragment>
        )
    }
}
export default Contact;
