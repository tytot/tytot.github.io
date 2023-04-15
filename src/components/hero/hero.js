import React, { useEffect } from 'react'
import { revealInterval } from '@config'
import { heroDelay, navDelay, revealElementsByClassName } from '@utils'
import style from './hero.module.scss'

const Hero = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal, { interval: revealInterval })
        revealElementsByClassName(style.descriptor, { delay: heroDelay + navDelay, interval: revealInterval })
    }, [])

    const items = [
        <h1 className="small-heading">Hi, my name is</h1>,
        <h2 className="big-heading">Tyler Lin</h2>,
        <p className={`small-heading ${style.descriptor}`}>full-stack software engineer</p>,
        <p className={`small-heading ${style.descriptor}`}>web developer</p>,
        <p className={`small-heading ${style.descriptor}`}>basketball enthusiast</p>,
    ]

    return (
        <section className={style.container}>
            {items.map((item, i) => (
                <div key={i} className={style.reveal}>
                    {item}
                </div>
            ))}
        </section>
    )
}

export default Hero
