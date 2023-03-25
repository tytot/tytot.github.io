import React, { useEffect } from 'react'
import { email } from '@config'
import { revealElementsByClassName } from '@utils'
import style from './contact.module.scss'

const Contact = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal)
    }, [])

    return (
        <section id="contact" className={`${style.container} ${style.reveal}`}>
            <h2 className="section-heading">Contact Me</h2>

            <p>
                Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have
                a question or just want to say hi, I’ll try my best to get back to you!
            </p>

            <a className={style.emailButton} href={`mailto:${email}`}>
                Say Hello
            </a>
        </section>
    )
}

export default Contact
