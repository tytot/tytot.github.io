import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { socialMedia } from '@config'
import style from './footer.module.scss'

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.socialLinks}>
                <ul>
                    {socialMedia &&
                        socialMedia.map(({ name, url, icon }, i) => (
                            <li key={i}>
                                <a href={url} aria-label={name}>
                                    <FontAwesomeIcon icon={icon} size="xl" />
                                </a>
                            </li>
                        ))}
                </ul>
            </div>

            <div className={style.credit} tabIndex="-1">
                <p className={style.version}>
                    <a href="https://tylerl.in">tylerl.in</a> v2.0.0
                </p>
                <p>
                    Built by <a href="https://github.com/tytot">Tyler Lin</a> using{' '}
                    <a href="https://nextjs.org">Next.js</a>
                </p>
                <p className={style.footnote}>
                    Inspired by <a href="https://brittanychiang.com">brittanychiang.com</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer
