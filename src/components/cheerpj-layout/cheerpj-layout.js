import React from 'react'
import Script from 'next/script'
import style from './cheerpj-layout.module.scss'
import Nav from '../nav/nav'

const CheerpJLayout = ({ jarPath, displayWidth, displayHeight, children }) => {
    return (
        <>
            <Nav animate={false} discreet />

            <div className={style.container}>
                <div className={style.exposition}>{children}</div>
                <div className={style.frame}>
                    <div id="cheerpj" />
                </div>
            </div>
            <Script
                src="https://cjrtnc.leaningtech.com/3.0/cj3loader.js"
                onLoad={async () => {
                    await cheerpjInit()
                    cheerpjCreateDisplay(displayWidth, displayHeight, document.getElementById('cheerpj'))
                    await cheerpjRunJar(`/app/${jarPath}`)
                }}
            ></Script>
        </>
    )
}

export default CheerpJLayout
