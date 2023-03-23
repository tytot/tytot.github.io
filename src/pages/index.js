import React from 'react'
import { About, Contact, Featured, Hero, Layout, Projects, SEO } from '@components'

const IndexPage = () => (
    <>
        <SEO />
        <Layout>
            <main>
                <Hero />
                <About />
                <Featured />
                <Projects />
                <Contact />
            </main>
        </Layout>
    </>
)

export default IndexPage
