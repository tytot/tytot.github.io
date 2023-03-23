import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Expand } from '@theme-toggles/react'
import { navLinks, revealInterval } from '@config'
import { heroDelay, KEY_CODES, revealElementsByClassName } from '@utils'
import style from './menu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Menu = ({ animate }) => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(!menuOpen)

    const wrapperRef = useRef()
    const buttonRef = useRef(null)
    const navRef = useRef(null)

    const [focusables, setFocusables] = useState([])

    const onKeyDown = (e) => {
        switch (e.key) {
            case KEY_CODES.ESCAPE:
            case KEY_CODES.ESCAPE_IE11: {
                setMenuOpen(false)
                break
            }

            case KEY_CODES.TAB: {
                if (e.shiftKey) {
                    if (document.activeElement === focusables[0]) {
                        e.preventDefault()
                        focusables[focusables.length - 1].focus()
                    }
                } else {
                    if (document.activeElement === focusables[focusables.length - 1]) {
                        e.preventDefault()
                        focusables[0].focus()
                    }
                }
                break
            }

            default: {
                break
            }
        }
    }

    const onResize = (e) => {
        if (e.currentTarget.innerWidth > 768) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        window.addEventListener('resize', onResize)

        setFocusables([buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))])

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    useEffect(() => {
        const listener = (event) => {
            if (!wrapperRef.current || wrapperRef.current.contains(event.target)) return
            setMenuOpen(false)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [])

    useEffect(() => {
        document.body.classList.toggle('blur', menuOpen)
    }, [menuOpen])

    useEffect(() => {
        setMounted(true)

        if (animate) {
            revealElementsByClassName(style.reveal, {
                container: '#__next',
                delay: heroDelay + revealInterval,
                distance: '0px',
            })
        }
    }, [])

    return (
        <div className={style.menu}>
            <div ref={wrapperRef}>
                <button
                    className={`${style.hamburgerButton} ${animate ? style.reveal : ''}`}
                    onClick={toggleMenu}
                    ref={buttonRef}
                    aria-label="Menu"
                >
                    <div className={style.hamBox}>
                        <div className={`${style.hamBoxInner} ${menuOpen ? style.active : ''}`} />
                    </div>
                </button>

                <aside
                    className={`${style.sidebar} ${menuOpen ? style.active : ''}`}
                    aria-hidden={!menuOpen}
                    tabIndex={menuOpen ? 1 : -1}
                >
                    <div className="theme-toggle-container">
                        {mounted && (
                            <Expand
                                toggled={resolvedTheme === 'light'}
                                toggle={(on) => setTheme(on ? 'light' : 'dark')}
                                idPrefix="menu-"
                            />
                        )}
                    </div>
                    <nav ref={navRef}>
                        <ol>
                            {navLinks.map(({ name, url, icon }, i) => (
                                <li key={i}>
                                    <Link href={url} onClick={() => setMenuOpen(false)}>
                                        <FontAwesomeIcon icon={icon} size="sm" />
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ol>

                        <a href="/Lin_Tyler_Resume.pdf" className={style.resumeButton}>
                            Resume
                        </a>
                    </nav>
                    <div className="theme-toggle-container"></div>
                </aside>
            </div>
        </div>
    )
}

export default Menu
