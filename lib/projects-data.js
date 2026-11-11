// 项目详情页内容（基于简历整理）。
// 每个 slug 需与 lib/data.js 中 projects 的 slug 保持一致。

import { architectureChart, onsitePrintChart, oToOChart } from "./kacha-diagrams";

const placeholderImage = "/projects/project-placeholder.svg";

function createProject({
  id,
  slug,
  title,
  subtitle,
  category,
  year,
  status,
  headline,
  overview,
  techStack,
  problem,
  solution,
  takeaway,
  architectureLayers,
  capabilities,
  deepDive,
  liveDemo = "",
  primaryImage = placeholderImage,
  screenshots = [],
  architectureDiagrams = [],
}) {
  return {
    id,
    slug,
    aliases: [],
    title,
    subtitle,
    category,
    year,
    status,
    headline,
    summary: headline,
    github: "",
    liveDemo,
    primaryImage,
    demoDescription: `${title}的实际界面与体验入口。`,
    stats: [
      { label: "项目类型", value: category },
      { label: "状态", value: status },
      { label: "角色", value: "前端开发工程师" },
      { label: "年份", value: year },
    ],
    techStack,
    overview,
    problemStatement: {
      problem,
      solution,
      keyTakeaway: takeaway,
    },
    architecture: {
      description: "",
      image: primaryImage,
      asciiDiagram: "",
      layers: architectureLayers,
    },
    keyCapabilities: capabilities,
    technicalDeepDive: deepDive,
    screenshots,
    architectureDiagrams,
    cliOrApiReference: { title: "", items: [] },
    gettingStarted: { prerequisites: [], steps: [] },
  };
}

