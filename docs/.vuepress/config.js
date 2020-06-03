module.exports = {
    base: '/',
    title: 'fengrixin',
    description: 'I don\'t know anything with certainty, but seeing the stars makes me dream.',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['script', {}, `
         (function(){
            var html = document.createElement('script');
            html.src = 'https://www.googletagmanager.com/gtag/js?id=UA-166891571-1';
            var script = document.getElementsByTagName('script')[0]'
            script.parentNode.insertBefore(html, script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'UA-166891571-1');
         })();
        `],
        ['meta', {name: 'keywords', content: '冯日新, fengrixin, rixin, 飘渺云轩'}],
        ['meta', {name: 'author', content: 'rixin, s2675563468, fengrixin@yeah.net'}],
        ['meta', {name: 'copyright', content: 'rixin'}],
        ['meta', {name: 'renderer', content: 'webkit'}], // 指定默认 webkit 内核渲染
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
            // {
            //     text: '唠一唠',
            //     items: [
            //         // {text: '关于生活', link: '/chat/life'},
            //         // {text: '关于工作', link: '/chat/work'},
            //         {text: '关于投资', link: '/chat/invest'}
            //     ]
            // },
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
                '/learn/js/es6',
                '/learn/js/point',
                '/learn/js/tools',
            ],
            '/learn/css/': [
                '/learn/css/',
                '/learn/css/magic'
            ],
            '/learn/html/': [
                '/learn/html'
            ],
            '/watch/': [
                '/watch/repository',
                '/watch/website',
                '/watch/article',
                '/watch/plugin'
            ],
            '/chat/': [
                // '/chat/life',
                // '/chat/work',
                '/chat/invest'
            ]
        },
        lastUpdated: '上次更新'
    },
    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-166891571-1'
            }
        ]
    ]
}
