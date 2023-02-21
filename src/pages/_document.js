import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preload" href="/fonts/AndadaPro.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
                <link
                    rel="preload"
                    href="/fonts/AndadaPro-Italic.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link rel="preload" href="/fonts/Cabin.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/Cabin-Italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
                <link
                    rel="preload"
                    href="/fonts/SplineSansMono.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/SplineSansMono-Italic.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
                <link rel="manifest" href="/site.webmanifest?v=2" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#9e7676" />
                <link rel="shortcut icon" href="/favicon.ico?v=2" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#fdf3ec" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
