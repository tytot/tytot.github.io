import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Nav, SEO } from '@components'
import style from './cheerpj-layout.module.scss'

const CheerpJLayout = ({ jarPath, displayWidth, displayHeight }) => {
    const displayAspectRatio = displayWidth / displayHeight

    const [gameScale, setGameScale] = useState(1)

    useEffect(() => {
        const resizeGame = () => {
            const navHeight = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--nav-scroll-height').replace('px', '')
            )
            const container = document.getElementById(style.container)
            const pageAspectRatio = window.innerWidth / (window.innerHeight - navHeight)
            let width, height
            if (pageAspectRatio <= displayAspectRatio) {
                width = window.innerWidth
                height = width / displayAspectRatio
            } else {
                height = window.innerHeight - navHeight
                width = height * displayAspectRatio
            }
            container.style.width = width + 'px'
            container.style.height = height + 'px'
            const scaleFactor = width / displayWidth
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

            <Link className="skip-to-content" href="#content">
                Skip to Content
            </Link>

            <Nav animate={false} discreet />

            <div id={style.content}>
                <main id={style.container}></main>
            </div>

            <Script
                src="https://cjrtnc.leaningtech.com/2.3/loader.js"
                onLoad={() => {
                    const showPreloadProgress = (loadedFiles, totalFiles) => {
                        console.log('Percentage loaded ' + (loadedFiles * 100) / totalFiles)
                    }
                    cheerpjInit({
                        javaProperties: ['java.protocol.handler.pkgs=com.leaningtech.handlers'],
                        listener: {
                            preloadProgress: showPreloadProgress,
                        },
                    })
                    cheerpjCreateDisplay(displayWidth, displayHeight, document.getElementById(style.container))
                    cheerpjRunJar(`/app/${jarPath}`)

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

export default CheerpJLayout
