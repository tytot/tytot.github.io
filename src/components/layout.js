import React, { useEffect } from 'react'
import { Email, Footer, Nav, Social } from '@components'
import { newTabHrefs } from '@config'
import Link from 'next/link'

const Layout = ({ children }) => {
    useEffect(() => {
        const links = Array.from(document.querySelectorAll('a'))
        links.forEach((link) => {
            if (link.host !== window.location.host || newTabHrefs.includes(link.getAttribute('href'))) {
                link.setAttribute('rel', 'noreferrer')
                link.setAttribute('target', '_blank')
            }
        })
    }, [])

    return (
        <>
            <Link className="skip-to-content" href="#content">
                Skip to Content
            </Link>

            <Nav animate={true} />
            <Social animate={true} />
            <Email animate={true} />

            <div id="content">{children}</div>

            <Footer />
        </>
    )
}

export default Layout
