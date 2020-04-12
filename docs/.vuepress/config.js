module.exports = {
    base: '/',
    title: 'fengrixin',
    description: 'I don\'t know anything with certainty, but seeing the stars makes me dream.',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {
                text: '学一学',
                items: [
                    {
                        text: '地基',
                        items: [
                            {text: '数据结构和算法', link: '/learn/algorithm/'},
                            {text: 'JavaScript', link: '/learn/js/es6'},
                            {text: 'CSS3', link: '/learn/css/'},
                            {text: 'HTML5', link: '/learn/html/'}
                        ]
                    },
                    {
                        text: '楼层',
                        items: [
                            {text: 'Vue', link: '/learn/vue/'},
                            {text: '小程序', link: '/learn/mini/'},
                        ]
                    },
                    {
                        text: '电梯',
                        items: [
                            {text: 'Webpack', link: '/learn/tools/webpack'},
                            {text: 'Gulp', link: '/learn/tools/gulp'}
                        ]
                    }
                ]
            },
            {
                text: '看一看',
                items: [
                    {
                        text: '仓库',
                        items: [
                            {text: '第三方库', link: '/watch/repository'},
                            {text: '好玩的网站', link: '/watch/website'},
                            {text: '牛掰的文章', link: '/watch/article'},
                            {text: '扩展&插件', link: '/watch/plugin'},
                        ]
                    },
                    {
                        text: '作品',
                        items: [
                            {text: '微冷知识', link: 'http://app.mi.com/details?id=com.rixin.cold'}
                        ]
                    }
                ]
            },
            {
                text: '唠一唠',
                items: [
                    {text: '害羞中...', link: ''}
                ]
            },
            {text: 'GitHub', link: 'https://github.com/fengrixin'}
        ],
        sidebarDepth: 2,
        sidebar: {
            '/learn/algorithm/': [
                '/learn/algorithm/',
                '/learn/algorithm/data_structure',
                '/learn/algorithm/algorithm',
            ],
            '/learn/js/': [
                {
                    title: 'ES6',
                    children: [
                        '/learn/js/es6',
                        '/learn/js/array',
                        '/learn/js/string'
                    ]
                }
            ],
            '/learn/css/': [
                '/learn/css/',
                '/learn/css/magic'
            ],
            'learn/html/': [
                '/learn/html'
            ],
            '/watch/': [
                '/watch/repository',
                '/watch/website',
                '/watch/article',
                '/watch/plugin'
            ]
        },
        lastUpdated: '上次更新'
    }
}
