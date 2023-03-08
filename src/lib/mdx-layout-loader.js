const matter = require('gray-matter')

const IMG_GROUP_REGEX = /(?:!\[.*\]\(.*\)[ \t]*(?:\r?\n.+)*)+(?:\r?\n\r?\n([^\r\n!<].*))?/g
const IMG_REGEX = /!\[(.*)\]\((.*)\)[ \t]*(?:\r?\n([^\r\n!<].*))*/g
const TAG_REGEX = /<div id="([\w\d-]+)">/g
const REF_REGEX = /\[([^\]]+)\]\(#([\w\d-]+)\)/g
const DETAILS_REGEX = /<details>[\s\S]+?<\/details>/g

const toFigure = ({ alt, caption, index }, scrollable = false) => {
    const image = `<ExportedImage src={img${index}} alt="${alt}" className="dark-invert" />`

    return `
<figure>
${
    scrollable
        ? `
    <div className="scrollable">
        ${image}
    </div>
`
        : `
    ${image}
`
}
    <figcaption>${caption ?? ''}</figcaption>
</figure>
    `
}

module.exports = (source) => {
    const { data, content } = matter(source)

    const allImages = []

    const editedContent = content
        .replaceAll(IMG_GROUP_REGEX, (match, caption, offset) => {
            const images = [...match.matchAll(IMG_REGEX)].map((captures) => ({
                alt: captures[1],
                src: captures[2],
                caption: captures[3],
                index: offset + captures.index,
            }))
            allImages.push(...images)
            if (images.length === 1) {
                return `
${toFigure(images[0], true)}

${caption ?? ''}
            `
            }
            return `
<figure>
    <div className="grouped scrollable">
        ${images
            .map(toFigure)
            .join('\n')
            .split('\n')
            .map((line) => '\t' + line)
            .join('\n')}
    </div>
    <figcaption>${caption ?? ''}</figcaption>
</figure>
        `
        })
        .replaceAll(
            TAG_REGEX,
            (_, tag) => `
<div id="${tag}" className="tag">
    <span>#${tag}</span>
            `
        )
        .replaceAll(REF_REGEX, (_, text, tag) => `<a className="ref" href="#${tag}">${text}</a>`)
        .replaceAll(DETAILS_REGEX, (match) => match.replaceAll(/\r?\n/g, ''))

    const imageImports = allImages.length
        ? `
import ExportedImage from 'next-image-export-optimizer'
${allImages.map(({ src, index }) => `import img${index} from '@${src.slice(1)}'`).join('\n')}`
        : ''

    const output = `
import { Post } from '@components'
${imageImports}
${editedContent}

export const meta = ${JSON.stringify(data)}
export default ({children}) => <Post meta={meta}>{children}</Post>
    `
    return output
}
