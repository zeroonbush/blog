module.exports = {
    title: 'lhs的个人博客',
    keywords: '前端开发',
    description: '前端开发 lhs的个人博客',
    repo: 'https://github.com/zeroonbush/blog',
    base: '/blog/',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    lastUpdated: 'Last Updated',
    themeConfig: {
        logo: '/img/logo.png',
        nav: [
            { text: '首页', link: '/' },
            { text: 'JS', link: '/js_docs/' },
            { text: 'CSS', link: '/css_docs/' },
            { text: 'Vue', link: '/vue_docs/' },
            { text: 'React', link: '/react_docs/' },
            {
                text: '2020',
                ariLabel: '2020',
                items: [
                    { text: 'May', link: '/2020/5/' },
                    { text: 'June', link: '/2020/6/' }
                ]
            },
            { text: 'github', link: 'https://www.baidu.com' }
        ],
        sidebar: {
            '/2020/': [
                ['/2020/5/', '5月份'],
                ['/2020/6/', '6月份']
            ]
        }
    }
}