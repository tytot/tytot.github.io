import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useScrollDirection } from 'use-scroll-direction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faT } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '@components'
import { navLinks, revealInterval } from '@config'
import { heroDelay, revealElements } from '@utils'
import style from './nav.module.scss'

const Nav = ({ animate }) => {
    const revealClasses = animate ? style.reveal : ''

    const { scrollDirection } = useScrollDirection()
    const [scrollingUp, setScrollingUp] = useState(false)
    const [scrolledToTop, setScrolledToTop] = useState(true)
    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50)
    }

    useEffect(() => {
        revealElements(style.reveal, { container: '#__next', delay: heroDelay, interval: revealInterval })
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
    })

    return (
        <header className={scrolledToTop ? style.header : scrollingUp ? style.headerScrollUp : style.headerScrollDown}>
            <nav className={style.nav}>
                <div className={`${style.logo} ${revealClasses}`} tabIndex="-1">
                    <Link href="/" aria-label="home">
                        <FontAwesomeIcon icon={faT} />
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
                        <a className={style.resumeButton} href="/resume.pdf">
                            Resume
                        </a>
                    </div>
                </div>
                <Menu animate={animate} />
            </nav>
        </header>
    )
}

export default Nav
