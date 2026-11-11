# 肖泽韬 · 个人简历主页

一个基于 Next.js 16 的个人简历站点，展示前端工程师肖泽韬的工作经历、项目作品、荣誉与教育背景。紫色主题，支持 3D 首屏与项目详情页的交互展示。

- 线上地址：https://xiaozetao-resume.pages.woa.com （仅白名单可访问）
- 代码仓库：https://git.woa.com/toddxiao/resume

## 页面

| 路由 | 说明 |
| --- | --- |
| `/` | 首页：3D 首屏、项目网格、荣誉列表、技能与经历 |
| `/about` | 关于：头像、简介、技能与工作经历 |
| `/projects` | 项目列表：按时间倒序展示，支持搜索与标签筛选 |
| `/projects/[slug]` | 项目详情：概述、项目演示、核心能力、技术细节 |
| `/blog` | 个人简介：简介、荣誉、工作经历、教育背景、相关链接 |
| `/contact` | 联系方式 |

项目按时间倒序排列：无畏契约赛事系统、VES 办赛平台、GrowthWork、Xverse Upload Tool（元象时期，2022.07–2025.07）、咔擦相机。

## 本地运行

环境要求：Node.js >= 22，npm。

```bash
npm install
npm run dev        # 默认监听 http://127.0.0.1:3000
```

其他命令：

```bash
npm run build      # 生产构建（服务端模式）
npm run start      # 启动构建产物
npm run lint       # ESLint 检查
```

## 内容修改

个人信息与展示内容集中在 `lib/` 下，不需要改组件代码：

- `lib/data.js`：站点信息 `siteConfig`、导航、工作经历、教育、荣誉 `honors`、相关链接 `profileLinks`、项目卡片列表 `projects`
- `lib/projects-data.js`：项目详情数据，通过 `createProject({...})` 生成，包含主图、演示截图、技术细节等
- `lib/cms-shared.js`：页面文案默认值 `pageContentDefaults` 与主题色 `themeDefaults`
- `lib/skillsData.js`：技能分类与技能卡片
- `public/images/`：头像、项目图片与截图，替换同名文件即可生效

图片有浏览器缓存，替换文件时建议改用新文件名，并清理 `.next/cache/images`。

## 技术架构

详见 [docs/architecture.md](docs/architecture.md)。简要说明：

- 框架：Next.js 16（App Router）+ React 19，样式使用 Tailwind CSS v4
- 动效：Framer Motion（页面过渡、滚动揭示）+ React Three Fiber（首屏 3D 几何体）
- 内容：静态数据驱动，页面由 `CmsProvider` 注入站点配置，不依赖数据库
- 交互：去掉自定义光标、全局 `cursor: none` 与 OrbitControls，3D 首屏的跟随插值与帧率无关，避免卡顿
- AI 助手：代码保留，由 `ChatWrapper.js` 中的 `ENABLE_AI_CHAT` 开关关闭

## 部署

线上版本为静态导出：

1. 在静态副本目录中设置 `output: 'export'`、`trailingSlash: true`、`images.unoptimized: true`，去掉 `admin`、`api` 等动态路由
2. `npm run build` 生成 `out/` 目录
3. 将 `out/` 打包为 zip，通过 OA Pages API 发布到 `xiaozetao-resume.pages.woa.com`

## 致谢

项目最初基于 [HazemHassine/developer-portfolio-template](https://github.com/HazemHassine/developer-portfolio-template) 改造。
