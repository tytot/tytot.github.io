import React, { useEffect } from 'react'
import { revealInterval } from '@config'
import { revealElementsByClassName } from '@utils'
import style from './hero.module.scss'

const Hero = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal, { interval: revealInterval })
    }, [])

    const one = <h1>Hi, my name is</h1>
    const two = <h2 className="big-heading">Tyler Lin</h2>

    const items = [one, two]

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
