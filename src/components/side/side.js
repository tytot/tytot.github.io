import React, { useEffect } from 'react'
import { heroDelay, navDelay, revealElements } from '@utils'
import style from './side.module.scss'

const Side = ({ children, orientation, animate }) => {
    useEffect(() => {
        if (animate) {
            revealElements(style.reveal, { container: '#__next', delay: heroDelay + navDelay })
        }
    }, [])

    return (
        <div className={orientation === 'left' ? style.sideLeft : style.sideRight}>
            <div className={`${style.wrapper} ${animate ? style.reveal : ''}`}>{children}</div>
        </div>
    )
}

export default Side
