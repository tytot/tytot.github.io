import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { linkMetadata, revealInterval } from '@config'
import { projects } from '@content'
import { revealElements } from '@utils'
import style from './projects.module.scss'

const Projects = () => {
    useEffect(() => {
        revealElements(style.reveal, { interval: revealInterval })
    }, [])

    const projectInner = ({ title, description, icon, links, tags }) => {
        return (
            <div className={style.projectInner}>
                <header className={style.projectHeader}>
                    <div className={style.projectTop}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={icon} size="xl" />
                        </div>
                        <div className={style.projectLinks}>
                            {links &&
                                Object.entries(links).map(([type, url], i) => (
                                    <a key={i} href={url} aria-label={linkMetadata[type].label}>
                                        <FontAwesomeIcon icon={linkMetadata[type].icon} size="lg" />
                                    </a>
                                ))}
                        </div>
                    </div>

                    <h3 className={style.projectTitle}>
                        <a href={Object.values(links)[0]} target="_blank" rel="noreferrer">
                            {title}
                        </a>
                    </h3>

                    <div className={style.projectDescription} dangerouslySetInnerHTML={{ __html: description }} />
                </header>

                <footer>
                    {tags && (
                        <ul className={style.projectTechList}>
                            {tags.map((tag, i) => (
                                <li key={i}>
                                    <FontAwesomeIcon icon={faTag} />
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}
                </footer>
            </div>
        )
    }

    return (
        <section className={style.container}>
            <h2 className={style.reveal}>Other Projects</h2>

            <ul className={style.grid}>
                {projects.map((project, i) => (
                    <li key={i} className={`${style.project} ${style.reveal}`}>
                        {projectInner(project)}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Projects
