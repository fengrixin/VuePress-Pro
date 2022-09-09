const { copyCodePlugin } = require("vuepress-plugin-copy-code2");

module.exports = {
  base: "/",
  title: "fengrixin",
  description:
    "I don't know anything with certainty, but seeing the stars makes me dream.",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "script",
      {},
      `
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
        `,
    ],
    [
      "meta",
      { name: "keywords", content: "冯日新, fengrixin, rixin, 飘渺云轩" },
    ],
    [
      "meta",
      { name: "author", content: "rixin, s2675563468, fengrixin@yeah.net" },
    ],
    ["meta", { name: "copyright", content: "rixin" }],
    ["meta", { name: "renderer", content: "webkit" }], // 指定默认 webkit 内核渲染
  ],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      {
        text: "JS",
        items: [
          { text: "ES6+", link: "/learn/js/es6" },
          { text: "八股文", link: "/learn/js/point" },
        ],
      },
      {
        text: "Vue",
        items: [
          { text: "Vue", link: "/learn/vue/" },
          { text: "Node.js", link: "/learn/node/" },
          { text: "小程序", link: "/learn/mini/index" },
        ],
      },
      {
        text: "浏览器",
        items: [
          { text: "CSS", link: "/learn/css/" },
          { text: "HTML", link: "/learn/html/" },
        ],
      },
      {
        text: "工程化",
        link: "/learn/tools/chain",
      },
      {
        text: "算法",
        link: "/algorithm/data_structure",
      },
      {
        text: "面试",
        link: "/interview/step-1",
      },
      {
        text: "其他",
        items: [
          {
            text: "仓库",
            items: [
              { text: "第三方库", link: "/watch/repository" },
              { text: "好玩的网站", link: "/watch/website" },
              { text: "牛掰的文章", link: "/watch/article" },
              { text: "扩展&插件", link: "/watch/plugin" },
            ],
          },
          {
            text: "作品",
            items: [
              { text: "微冷知识", link: "http://www.5you.com/apk/384161.html" },
            ],
          },
        ],
      },
      { text: "GitHub", link: "https://github.com/fengrixin" },
    ],
    sidebarDepth: 2,
    sidebar: {
      "/algorithm/": ["/algorithm/data_structure", "/algorithm/algorithm"],
      "/interview/": ["/interview/step-1"],
      "/learn/browser/": ["/learn/browser/"],
      "/learn/js/es6": ["/learn/js/es6", "/learn/js/tools"],
      "/learn/js/point": ["/learn/js/point"],
      "/learn/css/": ["/learn/css/", "/learn/css/magic"],
      "/learn/html/": ["/learn/html/"],
      "/learn/vue/": ["/learn/vue/", "/learn/vue/nuxt"],
      "/learn/node/": ["/learn/node/"],
      "/learn/mini/": ["/learn/mini/", "/learn/mini/issue"],
      "/learn/tools/chain": ["/learn/tools/chain"],
      "/watch/": [
        "/watch/repository",
        "/watch/website",
        "/watch/article",
        "/watch/plugin",
      ],
    },
    lastUpdated: "上次更新",
  },
  plugins: [
    copyCodePlugin({}),
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-166891571-1",
      },
    ],
  ],
};
