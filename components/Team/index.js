/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import  "./index.scss";
import Parser from 'html-react-parser';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);


class Team extends Component{
    render() {
        const {title, teams} = this.props;
        let teamListMarkup = null;
    	if(teams){            
    		teamListMarkup = teams.map((team, i) => {
			    return (
                    <div className="col-lg-4 col-sm-6 single-col" key={i}>
                        <div className="single-member text-center">
                            <div className="member-img">
                                {team.image ? <img src={team.image.url} alt={team.image.alt} title={team.image.title} /> : ''}
                                
                            </div>
                            <h5>{team.name}</h5>
                            <h6>{team.designation}</h6>
                            <ul className="social">
                                <li><a href={team.linkedin_link} target="_blank" title="Linked In"><FontAwesomeIcon icon={["fab", "linkedin-in"]} /></a></li>
                            </ul>
                        </div>
                    </div>
			      );
			    });
    	}
        return (
          <Fragment>
          
            
            <div className="bridge-team-banner">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-content">
                                <h1>{Parser(title)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bridge-team">
                <div className="container">
                    <div className="row">
                        {teamListMarkup}   
                    </div>
                </div>
            </div>
            
            
          </Fragment>
        )
    }
}

export default Team;