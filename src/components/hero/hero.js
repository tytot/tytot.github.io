import React, { useEffect } from 'react'
import { revealInterval } from '@config'
import { revealElementsByClassName } from '@utils'
import style from './hero.module.scss'

const Hero = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal, { interval: revealInterval })
    }, [])

    const items = [
        <h1 className="small-heading">Hi, my name is</h1>,
        <h2 className="big-heading">Tyler Lin</h2>,
        <p>full-stack software engineer</p>,
        <p>web developer</p>,
        <p>basketball enthusiast</p>,
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
