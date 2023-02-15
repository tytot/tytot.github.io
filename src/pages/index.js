import React from 'react'
import { About, Contact, Featured, Hero, Projects, SEO } from '@components'

const IndexPage = () => (
    <>
        <SEO />
        <main>
            <Hero />
            <About />
            <Featured />
            <Projects />
            <Contact />
        </main>
    </>
)

export default IndexPage
