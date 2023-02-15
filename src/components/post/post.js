import React from 'react'
import Link from 'next/link'
import { SEO } from '@components'
import style from './post.module.scss'
import 'katex/dist/katex.min.css'

const Post = ({ children, meta }) => {
    const { title, date, tags } = meta

    return (
        <>
            <SEO title={title} />
            <main className="pad-top">
                <span className="breadcrumb">
                    <span className="arrow">&larr;</span>
                    <Link href="/blog">
                        All Posts
                    </Link>
                </span>

                <header className={style.postHeader}>
                    <h1 className="medium-heading">{title}</h1>
                    <p className={style.subtitle}>
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
        </>
    )
}

export default Post
