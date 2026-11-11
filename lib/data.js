// ============================================================
// 主要个人内容（基于简历整理）。
// 详细案例见 lib/projects-data.js，技能明细见 lib/skillsData.js，
// 页面文案与 SEO 见 lib/cms-shared.js。
// ============================================================

export const siteConfig = {
  name: "肖泽韬",
  title: "XIAO ZETAO",
  englishName: "toddxiao",
  role: "前端工程师",
  tagline:
    "腾讯 IEG 前端开发工程师，负责《无畏契约》手游电竞赛事多端前端；关注 AI Native 研发与线下 AIGC 互动。",
  bio: [
    "我是肖泽韬，哈尔滨工业大学（深圳）计算机本科，前端开发 4 年。目前在腾讯 IEG 负责《无畏契约》手游电竞赛事的多端前端，覆盖端内（Hippy + Vue）、小程序（Uni-app）、H5 与 PC 办赛端。",
    "此前在元象做线下 AIGC 与 VR 场景，参与过「咔擦相机」AIGC 拍摄打印体系（小程序 + Electron 客户端 + PC 管理端）。现在也在用 AI Native 的方式推进 VES 办赛平台的重构，并探索 AI 工具链在研发流程中的落地。",
  ],
  location: "深圳",
  email: "918082959@qq.com",
  qq: "918082959", // 由 QQ 邮箱推断，如有误请修改
  wechat: "seek_wakeup",
  phone: "13652435320",
  avatar: "/images/avatar.jpg",
  github: "",
  linkedin: "",
  copyright: `© ${new Date().getFullYear()} 肖泽韬. All rights reserved.`,
};

export const navigation = [
  { label: "首页", href: "/", number: "01", icon: "home" },
  { label: "关于", href: "/about", number: "02", icon: "person" },
  { label: "项目", href: "/projects", number: "03", icon: "work" },
  { label: "其他", href: "/blog", number: "04", icon: "person" },
  { label: "联系", href: "/contact", number: "05", icon: "mail" },
];

export const experience = [
  {
    year: "2025.07 - 至今",
    company: "腾讯 IEG",
    role: "前端开发工程师",
    location: "深圳",
    description:
      "主导《无畏契约》手游电竞赛事多端前端（端内 Hippy + Vue、小程序 Uni-app、H5 与 PC 办赛端），赛事期间 DAU 达百万级；推进 VES 办赛平台 AI Native 重构。",
  },
  {
    year: "2022.07 - 2025.07",
    company: "元象唯思",
    role: "前端开发工程师",
    location: "深圳",
    description:
      "线下 AIGC 互动：咔擦相机（小程序 + Electron 客户端 + PC 管理端）；公司首个 VR 线下门店从 0 到 1；移动端互动项目（数字长安、XLand、虎牙撩撩）项目负责人。",
  },
];

export const education = [
  {
    year: "2018.09 - 2022.06",
    institution: "哈尔滨工业大学（深圳）",
    degree: "本科 · 计算机科学与技术",
    location: "深圳",
    description: "985 · 双一流",
  },
  {
    year: "2019.11 - 2020.01",
    institution: "高丽大学",
    degree: "海外交流",
    location: "首尔",
    description: "QS 前 100",
  },
];

