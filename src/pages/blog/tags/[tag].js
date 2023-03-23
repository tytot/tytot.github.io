import React, { useEffect } from 'react'
import Link from 'next/link'
import { Layout, SEO } from '@components'
import { revealElementsByClassName } from '@utils'
import { getPostsWithTag, tags } from '@utils/blog'
import style from './[tag].module.scss'

const TagTemplate = ({ tag, posts }) => {
    useEffect(() => {
        revealElementsByClassName(style.reveal)
    }, [])

    return (
        <>
            <SEO title={`Tagged: #${tag}`} pathname={`/blog/tags/${tag}`} />

            <Layout>
                <main className={`${style.container} pad-top`}>
                    <span className={`breadcrumb ${style.reveal}`}>
                        <span className="arrow">&larr;</span>
                        <Link href="/blog">All Posts</Link>
                    </span>

                    <h1 className={style.reveal}>
                        <span className={style.tagHeader}>#{tag}</span>
                        <span>
                            <Link href="/blog/tags">View all tags</Link>
                        </span>
                    </h1>

                    <ul className={`fancy-list ${style.reveal}`}>
                        {posts.map((post) => {
                            const { slug, title, date, tags } = post
                            return (
                                <li key={slug} className={style.reveal}>
                                    <h2>
                                        <Link href={`/blog/${slug}`}>{title}</Link>
                                    </h2>
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
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </Layout>
        </>
    )
}

export default TagTemplate

export const getStaticProps = async ({ params: { tag } }) => {
    const posts = getPostsWithTag(tag)
    return { props: { tag, posts } }
}
export const getStaticPaths = async () => {
    return {
        paths: [...tags.keys()].map((tag) => ({
            params: { tag },
        })),
        fallback: false,
    }
}
