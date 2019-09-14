import React, { Component, Fragment } from 'react'
import Link from 'next/link'


class Sadi extends Component {
    render() {
        return (
            <>
                <p>This is sadi page</p>
                <Link
                    href="/"
                >
                    <a>home</a>
                </Link>
                <Link
                    href="/test"
                >
                    <a>test</a>
                </Link>
            </>
        )
    }
}

export default Sadi