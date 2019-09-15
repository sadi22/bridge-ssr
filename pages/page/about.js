import React, { Component, Fragment } from 'react'

import Link from 'next/link'

class About extends Component{
    render() {
        return (
            <>
                <Link
                    href="/page/test"
                >
                    <a>test</a>
                </Link>
                <Link
                    href="/"
                >
                    <a>Home</a>
                </Link>
                <p>about</p>
            </>
        )
    }
}

export default About