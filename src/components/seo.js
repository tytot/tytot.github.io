import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { siteMetadata } from '@config'

const SEO = ({ title, description, image, pathname }) => {
    const router = useRouter()

    const titlePrefix = title ? `${title} | ` : ''
    const seo = {
        title: title ?? siteMetadata.title,
        description: description ?? siteMetadata.description,
        image: `${siteMetadata.url}${image ?? siteMetadata.image}`,
        url: `${siteMetadata.url}${pathname ?? router.pathname}`,
    }

    return (
        <Head>
            <title>{`${titlePrefix}${siteMetadata.title}`}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} key="title" />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:url" content={seo.url} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={siteMetadata.social.twitter} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
        </Head>
    )
}

export default SEO
