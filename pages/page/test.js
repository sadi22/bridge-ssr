import React, { Component, Fragment } from 'react'

import Link from 'next/link'

class Test extends Component{
    render() {
        return (
            <>
                <Link
                    href="/page/about"
                >
                    <a>about</a>
                </Link>
                <Link
                    href="/"
                >
                    <a>Home</a>
                </Link>
                <p>Test</p>
            </>
        )
    }
}

export default Test