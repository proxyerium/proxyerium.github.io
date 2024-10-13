---
title: "Made in goHugo | 使用hugo框架搭建个人博客"
date: 2023-09-17T15:36:21+08:00
slug: use-hugo
tags: [web]
# ## these would be better by using shortcode
# links:
#     - title: hugo官方文档
#       website: https://gohugo.io/documentation
#       image: https://gohugo.io/favicon.ico
---

[Hugo](https://gohugo.io/)是一个优秀的静态网页生成框架，适合博客或小型文档之类的没有动态数据交互的网页应用。
一直打算翻新博客，尝试了纯粹三大件、也试过一些其他框架，但因为水平太次最终还是回来投奔Hugo。

## 安装Hugo

所需内容：
- [Git](https://git-scm.com)
- [Go](https://go.dev)
- [Hugo](https://https://github.com/gohugoio/hugo/releases/latest)

Hugo分为standard和extended两个版本。区别是extended版本会把图片处理成WebP格式的，还有自带的sass处理器。两者的占用相差也不大，一般情况都选择extended即可。

## 框架结构

完成上一步安装後，选择合适的位置，输入:

```shell
hugo new site my-site
cd my-site/
git init
```

这样就创建了一个名为`my-site`的新项目，\
目录结构如图所示：

```txt
my-site/
├── archetypes/         <-- 文章模板，统一文章格式
├── assets/             <-- 全局资源，图片、样式、脚本之类
├── content/            <-- 网站内容，组织网站主要内容
├── data/               <-- 通用数据，存放来自站内站外的资源
├── i18n/               <-- 国际化，多语言适配
├── layouts/            <-- 布局模板，不同页面呈现不同样式
├── static/             <-- 静态资源
├── themes/             <-- 主题
└── hugo.toml           <-- 配置文件，网站的全局配置
```

现在可以启动hugo自带的网页服务器，访问默认地址`127.0.0.1:1313`观察网页效果：

```shell
hugo serve
```

## 安装主题

不出意外的话，访问hugo服务首先映入眼帘的，只有page not found一行。
新建项目没有任何的预设布局，网站的DOM结构基本是空的，无法正常呈现内容。

这就轮到theme出马，使用主题避免自己写样式的劳苦，
[Hugo官方的主题仓库](https://themes.gohugo.io/)有许多不同类型不同风格的主题可供挑选。\
我之前使用[stack](https://github.com/CaiJimmy/hugo-theme-stack)，很干净的主题，
不过这一次我想自己做主题，试图锻炼我的审美。

主题使用Git的子模块管理，把中意的主题作为子模块拉到`theme/<theme-name>`文件夹，再修改一行配置文件即可：

```shell
git submodule add https://github.com/CaiJimmy/hugo-theme-stack.git theme/stack
echo "theme = 'stack'" >> hugo.toml
```

现在应该能正常呈现网站内容了。

## 内容管理

Hugo的所有内容都放在`content/`之中管理，根据内容的分层结构处理路由等事务。\
先来介绍一个重要概念，**Page bundles**。page bundle分两种，其一是**leaf bundle**，另一是**branch bundle**。

### leaf bundle

把内容及其配套资源统放到一个文件夹里，其中内涵一个`index.md`，如此形成一个leaf bundle。譬如这里有一个about/文件夹，内涵一篇文章和一张图片：

```txt
content/
└── leaf/
    ├── index.md
    └── cover.jpg

```

顾名思义，leaf喻为植物形态的末端，不再有后继，是内容管理的基本单元。

### branch bundle

而branch bundle则更高一层，可容纳后继的文件夹，用作目录或其他功能页面：

```txt
content/
├── branch/
│   ├── leaf-a/
│   │   └── index.md
│   ├── leaf-b/
│   │   └── index.md
│   └── _index.md
└── _index.md
```

branch/下的`_index.md`和所有内涵的文件夹是一个branch、content/同理，所以这里有两个branch bundles。

> ⚠️ content/作为顶层，自然永远都是brach bundle。

page bundle组织彼此相关联的内容，避免什么资源文件都往`static/`或`assets/`放。

## 配置文件

Hugo之前默认生成一个全局配置文件`hugo.toml`：

```toml
# hugo.toml
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = 'stack'
```

`title`随意修改，这是浏览器标签页的标题；\
`baseURL`是部署地址，我接下来使用Github Action部署网站，所以我改成"https://proxyerium.github.io"。

## 部署网站

部署网站有[许多方法](https://gohugo.io/hosting-and-deployment/)，我还没尝试过Github Action以外的方法，暂且只写这一种 :P

### Github Actions

1. 远程仓库，找到Settings -> Pages -> Source，改成"Github Actions"。
2. 本地仓库，创建工作流脚本`.github/workflows/hugo.yaml`，用官方提供的[工作流模板](https://gohugo.io/hosting-and-deployment/hosting-on-github/#procedure)即可，唯独留心里面的`HUGO_VERSION`对应自己正在使用的版本，免得兼容问题。
3. 整理好所有内容後推送到远程仓库。
4. 找到远程仓库顶部Actions标签页，观赏工作流程，结束後便能访问已部署的网站，大功告成！

## 挖坑

暂时先这样，还有很多核心功能我都还没摸过：shortcodes、templates、i18n、archetypes……应该会填完的吧？

## changelog

|||
|:-:|:--|
| 2024-10-13 | 重写 |
| 2023-02-20 | 略微修改 |
| 2023-09-27 | 略微修改 |
