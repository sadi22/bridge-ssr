/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import handleViewport from 'react-in-viewport';
import { motion } from "framer-motion"
import $ from "jquery";
import Config from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Spinner,Button} from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';

import "./index.scss";


class BottomCTA extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            company: '',
            startSubmission: false,
        };
    }

    componentDidMount(){
        $('.single-input').on('click', function(e){
            e.stopPropagation();
            $(this).children('label').hide();
        });

        $('body').on('click', function(){
            $('.single-input').each(function(){
                var eachVal = $(this).children('input').val();

                if(eachVal) $(this).children('label').hide();
                if(!eachVal) $(this).children('label').show();
                $(this).siblings().children('label').show();
            });
        });
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
        let $_this = this;
        axios({
            method: 'post',
            url: `${Config.apiUrl}/bridge/v1/forms/${formID}`,
            data: {
                fullName:this.state.fullName,
                email:this.state.email,
                company:this.state.company,
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
        const {title, sub_title, gravity_form_id} = this.props;
        const { inViewport } = this.props;
        return (
            <Fragment>
            <div 
                className="bottom-cta"
                
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{Parser(title)}</h2>
                                <p>{Parser(sub_title)}</p>
                            </div>
                        </div>
                    </div>
                    {gravity_form_id &&
                    <form
                        onSubmit={this.handleSubmit.bind(this, gravity_form_id)}
                        className="cta-contact-form"
                        >
                        <div className="row align-items-end">
                            <div className="col-lg-3 col-md-6">
                                <div className="single-input">
                                    <label htmlFor="ctaEmail">Email<span>*</span></label>
                                    <input type="email" name="email" id="ctaEmail" value={this.state.email} onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-input">
                                    <label htmlFor="ctafName">Full Name<span>*</span></label>
                                    <input type="text" name="fullName" id="ctafName" value={this.state.fullName} onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-input">
                                    <label htmlFor="ctaCompany">Company<span>*</span></label>
                                    <input type="text" name="company" id="ctaCompany" value={this.state.company} onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-input">
                                    <Button className="btn-default" type="submit">
                                        Request Demo
                                        {this.state.startSubmission && <Spinner animation="border" variant="light" size="sm" style={{marginLeft: '5px'}}/>}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>}

                </div>
            </div>
            </Fragment>
        )
    }
}
export default BottomCTA;
