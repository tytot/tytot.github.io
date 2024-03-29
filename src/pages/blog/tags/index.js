import React, { useEffect } from 'react'
import Link from 'next/link'
import { Layout, SEO } from '@components'
import { revealElementsByClassName } from '@utils'
import { tags } from '@utils/blog'
import style from './index.module.scss'

const TagsPage = ({ tags }) => {
    useEffect(() => {
        revealElementsByClassName(style.reveal)
    }, [])

    return (
        <>
            <SEO title="Tags" />
            <Layout>
                <main className={`${style.container} pad-top`}>
                    <span className={`breadcrumb ${style.reveal}`}>
                        <span className="arrow">&larr;</span>
                        <Link href="/blog">All Posts</Link>
                    </span>

                    <h1 className={style.reveal}>Tags</h1>
                    <ul className={`fancy-list ${style.reveal}`}>
                        {tags.map(([tag, slugs]) => (
                            <li key={tag} className={style.reveal}>
                                <Link href={`/blog/tags/${tag}/`} className="inline-link">
                                    #{tag} <span className={style.count}>({slugs.length})</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </Layout>
        </>
    )
}

export default TagsPage

export const getStaticProps = async () => {
    return {
        props: { tags: [...tags.entries()] },
    }
}
