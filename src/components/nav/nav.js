import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useScrollDirection } from 'use-scroll-direction'
import { useTheme } from 'next-themes'
import { Expand } from '@theme-toggles/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo, Menu } from '@components'
import { navLinks, revealInterval } from '@config'
import { heroDelay, revealElementsByClassName } from '@utils'
import style from './nav.module.scss'
import '@theme-toggles/react/css/Expand.css'

const Nav = ({ animate, discreet }) => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    const revealClasses = animate ? style.reveal : ''

    const { scrollDirection } = useScrollDirection()
    const [scrollingUp, setScrollingUp] = useState(false)
    const [scrolledToTop, setScrolledToTop] = useState(true)
    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50)
    }

    useEffect(() => {
        setMounted(true)

        revealElementsByClassName(style.reveal, { container: '#__next', delay: heroDelay, interval: revealInterval })
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (scrollDirection === 'UP') {
            setScrollingUp(true)
        } else if (scrollDirection === 'DOWN') {
            setScrollingUp(false)
        }
    }, [scrollDirection])

    const headerClass = () => {
        if (discreet) return style.headerScrollUp
        if (scrolledToTop) return style.header
        if (scrollingUp) return style.headerScrollUp
        return style.headerScrollDown
    }

    return (
        <header className={headerClass()}>
            <nav className={style.nav}>
                <div className={`${style.logo} ${revealClasses}`} tabIndex="-1">
                    <Link href="/" aria-label="home">
                        <Logo />
                    </Link>
                </div>
                <div className={style.links}>
                    <ol>
                        {navLinks.map(({ name, url, icon }, i) => (
                            <li key={i} className={revealClasses}>
                                <Link href={url}>
                                    <FontAwesomeIcon icon={icon} size="sm" />
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ol>

                    <div className={revealClasses}>
                        <a className={style.resumeButton} href="/Lin_Tyler_Resume.pdf">
                            Resume
                        </a>
                    </div>

                    {mounted && (
                        <Expand
                            toggled={resolvedTheme === 'light'}
                            toggle={(on) => setTheme(on ? 'light' : 'dark')}
                            className={revealClasses}
                            idPrefix="nav-"
                        />
                    )}
                </div>
                <Menu animate={animate} />
            </nav>
        </header>
    )
}

export default Nav