export const projectsDetail = [
  createProject({
    id: "01",
    slug: "wuqian-esports",
    primaryImage: "/images/wuqian-esports.jpg",
    screenshots: [
      {
        src: "/images/wuqian-esports-miniprogram.png",
        alt: "无畏契约赛事小程序体验码",
        caption: "小程序体验：微信扫码进入",
      },
    ],
    title: "无畏契约赛事系统",
    subtitle: "手游电竞赛事多端前端",
    category: "多端电竞赛事",
    year: "2025.07 - 至今",
    status: "当前在研",
    headline:
      "为《无畏契约》手游搭建端内、小程序、H5 与 PC 办赛端组成的多端赛事体系，承载多阶段赛制。",
    overview: [
      "原有的赛事体系以 H5 与 PC 办赛端为主。我们把它扩展为端内、小程序、H5 与 PC 的多端体系，覆盖玩家从报名到晋级的完整链路。",
      "我在这个项目中主导全国大赛等官方赛事的前端实现，负责端内 Hippy 页面、小程序端的开发，以及赛制状态与埋点监控的工程化建设。",
    ],
    techStack: ["Hippy", "Vue 3", "Uni-app", "TypeScript", "Aegis"],
    problem:
      "同一套赛事规则要在端内、小程序与 H5 上一致呈现，而赛事节奏按周推进，活动期间流量集中。",
    solution:
      "UI 按端分别实现，赛制状态计算、接口与类型、埋点与监控抽成共享逻辑；赛制由配置驱动，阶段切换由服务端时间统一判定。",
    takeaway:
      "让逻辑共享而 UI 分端，既避免两端规则不一致，也不把跨端差异强行抹平。",
    architectureLayers: [
      {
        name: "端内页面",
        description: "Hippy + Vue 3 原生渲染，通过宿主桥接获取登录态与分享能力。",
        tech: "Hippy, Vue 3",
      },
      {
        name: "小程序与 H5",
        description: "Uni-app 实现的小程序端，与端内共享接口和赛制逻辑。",
        tech: "Uni-app, Vue 3",
      },
      {
        name: "共享逻辑层",
        description: "接口定义、TS 类型、赛制状态计算、埋点与监控。",
        tech: "TypeScript, Composition API",
      },
    ],
    capabilities: [
      {
        title: "多阶段赛制",
        description: "周赛、海选赛、晋级赛与全国大赛的状态推导与流转，由配置驱动。",
      },
      {
        title: "跨端一致",
        description: "UI 分端实现，逻辑共享，避免两端规则不一致。",
      },
      {
        title: "线上稳定性",
        description: "接入 Aegis 监控并过滤已知噪音错误，让告警更可信。",
      },
    ],
    deepDive: [
      {
        title: "以服务端时间为准",
        content:
          "阶段判定依赖服务端下发的时间，本地倒计时用服务端时间加上本地单调递增的偏移计算，避免用户修改系统时间影响赛制。",
      },
      {
        title: "通用化埋点",
        content:
          "曝光与点击通过统一指令声明，通用维度集中存放并自动拼接，所有事件收敛到同一个上报出口，便于统一改通道与采样。",
      },
    ],
  }),
  createProject({
    id: "02",
    slug: "ves-arena",
    title: "VES 办赛平台",
    subtitle: "电竞赛事 PC 管理端 · AI Native 重构",
    category: "电竞办赛后台",
    year: "2025.07 - 至今",
    status: "进行中",
    liveDemo: "https://ves.qq.com/console/index.html#/universe/login",
    primaryImage: "/images/ves-arena-tga.jpg",
    screenshots: [],
    headline:
      "面向电竞办赛的 PC 管理端，同时支撑瓦手专用版与通用版，并正在用 AI Native 方式推进重构。",
    overview: [
      "VES 办赛平台承担报名管理、随机匹配、多赛道赛程、阶段设置与排名等核心办赛流程。平台同时支撑瓦手专用版与通用版两种办赛形态。",
      "当前正在用 AI Native 的方式重构：先从存量源码抽取页面与交互规格，再让 AI 生成高保真原型，并与原实现逐项对齐后落地到新架构。",
    ],
    techStack: ["Vue 3", "TypeScript", "TDesign", "Vue Query"],
    problem:
      "存量办赛系统业务逻辑多、文档少，人工梳理慢；直接让 AI 重写容易做到“看起来对，细节全错”。",
    solution:
      "先把隐性知识显性化为 Spec，再让 AI 在 Spec 与设计规范、组件清单的约束下生成原型，最后做字段级对齐验收。",
    takeaway:
      "AI 生成的结果要用原实现做字段级验收，而不是只看文件是否存在。",
    architectureLayers: [
      {
        name: "存量源码",
        description: "现有 ves-admin 实现，是功能与字段的事实来源。",
        tech: "Vue 3, TypeScript",
      },
      {
        name: "Spec 与知识库",
        description: "由 Skill 抽取页面、字段、交互与状态；设计规范与组件清单作为 AI 上下文。",
        tech: "Skill, Markdown",
      },
      {
        name: "原型与新架构",
        description: "AI 生成高保真原型，逐项对齐后落地到新架构。",
        tech: "TDesign, Vue Query",
      },
    ],
    capabilities: [
      {
        title: "复杂办赛流程",
        description: "报名、随机匹配、多赛道赛程、阶段设置与排名等模块。",
      },
      {
        title: "组件库与设计 Token",
        description: "基于 TDesign 二次封装业务组件，用 Token 统一品牌色与交互规范。",
      },
      {
        title: "AI Native 重构",
        description: "Spec 驱动的 AI 生成与字段级对齐，降低存量系统的还原成本。",
      },
    ],
    deepDive: [
      {
        title: "保证 AI 产出正确",
        content:
          "Spec 作为唯一事实来源，禁止臆造字段；生成结果与原实现做字段级对比，不一致则回退重来，最后由人 review 并小步提交。",
      },
      {
        title: "专用版与通用版",
        content:
          "两种形态共用底座，差异通过赛事配置与特性开关区分，而不是复制两份代码。",
      },
    ],
  }),
  createProject({
    id: "03",
    slug: "growthwork",
    liveDemo: "https://growthwork.woa.com/",
    primaryImage: "/images/growthwork.png",
    screenshots: [
      {
        src: "/images/growthwork-detail.png",
        alt: "GrowthWork 交互稿评论详情",
        caption: "交互稿评论：在原型上直接批注",
      },
    ],
    title: "GrowthWork",
    subtitle: "交互稿协同评审平台",
    category: "AI Native 工具",
    year: "进行中",
    status: "工具开发中",
    headline:
      "让产品、设计、开发直接在可交互的前端原型上做评审，评论精准绑定到 DOM 元素。",
    overview: [
      "评审意见如果散落在聊天里，就无法对应到具体元素和版本。GrowthWork 让评论直接钉在原型的 DOM 元素上，并按版本隔离。",
      "平台还配套了规范、设计稿生成与评审 3 个 AI Skill，让“写规范 → 生成原型 → 评审”形成闭环。",
    ],
    techStack: ["Vue 3", "Node.js", "Tencent COS"],
    problem:
      "评审对象是可交互的前端原型而非静态稿，改版后 DOM 结构变化，评论容易错位。",
    solution:
      "跨文档锚定引擎用多重锚点（结构路径、元素特征、相对坐标）定位元素，路径失效时用特征模糊匹配，找不到则标记为“元素已变更”，而不是错位。",
    takeaway:
      "评论锚点要允许失效，宁可标记变更，也不要悄悄绑到错误的元素上。",
    architectureLayers: [
      {
        name: "评审台",
        description: "Vue 3 评论面板，通过 postMessage 与原型 iframe 通信。",
        tech: "Vue 3, postMessage",
      },
      {
        name: "原型与快照",
        description: "原型通过同源代理挂载，快照与历史版本存入腾讯云 COS。",
        tech: "Vite proxy, Tencent COS",
      },
      {
        name: "服务端",
        description: "评论数据、快照接口与鉴权。",
        tech: "Node.js",
      },
    ],
    capabilities: [
      {
        title: "元素级批注",
        description: "评论绑定到 DOM 元素，并按快照版本与路由隔离。",
      },
      {
        title: "AI Skill 闭环",
        description: "规范、设计稿生成与评审 3 个 Skill，串起从需求到评审的流程。",
      },
    ],
    deepDive: [
      {
        title: "跨文档锚定",
        content:
          "父页面负责评论面板，iframe 内注入标注脚本，通过 postMessage 回传元素信息并校验来源 origin。",
      },
      {
        title: "版本隔离",
        content:
          "评论的 key 为快照版本加页面路由，同一页面不同版本的评论互不干扰，并支持回看历史版本。",
      },
    ],
  }),
  createProject({
    id: "04",
    slug: "xverse-upload-tool",
    title: "Xverse Upload Tool",
    subtitle: "Figma 设计稿上传插件",
    category: "FIGMA 插件",
    year: "2022.07 - 2025.07",
    status: "已上线",
    headline:
      "面向设计稿导出的 Figma 插件：选择节点、设置倍数与格式后一键上传。登录鉴权与低代码平台的打通能力被抽离出来，独立作为插件使用。",
    liveDemo: "https://www.figma.com/community/plugin/1243765449139402836/xverse-upload-tool",
    primaryImage: "/images/xverse-upload-tool.png",
    screenshots: [],
    overview: [
      "设计师在 Figma 中选中节点后，需要手动导出图片并逐个上传到平台，流程繁琐且容易出错。Xverse Upload Tool 把这一步收敛到插件内完成。",
      "我在低代码平台的集成中实现了登录鉴权，并与平台能力打通。随后把这部分通用能力抽离出来，作为一个单独的 Figma 插件对外使用。",
    ],
    techStack: ["Figma Plugin API", "登录鉴权", "低代码平台对接"],
    problem:
      "原有的上传流程依赖手动导出与逐个上传，且登录态、平台能力与插件环境耦合在一起，难以单独复用。",
    solution:
      "插件内选择目录、倍数与格式后直接上传；登录鉴权与平台对接能力从低代码集成中抽离，作为独立模块提供给插件使用。",
    takeaway:
      "把与业务平台耦合的能力抽成独立模块，才能让同一套鉴权和上传能力在插件等不同场景里复用。",
    architectureLayers: [
      {
        name: "Figma 插件界面",
        description: "选择节点、目录、倍数与格式，触发导出与上传。",
        tech: "Figma Plugin API",
      },
      {
        name: "鉴权与平台对接",
        description: "从低代码平台集成中抽离的登录鉴权与上传接口。",
        tech: "登录鉴权, 低代码平台",
      },
    ],
    capabilities: [
      {
        title: "一键上传",
        description: "选中节点后设置倍数与格式，直接上传到目标目录。",
      },
      {
        title: "登录鉴权复用",
        description: "鉴权能力从低代码集成中抽离，可被其他插件或场景直接复用。",
      },
    ],
    deepDive: [
      {
        title: "能力抽离",
        content:
          "原本与低代码平台耦合在一起的登录与上传逻辑被拆成独立模块，插件只依赖抽离后的接口，降低了与平台的耦合。",
      },
    ],
  }),
  createProject({
    id: "05",
    slug: "kacha-camera",
    title: "咔擦相机",
    subtitle: "AIGC 主题照拍摄打印体系",
    category: "AIGC × Electron",
    year: "2022.07 - 2025.07",
    status: "已归档",
    primaryImage: "/images/kacha-camera.jpg",
    architectureDiagrams: [
      { title: "整体架构", chart: architectureChart },
      { title: "线下现拍现打", chart: onsitePrintChart },
      { title: "小程序下单 → 线下打印（O2O）", chart: oToOChart },
    ],
    headline:
      "线下 AIGC 互动产品：用户现场拍摄，AI 生成指定场景主题照，设备现场打印；线上也可下单到线下打印。",
    overview: [
      "咔擦相机由三端组成：面向线上用户的小程序、安装在设备上的 Electron 客户端，以及面向运营的 PC 设备管理端，分别服务线上用户、线下设备和运营人员。",
      "我在项目中参与了 Electron 客户端与相关链路的前端实现，包括拍摄、AI 生成、排版合成与打印的流程打通，以及小程序订单到设备的对接。",
    ],
    techStack: ["Taro", "React", "Electron", "Ant Design"],
    problem:
      "需要在线下设备上稳定完成拍摄、生成、打印的全流程，同时支持线上用户下单后到线下打印。",
    solution:
      "小程序端用 Taro + React + Ant Design Mobile，PC 管理端用 React + Ant Design，设备端用 Electron 封装摄像头与打印机，经 preload 暴露安全 IPC，并通过 WebSocket 接收订单。",
    takeaway:
      "Electron 的渲染进程和主进程要严格分工，设备能力只通过白名单 IPC 暴露。",
    architectureLayers: [
      {
        name: "小程序端",
        description: "面向线上用户，下单并查看生成结果。",
        tech: "Taro, React, Ant Design Mobile",
      },
      {
        name: "Electron 设备客户端",
        description: "主进程封装摄像头、打印机与设备状态，渲染进程负责拍摄与交互。",
        tech: "Electron, React, CUPS",
      },
      {
        name: "PC 管理端",
        description: "统一查看多台设备的在线状态、耗材与订单。",
        tech: "React, Ant Design",
      },
    ],
    capabilities: [
      {
        title: "拍摄到打印闭环",
        description: "拍摄、AI 生成、300dpi 排版合成与静默打印串成一条流程。",
      },
      {
        title: "线上下单线下出片",
        description: "小程序订单通过 WebSocket 推送到设备，实现线上下单、线下扫码即打印。",
      },
      {
        title: "安全的设备桥接",
        description: "preload + contextBridge 暴露白名单 API，渲染进程不直接访问 Node 能力。",
      },
    ],
    deepDive: [
      {
        title: "订单去重",
        content:
          "设备领单加锁，本地按订单号去重，断线重连后补拉未处理订单，避免同一订单重复打印。",
      },
      {
        title: "打印队列",
        content:
          "打印任务进入本地队列，失败后重试，保证线下设备在网络波动时仍能完成出片。",
      },
    ],
  }),
];

export function getAllProjectSlugs() {
  return projectsDetail.map((project) => project.slug);
}

export function getProjectDetail(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  return projectsDetail.find(
    (project) => project.slug === normalized || project.aliases?.includes(normalized),
  ) || null;
}

export function getAdjacentProjects(slug) {
  const currentIndex = projectsDetail.findIndex(
    (project) => project.slug === slug || project.aliases?.includes(slug),
  );
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0
    ? projectsDetail[currentIndex - 1]
    : projectsDetail.at(-1);
  const next = currentIndex < projectsDetail.length - 1
    ? projectsDetail[currentIndex + 1]
    : projectsDetail[0];

  return { prev, next };
}
