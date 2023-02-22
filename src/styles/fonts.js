import { Andada_Pro, Cabin, Spline_Sans_Mono } from '@next/font/google'

const sans = Cabin({
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})
const serif = Andada_Pro({
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})
const mono = Spline_Sans_Mono({
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export { sans, serif, mono }
