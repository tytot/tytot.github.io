import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Email, Footer, Nav, Social } from '@components'
import Link from 'next/link'

const Layout = ({ children }) => {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return
        const asPath = router.asPath
        if (asPath.includes('#')) {
            const id = asPath.split('#')[1]
            setTimeout(() => {
                const el = document.getElementById(id)
                if (el) {
                    el.scrollIntoView()
                    el.focus()
                }
            }, 0)
        }
        const links = Array.from(document.querySelectorAll('a'))
        links.forEach((link) => {
            if (link.host !== window.location.host) {
                link.setAttribute('rel', 'noreferrer')
                link.setAttribute('target', '_blank')
            }
        })
    }, [router.isReady])

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
