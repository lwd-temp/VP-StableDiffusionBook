import { defineConfig } from "vitepress";
import { SearchPlugin } from "../src/plugins/search/plugin";
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'

const links = []

export default defineConfig({
    title: 'AiDraw',
    description:
        '关于使用 Ai 绘画的 Wiki ，翻译，教程，相关资源。主要内容为 StableDiffusionWebUI',
    lang: 'zh-CN',
    lastUpdated: true,
    outDir: './dist',
    srcDir: './src',
    ignoreDeadLinks: true,
    cleanUrls: 'without-subfolders',
    themeConfig: {
        logo: '/paintbrush-solid.svg',
        outlineTitle: '在这一页上',
        nav: [
            { text: '指南', link: '/guide/' },
            {
                text: '深入',
                link: '/advanced/',
            },
            { text: '新闻', link: '/newsfeed' },
            { text: '附录', link: '/appendix' },
            { text: 'NovelAI.dev', link: 'https://novelai.dev' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '新手指南',
                    items: [{ text: '前言', link: '/guide/' }],
                },
                {
                    text: '起步于此',
                    collapsible: true,
                    items: [
                        { text: '术语解释', link: '/guide/glossary' },
                        {
                            text: '硬件要求',
                            link: '/guide/requirements',
                        },
                    ],
                },
                {
                    text: '安装与配置',
                    collapsible: true,
                    items: [
                        {
                            text: 'SD-WebUI 方案',
                            link: '/guide/install/sd-webui',
                        },
                        {
                            text: 'NAI 官方套件方案',
                            link: '/guide/install/original',
                        },
                        {
                            text: '其他方案',
                            link: '/guide/install/others',
                        },
                    ],
                },
                {
                    text: '配置与调试',
                    collapsible: true,
                    items: [
                        { text: '引言', link: '/guide/configuration/' },
                        {
                            text: '调参基础',
                            link: '/guide/configuration/param-basic',
                        },
                        {
                            text: '进阶配置',
                            link: '/guide/configuration/param-advanced',
                        },
                        {
                            text: '疑难解答',
                            link: '/guide/configuration/troubleshoot',
                        },
                        {
                            text: '其他',
                            link: '/guide/configuration/other',
                        },
                    ],
                },
            ],
            '/advanced/': [
                {
                    text: '进阶深入',
                    items: [{ text: '前言', link: '/advanced/' }],
                },
                {
                    text: '提示词工程学',
                    collapsible: true,
                    items: [
                        { text: '概述', link: '/advanced/prompt-engineering/' },
                        {
                            text: '魔法入门',
                            link: '/advanced/prompt-engineering/basic',
                        },
                        {
                            text: '实战技巧',
                            link: '/advanced/prompt-engineering/practice',
                        },
                        {
                            text: '魔法进阶',
                            link: '/advanced/prompt-engineering/advanced',
                        },
                        {
                            text: '杂项',
                            link: '/advanced/prompt-engineering/misc',
                        },
                    ],
                },
                {
                    text: '模型精调',
                    collapsible: true,
                    items: [
                        {
                            text: '概述',
                            link: '/advanced/finetuning/',
                        },
                        {
                            text: 'Textual Inversion',
                            link: '/advanced/finetuning/textual-inversion',
                        },
                        {
                            text: 'Hypernetwork',
                            link: '/advanced/finetuning/hypernetwork',
                        },
                        {
                            text: 'Dreambooth',
                            link: '/advanced/finetuning/dreambooth',
                        },
                        {
                            text: 'Aesthetic Gradients',
                            link: '/advanced/finetuning/aesthetic-gradients',
                        },
                    ],
                },
                {
                    text: '二次开发',
                    collapsible: true,
                    items: [
                        {
                            text: '插件',
                            link: '/advanced/development/extensions',
                        },
                        {
                            text: '自定义脚本',
                            link: '/advanced/development/scripts',
                        },
                        {
                            text: 'API',
                            link: '/advanced/development/api',
                        },
                    ],
                },
            ],
        },
        footer: {
            message: 'Released under the GNU Free Documentation License.',
            copyright:
                'Copyright © 2022-present StableDiffusionBook Contributors',
        },
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/wfjsw/VP-StableDiffusionBook',
            },
        ],
        editLink: {
            pattern:
                'https://github.com/wfjsw/VP-StableDiffusionBook/edit/master/src/:path',
            text: '提出修改意见',
        },
        lastUpdatedText: '修改日期',
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
    },
    vite: {
        plugins: [
            SearchPlugin({
                profile: 'score',
                tokenize: 'reverse',
                cache: 50,
                context: {
                    resolution: 4,
                    depth: 5,
                },
                fastupdate: false,
                filter: [
                    // array blacklist
                    '的',
                    '得',
                    '地',
                    '了',
                    ' ',
                    ...'!@#$%^&*！￥……&*/\\,.，。<>《》；：;:"\'“”’‘[]{}|()（）-—'.split(
                        ''
                    ),
                ],
            }),
        ],
    },

    head: [
        [
            'script',
            {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-86153EB058',
            },
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-86153EB058');",
        ],
    ],

    shouldPreload(link, page) {
        if (link.includes('virtual_search-preview') || link.includes('virtual_search-index')) {
            return false
        }
        return true
    },

    async transformHtml(_, id, { pageData }) {
        if (!id.endsWith('404.html')) {
            links.push({
                // you might need to change this if not using clean urls mode
                url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
                lastmod: pageData.lastUpdated,
            })
        }
    },
    async buildEnd({ outDir }) {
        const sitemap = new SitemapStream({
            hostname: 'https://guide.novelai.dev/',
        })
        const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
        sitemap.pipe(writeStream)
        links.forEach((link) => sitemap.write(link))
        sitemap.end()
    },
})
