# DIY A Gitbook theme for hqbook

![Image](https://github.com/HaoqiangChen/gitbook-plugin-theme-hqbook/raw/master/_assets/preview.png)

## 使用方法

安装您的插件使用:

```bash
$ gitbook install
OR
$ npm i -D gitbook-plugin-theme-hqbook
```

将主题添加到您的图书配置 `book.json` 或者 `book.js`中:

```json5
{
    "plugins": [
        "theme-hqbook"
    ]
}
```

## 配置

整体配置

```json5
{
    "plugins": [
        "theme-hqbook"
    ],
    "variables": {
        "themeHqbook":{
            "nav":[
                {
                    "url": "https://www.baidu.com",
                    "target": "_blank",
                    "name": "百度一下"
                },
                // { ... }
            ]
        },
    },
    "pluginsConfig": {
        "theme-hqbook":{
            "favicon": "./favicon.ico",
            "logo":"./logo.png",
            "search-placeholder":"输入关键字搜索",
			"copyButtons": true,
			"copyLines": true,
			"dragSplitter": true,
            "hide-elements": [
                ".summary .gitbook-link"
            ],
            "flexible-linkcard": {
                "title": "flexible-linkcard",
                "hrefUrl": "https://github.com/HaoqiangChen/gitbook-plugin-flexible-linkcard",
                "target": "_blank",
                "imgSrc": "./book/logo.png",
                "imgClass": "rect"
            }
        }
    }
}
```

### favicon
自定义`favicon`地址，修改标题栏图标

### logo
自定义`logo`地址，修改logo

### search-placeholder
搜索框提示信息

### copyButtons
代码块添加复制按钮

### copyLines
当显示多行代码时，将添加行号

### dragSplitter
在左侧目录和右侧内容之间添加一个可以拖拽的栏，用来调整两边的宽度

### hide-elements
隐藏元素，比如导航栏中Published by GitBook

### nav
顶部导航栏，nav为数组，将需要的导航添加到变量`themeHqbook`中

### flexible-linkcard

* `title` : 定义`flexible-linkcard`的默认标题
* `hrefUrl` : 定义`flexible-linkcard`的默认网址
* `target` : 定义`flexible-linkcard`的网址默认打开方式，即HTML`<a>`的target属性，属性值有`_seft`, `_blank`, `_parent`, `_top`几种，最好还是设置`_blank`新窗口打开
* `imgSrc` : 定义`flexible-linkcard`的默认显示图片
* `imgClass` : 定义`flexible-linkcard`的默认图片样式

![flexible-linkcard](https://github.com/HaoqiangChen/gitbook-plugin-theme-hqbook/raw/master/_assets/flexible-linkcard.png)

### 代码高亮

新增几个代码高亮样式，配合`prism`插件使用
* prism-atom-dark.css
* prism-ghcolors.css
* prism-vs.css
* prism-xonokai.css
```json5
{
    "pluginsConfig": {
        "prism": {
          "css": [
            "gitbook-plugin-theme-hqbook/_themes/prism-xonokai.css"
          ]
        },
    }
}
```

## 推荐和以下插件配合使用

```
plugins: [
    "-highlight",
    "-lunr",
    "-search",
    "theme-hqbook",
    "chapter-fold",
    "flexible-alerts",
    "lightbox",
    "prism",
    "search-pro"
    //...
]
```

## 更新内容

### version 1.1.0 (2016-08-16T16:36:38)

* fix: `flexible-linkcard`插件样式调整

### version 1.0.8 (2016-08-13T00:21:38)

* fix: 新增`flexible-linkcard`插件，以特定语法美化`<a>`链接，制成漂亮的链接卡片

### version 1.0.7 (2016-07-21T16:54:38)

* fix: 新增在左侧目录和右侧内容之间添加一个可以拖拽的栏，用来调整两边的宽度

### version 1.0.6 (2016-07-20T16:54:38)

* fix: 新增代码添加行号&复制按钮

### version 1.0.5 (2016-07-18T19:19:38)

* fix: 修复上个版本忘记git add `_theme`文件夹

### version 1.0.4 (2016-07-18T18:54:38)

* fix: 新增几个代码高亮样式，配合`prism`插件使用

### version 1.0.3 (2016-07-16T17:54:38)

* fix: 修改默认滚动条样式

### version 1.0.2 (2016-07-15T16:54:38)

* fix: 新增返回顶部按钮

### version 1.0.1 (2016-07-14T09:54:38)

* fix: 新增右侧标题导航栏

### version 1.0.0 (2016-07-13T00:54:38)

* 创建和发布自开发Gitbook主题 theme-hqbook

## Links

[hqbook](https://github.com/HaoqiangChen/hqbook)
[gitbook](http://gitbook.com/)
[theme](https://github.com/HaoqiangChen/gitbook-plugin-theme-hqbook)
[flexible-linkcard](https://github.com/HaoqiangChen/gitbook-plugin-flexible-linkcard)
[prism](https://github.com/gaearon/gitbook-plugin-prism)
[Syntax Highlighting](https://atelierbram.github.io/syntax-highlighting/prism/demo/)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, HaoqiangChen

