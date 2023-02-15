import React, { useEffect } from 'react'
import ExportedImage from 'next-image-export-optimizer'
import { revealElements } from '@utils'
import headshot from '@public/images/me.jpg'
import style from './about.module.scss'

const About = () => {
    useEffect(() => {
        revealElements(style.reveal)
    }, [])

    return (
        <section id="about" className={style.reveal}>
            <h2 className="section-heading">About Me</h2>

            <div className={style.inner}>
                <div className={style.media}>
                    <div className={style.pic}>
                        <ExportedImage className={style.img} src={headshot} alt="Headshot"></ExportedImage>
                    </div>
                </div>
                <div className={style.text}>
                    <div>
                        <p>
                            Hi! My name is Tyler and I'm a junior at <a href="https://www.gatech.edu">Georgia Tech</a>{' '}
                            pursuing a degree in computer science with concentrations in{' '}
                            <a href="https://www.cc.gatech.edu/academics/threads/information-internetworks">
                                Information Internetworks
                            </a>{' '}
                            and <a href="https://www.cc.gatech.edu/academics/threads/media">Media</a>.
                        </p>
                        <p>
                            As an aspiring software engineer, my goal is to leverage modern computing technologies to
                            build robust and seamless user experiences. I have professional experience contributing to
                            large-scale applications through data visualization and web development, and I have become a
                            more pragmatic programmer as a result. I pride myself on writing robust, optimized, and
                            maintainable code, and I'm always looking for opportunities to hone my skills by working on
                            a variety of <a href="#projects">projects</a>.
                        </p>
                        <p>
                            Outside of software development, I enjoy playing basketball and tennis, listening to music,
                            and watching the Cleveland Cavaliers!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
