import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '@styles/global.scss'
import { Layout } from '@components'
import { mono, sans, serif } from '@styles/fonts'
import { prefersReducedMotion } from '@utils'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function useNormalScrollRoutes() {
    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            document.documentElement.classList.add('normal-scroll')
        })
        router.events.on('routeChangeComplete', () => {
            document.documentElement.classList.remove('normal-scroll')
        })
    }, [])
}

export default function MyApp({ Component, pageProps }) {
    useNormalScrollRoutes()

    return (
        <Layout>
            <Component {...pageProps} />
            <style jsx global>{`
                :root {
                    --font-sans: ${sans.style.fontFamily};
                    --font-serif: ${serif.style.fontFamily};
                    --font-mono: ${mono.style.fontFamily};
                }
                .reveal {
                    visibility: ${prefersReducedMotion() ? 'visible' : 'hidden'};
                }
            `}</style>
        </Layout>
    )
}
