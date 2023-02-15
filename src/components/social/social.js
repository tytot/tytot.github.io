import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { socialMedia } from '@config'
import { Side } from '@components'
import style from './social.module.scss'

const Social = ({ animate }) => (
    <Side orientation="left" animate={animate}>
        <ul className={style.socialList}>
            {socialMedia.map(({ name, url, icon }, i) => (
                <li key={i}>
                    <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={icon} size="xl" />
                    </a>
                </li>
            ))}
        </ul>
    </Side>
)

export default Social
