import React, { useEffect } from 'react'
import Link from 'next/link'
import { revealElementsByClassName } from '@utils'
import { Layout, SEO } from '@components'
import style from './404.module.scss'

const NotFoundPage = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal)
    }, [])

    return (
        <>
            <SEO title="Page Not Found" />
<<<<<<< HEAD
            <main className={`${style.container} ${style.reveal}`}>
                <h1 className={style.title}>404</h1>
                <h2 className="medium-heading">Page Not Found</h2>
                <Link className={style.homeButton} href="/">
                    Go Home
                </Link>
            </main>
=======
            <Layout>
                <main className={`${style.container} ${style.reveal}`}>
                    <h1 className={style.title}>404</h1>
                    <h2 className={style.subtitle}>Page Not Found</h2>
                    <Link className={style.homeButton} href="/">
                        Go Home
                    </Link>
                </main>
            </Layout>
>>>>>>> cheerpj
        </>
    )
}

export default NotFoundPage
