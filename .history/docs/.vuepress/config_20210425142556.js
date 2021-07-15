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
                            {text: '浏览器工作原理', link: '/learn/browser/'},
                            {text: 'JavaScript', link: '/learn/js/es6'},
                            {text: 'CSS', link: '/learn/css/'},
                            {text: 'HTML', link: '/learn/html/'},
                        ]
                    },
                    {
                        text: '楼层',
                        items: [
                            {text: 'Vue', link: '/learn/vue/'},
                            {text: 'Node.js', link: '/learn/node/'},
                            {text: '小程序', link: '/learn/mini/index'},
                        ]
                    },
                    {
                        text: '电梯',
                        items: [
                            {text: '工具链', link: '/learn/tools/chain'},
                            {text: '发布系统', link: '/learn/tools/publish'},
                            {text: '监控系统', link: '/learn/tools/monitor'},
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
                            {text: '微冷知识', link: 'http://www.5you.com/apk/384161.html'}
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
                '/learn/algorithm/algorithm'
            ],
            '/learn/browser':[
                '/learn/browser'
            ],
            '/learn/js/': [
                '/learn/js/es6',
                '/learn/js/point',
                // '/learn/js/tools',
                '/learn/js/typescript'
            ],
            '/learn/css/': [
                '/learn/css/',
                '/learn/css/magic'
            ],
            '/learn/html/': [
                '/learn/html/'
            ],
            '/learn/vue/': [
                '/learn/vue/',
                '/learn/vue/nuxt'
            ],
            '/learn/node/': [
                '/learn/node/'
            ],
            '/learn/mini/': [
                '/learn/mini/',
                '/learn/mini/issue'
            ],
            '/learn/tools/': [
                '/learn/tools/chain',
                '/learn/tools/publish',
                '/learn/tools/monitor'
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
