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
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
    componentDidMount(){
        $('.contact-single-input').on('click', function(e){
            e.stopPropagation();
            $(this).children('label').hide();
        });

        $('body').on('click', function(){
            $('.contact-single-input').each(function(){
                var eachVal = $(this).children('.inputVal').val();
                
                if(eachVal) $(this).children('label').hide();
                if(!eachVal ) $(this).children('label').show();
                
                $(this).siblings().children('label').show();
            });
        });
    }
    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    handleCheckClick = (evt) => {
        console.log(this.state);
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
                                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                                        <h2>{Parser(title)}</h2>
                                    </ScrollAnimation>
                                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                                        <p>{Parser(description)}</p>
                                    </ScrollAnimation>
                                </div>
                                {gravity_form_id &&
                                <form onSubmit={this.handleSubmit.bind(this, gravity_form_id)} className="contact-form">
                                    <ScrollAnimation className="contact-single-input" animateIn="fadeInUp" delay={500} animateOnce={true}>
                                        <label htmlFor="contactEmail">Enter your email<span>*</span></label>
                                        <input type="email" name="email" id="contactEmail" value={this.state.email} onChange={this.handleChange} className="inputVal" required/>
                                    </ScrollAnimation>
                                
                                    <ScrollAnimation className="contact-single-input" animateIn="fadeInUp" delay={600} animateOnce={true}>
                                        <label htmlFor="contactfName">Full Name<span>*</span></label>
                                        <input type="text" name="fullName" id="contactfName" className="inputVal" value={this.state.fullName} onChange={this.handleChange} className="inputVal" required/>
                                    </ScrollAnimation>
                                    <ScrollAnimation className="contact-single-input" animateIn="fadeInUp" delay={700} animateOnce={true}>
                                        <label htmlFor="contactMsg">How can we hlep you<span>*</span></label>
                                        <textarea name="msg" id="msg" cols="30" rows="10" value={this.state.msg} onChange={this.handleChange} className="inputVal" required></textarea>
                                    </ScrollAnimation>

                                    <ScrollAnimation className="contact-single-input" animateIn="fadeInUp" delay={800} animateOnce={true}>
                                        <div className="bridge-switcher">
                                            <span className="title">Request a free technical audit of your organization, organize an online demo, or just let us know you are interested in learning <a href="">more</a>.</span>
                                        </div>
                                    </ScrollAnimation>
                                  
                                    <ScrollAnimation className="contact-single-input submit-btn" animateIn="fadeInUp" delay={900} animateOnce={true}>
                                        <Button className="btn-default" type="submit">
                                            Send
                                            {this.state.startSubmission && <Spinner animation="border" variant="light" size="sm" style={{marginLeft: '5px'}}/>}
                                        </Button>
                                    </ScrollAnimation>
                                </form>}
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollAnimation className="google-map overlay" animateIn="fadeInUp" delay={300} animateOnce={true}>
                    <MapContainer apiKey={api} location={location}/>
                </ScrollAnimation>
            </div>
            </Fragment>
        )
    }
}
export default Contact;
