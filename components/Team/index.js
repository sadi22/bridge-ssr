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


const TeamBlock = (props) => {
    const { inViewport, innerRef, team, index } = props;
    return (
        <div className="col-lg-4 col-sm-6 single-col" ref={innerRef}>
            <div className="single-member text-center">
                <motion.div
                    className="member-img overflow"
                    initial={false}
                    animate={inViewport ? { scale: 1, opacity: 1 } : {scale: 0.7, opacity:0}}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 500,
                        delay: 0.9,
                        default: { duration: 0.8 },
                    }}
                    >
                    {team.image ? 
                    
                    <motion.img
                        src={team.image.url} 
                        alt={team.image.alt} 
                        title={team.image.title} 
                        whileHover={{ scale: 1.1 }}
                        
                    /> 
                    : ''}
                    
                </motion.div>
                <motion.h5
                    initial={false}
                    animate={inViewport ? { scale: 1, opacity: 1 } : {scale: 0.7, opacity:0}}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 500,
                        delay: 0.9,
                        default: { duration: 0.8 },
                    }}
                
                >{team.name}</motion.h5>
                <motion.h6
                    initial={false}
                    animate={inViewport ? { scale: 1, opacity: 1 } : {scale: 0.7, opacity:0}}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 500,
                        delay: 0.9,
                        default: { duration: 0.8 },
                    }}
                >{team.designation}</motion.h6>
                <ul className="social">
                    <motion.li
                        initial={false}
                        animate={inViewport ? { scale: 1, opacity: 1 }:{scale: 0.7, opacity:0}}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 500,
                            delay: 0.9,
                            default: { duration: 0.8 },
                        }}
                    >
                        <a href={team.linkedin_link} target="_blank" title="Linked In"><FontAwesomeIcon icon={["fab", "linkedin-in"]} /></a>
                    </motion.li>
                </ul>
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
                                <motion.h1
                                    initial={false}
                                    animate={inViewport ? { translateY: 0, opacity: 1, visibility:"visible" }: { translateY: 50, opacity: 0, visibility:"hidden" }}
                                    transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 500,
                                    default: { duration: 0.8 },
                                    }}
                                >{Parser(title)}</motion.h1>
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

export default handleViewport(Team, {}, {disconnectOnLeave: false});
