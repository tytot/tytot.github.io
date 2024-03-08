import React, { useEffect } from 'react'
import Link from 'next/link'
import { Layout, SEO } from '@components'
import { revealInterval } from '@config'
import { prefersReducedMotion, revealElements, revealElementsByClassName } from '@utils'
import style from './post.module.scss'
import 'katex/dist/katex.min.css'

const Post = ({ children, meta }) => {
    const { title, date, tags } = meta

    useEffect(() => {
        revealElementsByClassName(style.reveal)
        revealElements(document.querySelectorAll(`.${style.postContent} > *`), {
            delay: revealInterval,
            useDelay: 'onload',
        })
    }, [])

    return (
        <>
            <SEO title={title} />
            <Layout>
                <main className="pad-top">
                    <span className={`breadcrumb ${style.reveal}`}>
                        <span className="arrow">&larr;</span>
                        <Link href="/blog">All Posts</Link>
                    </span>

                    <header className={`${style.postHeader} ${style.reveal}`}>
                        <h1>{title}</h1>
                        <p className={style.subheading}>
                            <time>
                                {new Date(date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <span>&nbsp;&mdash;&nbsp;</span>
                            {tags &&
                                tags.map((tag, i) => (
                                    <Link key={i} href={`/blog/tags/${tag}/`} className={style.tag}>
                                        #{tag}
                                    </Link>
                                ))}
                        </p>
                    </header>

                    <div className={style.postContent}>{children}</div>
                </main>
                <style jsx global>{`
                    .${style.postContent} > * {
                        visibility: ${prefersReducedMotion() ? 'visible' : 'hidden'};
                    }
                `}</style>
            </Layout>
        </>
    )
}

export default Post
