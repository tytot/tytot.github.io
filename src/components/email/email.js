import React from 'react'
import { email } from '@config'
import { Side } from '@components'
import style from './email.module.scss'

const Email = ({ animate }) => (
    <Side orientation="right" animate={animate}>
        <a className={style.email} href={`mailto:${email}`}>
            {email}
        </a>
    </Side>
)

export default Email
