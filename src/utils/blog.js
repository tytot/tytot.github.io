import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'src', 'pages', 'blog')
let tagMap

const getPost = (slug) => {
    const { data } = matter(fs.readFileSync(join(postsDirectory, slug + '.mdx')))
    return { slug, ...data }
}

export const posts = fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => getPost(filename.replace('.mdx', '')))
    .sort((a, b) => b.date.localeCompare(a.date))

export const tags = (tagMap ??= posts.reduce((map, { slug, tags = [] }) => {
    tags.forEach((tag) => {
        if (!map.has(tag)) {
            map.set(tag, [])
        }
        map.get(tag).push(slug)
    })
    return map
}, new Map()))

export const getPostsWithTag = (tag) => {
    return tags
        .get(tag)
        .map((slug) => getPost(slug))
}
