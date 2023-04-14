import React, { useEffect } from 'react'
import { email, socialMedia } from '@config'
import { revealElementsByClassName } from '@utils'
import style from './contact.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Contact = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal)
    }, [])

    return (
        <section id="contact" className={`${style.container} ${style.reveal}`}>
            <h2 className="section-heading">Get in Touch</h2>

            <div className={style.inner}>
                <div className={style.text}>
                    <p>
                        I am currently looking for full-time software developer or software engineer roles to start upon
                        my graduation in May 2024.
                    </p>
                    <p>
                        If you have any opportunities available or if you want to chat/ask a question/discuss a
                        project, please don't hesitate to reach out!
                    </p>
                </div>
                <div className={style.buttons}>
                    <a href={`mailto:${email}`}>
                        <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                        Email me
                    </a>
                    <a href={socialMedia.find(({ name }) => name === 'LinkedIn')?.url}>
                        <FontAwesomeIcon icon={faLinkedin} fixedWidth />
                        Connect with me
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Contact
