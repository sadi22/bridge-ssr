import React, { Component, Fragment } from 'react'
import Link from 'next/link'


class Test extends Component {
    render() {
        return (
            <>
                <p>This is test page</p>
                <Link
                    href="/"
                >
                    <a>home</a>
                </Link>
                <Link
                    href="/sadi"
                >
                    <a>sadi</a>
                </Link>
            </>
        )
    }
}

export default Test