export const projects = [
  {
    id: "01",
    slug: "wuqian-esports",
    title: "无畏契约赛事系统",
    subtitle: "手游电竞赛事多端前端",
    category: "mobile",
    categoryLabel: "多端电竞赛事",
    status: "当前在研",
    description:
      "端内 Hippy + Vue、小程序 Uni-app、H5 与 PC 办赛端组成的多端体系，承载周赛、海选赛、晋级赛与全国大赛的多阶段赛制。",
    tech: ["Hippy", "Vue 3", "Uni-app", "Aegis"],
    href: "/projects/wuqian-esports",
    github: "",
    image: "/images/wuqian-esports.jpg",
  },
  {
    id: "02",
    slug: "ves-arena",
    title: "VES 办赛平台",
    subtitle: "电竞赛事 PC 管理端 · AI Native 重构",
    category: "tooling",
    categoryLabel: "电竞办赛后台",
    status: "进行中",
    description:
      "Vue 3 + TDesign 的办赛管理端，同时支撑瓦手专用版与通用版；正在用 Spec 抽取与 AI 原型做 AI Native 重构。",
    tech: ["Vue 3", "TypeScript", "TDesign", "Vue Query"],
    href: "/projects/ves-arena",
    github: "",
    image: "/images/ves-arena-tga.jpg",
  },
  {
    id: "03",
    slug: "growthwork",
    title: "GrowthWork",
    subtitle: "交互稿协同评审平台",
    category: "tooling",
    categoryLabel: "AI Native 工具",
    status: "工具开发中",
    description:
      "面向前端原型的实时批注平台，通过跨文档锚定引擎把评论精准绑定到 DOM 元素，并配套规范、设计稿生成、评审等 AI Skill。",
    tech: ["Vue 3", "Node.js", "Tencent COS"],
    href: "/projects/growthwork",
    github: "",
    image: "/images/growthwork.png",
  },
  {
    id: "04",
    slug: "xverse-upload-tool",
    title: "Xverse Upload Tool",
    subtitle: "Figma 设计稿上传插件",
    category: "figma",
    categoryLabel: "FIGMA 插件",
    status: "已上线",
    description:
      "Figma 插件，选中节点后设置倍数与格式即可一键上传；登录鉴权与低代码平台打通的能力被抽离为独立插件使用。",
    tech: ["Figma Plugin API", "登录鉴权", "低代码平台对接"],
    href: "/projects/xverse-upload-tool",
    github: "",
    image: "/images/xverse-upload-tool.png",
  },
  {
    id: "05",
    slug: "kacha-camera",
    title: "咔擦相机",
    subtitle: "AIGC 主题照拍摄打印体系",
    category: "aigc",
    categoryLabel: "AIGC × Electron",
    status: "已归档",
    description:
      "把用户人像经 AI 生成为指定场景主题照并现场打印：小程序下单、Electron 设备客户端出片打印、PC 端统一管理设备与订单。",
    tech: ["Taro", "React", "Electron", "Ant Design"],
    href: "/projects/kacha-camera",
    github: "",
    image: "/images/kacha-camera.jpg",
  },
];

export const skills = [
  { name: "FRONTEND & CROSS-PLATFORM", level: 4 },
  { name: "ELECTRON & DESKTOP", level: 3 },
  { name: "AI NATIVE ENGINEERING", level: 3 },
  { name: "NODE.JS & TOOLING", level: 3 },
];

export const techStack = [
  { name: "Vue 3", icon: "hub" },
  { name: "React", icon: "data_object" },
  { name: "TypeScript", icon: "terminal" },
  { name: "Hippy", icon: "view_in_ar" },
  { name: "Uni-app / Taro", icon: "phone_iphone" },
  { name: "Electron", icon: "desktop_windows" },
  { name: "Node.js", icon: "dns" },
  { name: "Vite", icon: "bolt" },
  { name: "TDesign / Ant Design", icon: "palette" },
  { name: "MCP / AI Agent", icon: "smart_toy" },
];

// 荣誉（展示在个人简介页与首页）。
export const honors = [
  {
    title: "腾讯卓越研发奖",
    detail: "腾讯 IEG 内部奖项",
    link: "",
  },
  {
    title: "司内王者荣耀比赛冠军",
    detail: "公司内部赛事冠军",
    link: "",
  },
  {
    title: "腾讯开源直播嘉宾",
    detail: "参与公司开源直播分享",
    link: "https://mp.weixin.qq.com/s/uUDW__5OktfrxEavWUj6zA",
  },
];

// 个人链接（展示在个人简介页）。
export const profileLinks = [
  { label: "无畏契约赛事系统（PC 办赛端）", href: "https://ves.qq.com/console/index.html#/universe/login" },
  { label: "Xverse Upload Tool · Figma 插件", href: "https://www.figma.com/community/plugin/1243765449139402836/xverse-upload-tool" },
  { label: "GrowthWork 交互稿评审平台", href: "https://growthwork.woa.com/" },
  { label: "开源直播分享文章", href: "https://mp.weixin.qq.com/s/uUDW__5OktfrxEavWUj6zA" },
];

// Blog posts live in content/blog/*.md.

export function getProjectThumbnail(project) {
  if (project?.image) {
    return project.image;
  }
  return null;
}
