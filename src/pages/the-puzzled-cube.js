import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { SEO } from '@components'

const WINDOW_WIDTH = 33 * 40
const WINDOW_HEIGHT = 24 * 40
const WINDOW_ASPECT_RATIO = 33 / 24

const ThePuzzledCubePage = () => {
    const [gameScale, setGameScale] = useState(1)

    useEffect(() => {
        const resizeGame = () => {
            const container = document.getElementById('tpc-container')
            const pageAspectRatio = window.innerWidth / window.innerHeight
            let width, height
            if (pageAspectRatio <= WINDOW_ASPECT_RATIO) {
                width = window.innerWidth
                height = width / WINDOW_ASPECT_RATIO
            } else {
                height = window.innerHeight
                width = window.innerHeight * WINDOW_ASPECT_RATIO
            }
            container.style.width = width + 'px'
            container.style.height = height + 'px'
            const scaleFactor = width / WINDOW_WIDTH
            window.gameScale = scaleFactor
            setGameScale(scaleFactor)
        }
        resizeGame()
        window.addEventListener('resize', resizeGame)
        return () => {
            window.removeEventListener('resize', resizeGame)
        }
    }, [])

    return (
        <>
            <SEO title="The Puzzled Cube" />
            <main className="fullscreen">
                <div id="tpc-container"></div>
            </main>
            <Script
                src="https://cjrtnc.leaningtech.com/2.3/loader.js"
                onLoad={() => {
                    cheerpjInit({ javaProperties: ['java.protocol.handler.pkgs=com.leaningtech.handlers'] })
                    cheerpjCreateDisplay(WINDOW_WIDTH, WINDOW_HEIGHT, document.getElementById('tpc-container'))
                    cheerpjRunJar('/app/ThePuzzledCube.jar')

                    const display = document.getElementById('cheerpjDisplay')
                    display.addEventListener = new Proxy(display.addEventListener, {
                        apply: function (target, thisArg, args) {
                            const override = function (event) {
                                if (event.clientX != undefined) {
                                    const gameScale = window.gameScale ?? 1
                                    const clientRect = event.currentTarget.getBoundingClientRect()
                                    const x = (event.clientX - clientRect.left) / gameScale + clientRect.left
                                    const y = (event.clientY - clientRect.top) / gameScale + clientRect.top
                                    Object.defineProperty(event, 'clientX', {
                                        configurable: true,
                                        get() {
                                            return x
                                        },
                                    })
                                    Object.defineProperty(event, 'clientY', {
                                        configurable: true,
                                        get() {
                                            return y
                                        },
                                    })
                                }
                                args[1].call(thisArg, event)
                            }
                            return Reflect.apply(target, thisArg, [args[0], override])
                        },
                    })
                }}
            ></Script>
            <style jsx global>{`
                main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                #cheerpjDisplay {
                    transform-origin: left top;
                }
            `}</style>
            <style jsx global>{`
                #cheerpjDisplay {
                    transform: scale(${gameScale});
                }
            `}</style>
        </>
    )
}

export default ThePuzzledCubePage
