import { SEO } from '@components'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheerpJLayout from 'src/components/cheerpj-layout/cheerpj-layout'

const PoolPage = () => {
    return (
        <>
            <SEO title="Pool" />
            <CheerpJLayout jarPath="Pool.jar" displayWidth={960} displayHeight={960}>
                <h1>Pool</h1>
                <p>
                    A Java Swing rendition of Pool. This was one of the first programming projects I ever made, so
                    please excuse the questionable physics. The embedded version below runs painfully slow, so I suggest
                    downloading the JAR and running it on your machine!
                </p>
                <a href="/Pool.jar" className="download">
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                </a>
            </CheerpJLayout>
        </>
    )
}

export default PoolPage
