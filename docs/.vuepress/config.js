module.exports = {
    title: 'lhs的个人博客',
    keywords: '前端开发',
    description: '前端开发 lhs的个人博客',
    repo: 'https://github.com/zeroonbush/blog.git',
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
            // { text: 'CSS', link: '/css_docs/' },
            { text: 'Vue', link: '/vue_docs/' },
            { text: 'Node', link: '/node_docs/' },
            { text: 'Dart', link: '/dart/' },
            
            // { text: 'React', link: '/react_docs/' },
            // {
            //     text: '2020',
            //     ariLabel: '2020',
            //     items: [
            //         { text: 'May', link: '/2020/5/' },
            //         { text: 'June', link: '/2020/6/' }
            //     ]
            // },
            { text:'啥都有',link:'/other/' },
            // { text:'每周计划',link:'/plan/' },
            { text: 'github', link: 'https://github.com/zeroonbush/blog.git' }
        ],
        sidebar: {
            '/js_docs/':[
               '',
               'JS精度问题',
               'Set数据结构',
               'Map数据结构',
               'with语法',
               'void 0与undefined的关系',
               '浅谈基本包装类型',
               'js中容易忽略的参数',
               'new的时候干了啥',
               'JS调用函数的4种方式',
               '一文了解this指向',
               '函数防抖和节流',
               'EventTarget介绍',
               '深拷贝和浅拷贝了解一下',
               '原型和原型链',
               'JS生成UUID的多种方式',
               'JSON中的stringify方法',
               '一网打尽JS中的循环和遍历',
               '函数的形参和实参'
            ],
            // '/2020/': [
            //     ['/2020/5/', '5月份'],
            //     ['/2020/6/', '6月份']
            // ],
            '/other/':[
                '',
                'tool',
                'vuepress搭建个人博客并部署',
                'Git常用指令',
                'Markdown语法',
                'npm发包流程',
                '发行ERC20代币',
                'Flutter构建Android包',
                '简简单单的来入个deno的门吧'
            ],
            '/vue_docs/':[
                 '',
                 '数据响应式'
            ],
            // '/plan/':[
            //     '',
            //     '200525-200531'
            // ],
            '/node_docs/':[
                '',
                'node发送邮件',
                'exports和module.exports',
            ],
            '/dart/':[
                '',
                '变量和类型',
                '函数',
                '运算符和控制流程语句',
                '类',
                '其他'
            ]
        }
    }
}