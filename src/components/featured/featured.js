import React, { useEffect } from 'react'
import ExportedImage from 'next-image-export-optimizer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { linkMetadata } from '@config'
import { featured } from '@content'
import { revealElementsByClassName } from '@utils'
import style from './featured.module.scss'

const Featured = () => {
    useEffect(() => {
        revealElementsByClassName(style.reveal)
    }, [])

    return (
        <section id="projects">
            <h2 className={`section-heading ${style.reveal}`}>My Projects</h2>

            <ul className={style.grid}>
                {featured.map(({ title, description, links, tags, image }, i) => {
                    return (
                        <li key={i} className={`${style.project} ${style.reveal}`}>
                            <div className={style.projectContent}>
                                <div>
                                    <p className={style.projectOverline}>Featured Project</p>

                                    <h3 className={style.projectTitle}>
                                        <a href={links.external}>{title}</a>
                                    </h3>

                                    <div
                                        className={style.projectDescription}
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />

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

                                    <div className={style.projectLinks}>
                                        {links &&
                                            Object.entries(links).map(([type, url], i) => (
                                                <a key={i} href={url} target="_blank" rel="noreferrer" aria-label={linkMetadata[type].label}>
                                                    <FontAwesomeIcon icon={linkMetadata[type].icon} size="lg" />
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className={style.projectImage}>
                                <a href={Object.values(links)[0]}>
                                    <ExportedImage
                                        src={`/images/${image}`}
                                        alt={title}
                                        className={style.img}
                                        width="384"
                                        height="216"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </a>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Featured
