import { SEO } from '@components'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheerpJLayout from 'src/components/cheerpj-layout/cheerpj-layout'

const ThePuzzledCubePage = () => {
    return (
        <>
            <SEO title="The Puzzled Cube" />
            <CheerpJLayout jarPath="ThePuzzledCube.jar" displayWidth={33 * 40} displayHeight={24 * 40}>
                <h1>The Puzzled Cube</h1>
                <p>
                    This is a Java Swing game that I made in high school for an FBLA competition. I didn't know how to
                    adapt to different resolutions, so you might have to zoom out the page to see the whole display. If
                    you want to play with music and sound effects (and less lag), download and run the JAR file below!
                </p>
                <a href="/ThePuzzledCube.jar" className="download" download>
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                </a>
            </CheerpJLayout>
        </>
    )
}

export default ThePuzzledCubePage
