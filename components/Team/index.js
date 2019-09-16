/* eslint-disable */
import React, { Component, Fragment } from 'react';
import  "./index.scss";
import handleViewport from 'react-in-viewport';
import Parser from 'html-react-parser';
import { motion } from "framer-motion"

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import ScrollAnimation from 'react-animate-on-scroll';


const TeamBlock = (props) => {
    const { inViewport, innerRef, team, index } = props;
    return (
        <div className="col-lg-4 col-sm-6 single-col" ref={innerRef}>
            <div className="single-member text-center">
                <ScrollAnimation className="member-img overflow" animateIn="zoomIn" animateOnce={true}>
                    {team.image ? 
                    
                    <motion.img
                        src={team.image.url} 
                        alt={team.image.alt} 
                        title={team.image.title} 
                        whileHover={{ scale: 1.1 }}
                        
                    /> 
                    : ''}
                    
                </ScrollAnimation>
                <ScrollAnimation animateIn="zoomIn" animateOnce={true}>
                    <h5>{team.name}</h5>
                    <h6>{team.designation}</h6>
                    <ul className="social">
                        <li>
                            <a href={team.linkedin_link} target="_blank" title="Linked In"><FontAwesomeIcon icon={["fab", "linkedin-in"]} /></a>
                        </li>
                    </ul>
                </ScrollAnimation>
            </div>
        </div>
    );
  };
   
const VTeamBlock = handleViewport(TeamBlock, {}, {disconnectOnLeave: true});

class Team extends Component{
    render() {
        const {title, teams} = this.props;
        const { inViewport } = this.props;
        return (
          <Fragment>
            <div className="bridge-team-banner" >
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-content">
                                <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                                    <h1>{Parser(title)}</h1>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bridge-team">
                <div className="container">
                    <div className="row">
                        {teams && teams.map((item, i)=>(
                            <VTeamBlock team={item} key={i} index={i}/>
                        ))}  
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }
}

export default Team;
