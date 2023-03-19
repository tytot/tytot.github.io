import React, { useEffect } from 'react'
import Script from 'next/script'
import { revealElementsByClassName } from '@utils'
import { SEO } from '@components'

const ThePuzzledCubePage = () => {
    return (
        <>
            <SEO title="The Puzzled Cube" />
            <Script
                src="https://cjrtnc.leaningtech.com/2.3/loader.js"
                onLoad={() => {
                    cheerpjInit({ javaProperties: ['java.protocol.handler.pkgs=com.leaningtech.handlers'] })
                    cheerpjCreateDisplay(-1, -1, document.getElementById('tpc-container'))
                    cheerpjRunJar('/app/ThePuzzledCube.jar')
                }}
            ></Script>
            <main id="tpc-container" className="pad-top"></main>
        </>
    )
}

export default ThePuzzledCubePage
