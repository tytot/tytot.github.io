import React, { useEffect } from 'react'
import Link from 'next/link'
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SEO } from '@components'
import { revealInterval } from '@config'
import { revealElementsByClassName } from '@utils'
import { posts } from '@utils/blog'
import style from './index.module.scss'

const BlogPage = ({ posts }) => {
    library.add(fas)

    useEffect(() => {
        revealElementsByClassName(style.reveal, { interval: revealInterval })
    }, [])

    return (
        <>
            <SEO title="Blog" />
            <main className="pad-top">
                <header className={`${style.header} ${style.reveal}`}>
                    <h1 className="big-heading">Blog</h1>
                    <p className="subtitle">My musings</p>
                </header>

                <ul className={style.grid}>
                    {posts.map(({ slug, title, date, excerpt, iconPrefix, iconName, tags }, i) => (
                        <li key={i} className={`${style.post} ${style.reveal}`}>
                            <div className={style.postInner}>
                                <div className={style.postIcon}>
                                    <FontAwesomeIcon
                                        icon={findIconDefinition({ prefix: iconPrefix, iconName })}
                                        size="xl"
                                    />
                                </div>
                                <h5 className={style.postTitle}>
                                    <Link href={`/blog/${slug}`}>
                                        {title}
                                    </Link>
                                </h5>
                                <p className={style.postExcerpt}>{excerpt}</p>
                                <div className={style.postFooter}>
                                    <span className={style.postDate}>{new Date(date).toLocaleDateString()}</span>
                                    <ul className={style.postTags}>
                                        {tags &&
                                            tags.map((tag, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href={`/blog/tags/${tag}/`}
                                                       
                                                        className="inline-link"
                                                    >
                                                        #{tag}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default BlogPage

export const getStaticProps = async () => {
    return {
        props: { posts },
    }
}
