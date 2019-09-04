/**
 * Creating a page named _error.js lets you override HTTP error messages
 */
import React, {Fragment} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Container from 'react-bootstrap/Container';
import Page404 from '../components/Page404/index' 
import PageWrapper from '../components/PageWrapper';

class ErrorPage extends React.Component {

  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    }
  }

  static getInitialProps({res, xhr}) {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return {errorCode}
  }

  render() {
    console.log('%cMade at %cBridge', 'font-weight: bolder;', ' font-weight: bolder; color: #1FC8C9;');
    var response
    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 404:
        response = (
          <Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>No page found - Bridge</title>
            </Head>
            <Page404/>
          </Fragment>
        )
        break
      case 500:
        response = (
          <div>
            
            <Container className="pt-5 text-center">
              <h1 className="display-4">Internal Server Error</h1>
              <p>An internal server error occurred.</p>
            </Container>
          </div>
        )
        break
      default:
        response = (
          <div>
          
            <Container className="pt-5 text-center">
              <h1 className="display-4">HTTP { this.props.errorCode } Error</h1>
              <p>
                An <strong>HTTP { this.props.errorCode }</strong> error occurred while
                trying to access <strong>{ this.props.router.pathname }</strong>
              </p>
            </Container>
          </div>
        )
    }

    return response
  }

}

export default PageWrapper(ErrorPage)
