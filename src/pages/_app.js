import { ThemeProvider } from 'next-themes'
import { Layout } from '@components'
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
                    .reveal {
                        visibility: ${prefersReducedMotion() ? 'visible' : 'hidden'};
                    }
                `}</style>
            </Layout>
        </ThemeProvider>
    )
}
