# anime-web-app-vue3

基于 Vue3 + Vite 构建的动漫信息展示应用，通过 Anilist 公开 GraphQL API 获取动漫数据。该项目是 [anime-web-app](https://github.com/oirodolfo/anime-web-app) 的重构版本，从 React 技术栈迁移至 Vue3 生态。

## 项目概述

本项目旨在提供一个简洁美观的动漫信息浏览平台，支持热门动漫展示、关键词搜索、动漫详情查看等功能。相比原 React 版本，主要进行了以下技术栈升级与功能优化：

- 技术栈迁移：Vue3 + Vite 替代 React + Create React App
- 状态管理：使用 Pinia 替换 Apollo 本地状态管理
- 样式解决方案：采用 TailwindCSS 替代 Material-UI
- 体验优化：新增无限滚动加载和图片懒加载功能

## 技术栈

- **核心框架**：Vue 3
- **构建工具**：Vite
- **状态管理**：Pinia
- **API 通信**：Apollo Client + GraphQL
- **路由管理**：Vue Router
- **样式框架**：TailwindCSS
- **工具库**：@vueuse/core（无限滚动）、lodash-es（防抖）

## 项目结构

```
anime-web-app-vue3/
├── index.html                 # 入口 HTML
├── package.json               # 项目依赖配置
├── vite.config.js             # Vite 配置（含 API 代理）
├── tailwind.config.js         # TailwindCSS 配置
├── postcss.config.js          # PostCSS 配置
├── src/
│   ├── main.js                # 应用入口文件
│   ├── App.vue                # 根组件
│   ├── router/index.js        # 路由配置
│   ├── stores/anime.js        # Pinia 状态管理（动漫数据）
│   ├── apollo/index.js        # Apollo Client 配置
│   ├── directives/vLazy.js    # 图片懒加载指令
│   ├── components/
│   │   ├── AnimeCard.vue      # 动漫卡片组件
│   │   ├── AnimeGrid.vue      # 动漫网格布局（含无限滚动）
│   │   ├── SearchBar.vue      # 搜索组件
│   │   └── AnimeDetail.vue    # 动漫详情弹窗
│   └── assets/
│       └── tailwind.css       # Tailwind 样式入口
```

## 安装与运行

1. 克隆仓库
   ```bash
   git clone https://github.com/your-username/anime-web-app-vue3.git
   cd anime-web-app-vue3
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器（默认端口 3000）
   ```bash
   npm run dev
   ```

4. 构建生产版本
   ```bash
   npm run build
   ```

5. 预览生产版本
   ```bash
   npm run preview
   ```

## 功能特点

- **热门动漫展示**：默认展示热门动漫列表，按 popularity 排序
- **搜索功能**：支持关键词搜索，实时展示匹配结果
- **无限滚动**：滚动至页面底部自动加载更多内容
- **图片懒加载**：优化图片加载性能，提升页面响应速度
- **详情查看**：点击动漫卡片可查看详细信息（标题、集数、类型、描述等）

## API 来源

数据来源于 [Anilist GraphQL API](https://graphql.anilist.co/)，一个公开的动漫数据接口，提供丰富的动漫信息。

## 原项目地址

[https://github.com/oirodolfo/anime-web-app](https://github.com/oirodolfo/anime-web-app)（React 版本）

## 许可证
本项目采用 [MIT 许可证](LICENSE) 开源，详情见 LICENSE 文件。