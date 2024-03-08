import {
    faDev,
    faGithub,
    faGithubSquare,
    faInstagramSquare,
    faLinkedin,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
    faBriefcase,
    faEnvelope,
    faFilePdf,
    faIdCard,
    faKeyboard,
    faLink,
    faPlay,
} from '@fortawesome/free-solid-svg-icons'

module.exports = {
    version: '2.0.3',
    siteMetadata: {
        title: 'Tyler Lin',
        description: 'Hi!',
        url: 'https://tylerl.in',
        image: '/images/og.png',
        social: {
            twitter: '@s_tylin',
        },
    },
    email: 'tyler@tylerl.in',
    navLinks: [
        {
            name: 'About',
            url: '/#about',
            icon: faIdCard,
        },
        {
            name: 'Projects',
            url: '/#projects',
            icon: faBriefcase,
        },
        {
            name: 'Contact',
            url: '/#contact',
            icon: faEnvelope,
        },
        {
            name: 'Blog',
            url: '/blog',
            icon: faKeyboard,
        },
    ],
    socialMedia: [
        {
            name: 'GitHub',
            url: 'https://github.com/tytot',
            icon: faGithubSquare,
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/tylerhlin',
            icon: faLinkedin,
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/t.1in',
            icon: faInstagramSquare,
        },
    ],
    linkMetadata: {
        github: {
            label: 'GitHub Link',
            icon: faGithub,
        },
        devpost: {
            label: 'Devpost Link',
            icon: faDev,
        },
        external: {
            label: 'External Link',
            icon: faLink,
        },
        pdf: {
            label: 'PDF Link',
            icon: faFilePdf,
        },
        youtube: {
            label: 'YouTube Link',
            icon: faYoutube,
        },
        play: {
            label: 'Playable Link',
            icon: faPlay,
        },
    },
    newTabHrefs: ['/Lin_Tyler_Resume.pdf', '/the-puzzled-cube', '/pool'],
    revealOptions: {
        distance: '20px',
        duration: 500,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        viewFactor: 0.25,
    },
    revealInterval: 100,
}
