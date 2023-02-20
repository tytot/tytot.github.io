import path from 'path'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const isProd = process.env.NODE_ENV === 'production'

export default {
    assetPrefix: isProd ? 'https://tytot.github.com' : undefined,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        nextImageExportOptimizer_imageFolderPath: 'public/images',
        nextImageExportOptimizer_exportFolderPath: 'docs',
        nextImageExportOptimizer_quality: 75,
        nextImageExportOptimizer_storePicturesInWEBP: true,
        nextImageExportOptimizer_exportFolderName: 'optimized',
        nextImageExportOptimizer_generateAndUseBlurImages: true,
    },
    images: {
        loader: 'custom',
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    webpack: (config, options) => {
        const rules = config.module.rules
            .find((rule) => typeof rule.oneOf === 'object')
            .oneOf.filter((rule) => Array.isArray(rule.use))
        rules.forEach((rule) => {
            rule.use.forEach((moduleLoader) => {
                if (
                    moduleLoader.loader !== undefined &&
                    moduleLoader.loader.includes('css-loader') &&
                    typeof moduleLoader.options.modules === 'object'
                ) {
                    moduleLoader.options = {
                        ...moduleLoader.options,
                        modules: {
                            ...moduleLoader.options.modules,
                            exportLocalsConvention: 'camelCase',
                        },
                    }
                }
            })
        })
        config.module.rules.push({
            test: /\.mdx?$/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        providerImportSource: '@mdx-js/react',
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [rehypeKatex],
                    },
                },
                {
                    loader: path.resolve('src/lib/mdx-layout-loader.js'),
                },
            ],
        })
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        }
        return config
    },
}
