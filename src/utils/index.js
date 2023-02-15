import { navLinks, revealInterval, revealOptions } from '@config'

export const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
}

export const prefersReducedMotion = () => {
    return typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

export const revealElements = async (classNames, options) => {
    if (prefersReducedMotion()) return
    const ScrollReveal = (await import('scrollreveal')).default
    ScrollReveal().reveal(`.${classNames.split(' ').join('.')}`, { ...revealOptions, ...options })
}

export const navDelay = (navLinks.length + 1) * revealInterval + revealOptions.duration
export const heroDelay = revealInterval + revealOptions.duration

export const KEY_CODES = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_LEFT_IE11: 'Left',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_RIGHT_IE11: 'Right',
    ARROW_UP: 'ArrowUp',
    ARROW_UP_IE11: 'Up',
    ARROW_DOWN: 'ArrowDown',
    ARROW_DOWN_IE11: 'Down',
    ESCAPE: 'Escape',
    ESCAPE_IE11: 'Esc',
    TAB: 'Tab',
    SPACE: ' ',
    SPACE_IE11: 'Spacebar',
    ENTER: 'Enter',
}
