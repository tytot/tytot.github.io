import { ThemeProvider } from 'next-themes'
import { Layout } from '@components'
import { mono, sans, serif } from '@styles/fonts'
import { prefersReducedMotion } from '@utils'
import '@styles/global.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
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
        </ThemeProvider>
    )
}
