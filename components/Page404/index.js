/* eslint-disable */
import React, { Component, Fragment } from 'react'
import Link from '../ActiveLink'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faHome } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit, faHome);
import styles from  "./index.scss";


class Page404 extends Component{
    render() {
        return (
          <Fragment>
           
            <div className="site-404">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="content-404">
                                <img src='/static/images/404.png' className="img-fluid" />
                                <h2>Page not found</h2>
                                <Link
                                    as='/'
                                    href='/'
                                >

                                    <a href="/" className="back2home btn-default"><FontAwesomeIcon icon={["fas", "home"]} /> back to home</a>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {styles}
            </style>
          </Fragment>
        )
    }
}

export default Page404;