export const pageContentDefaults = {
  seo: {
    siteTitle: "肖泽韬 | Frontend Engineer",
    siteDescription: "肖泽韬的个人作品集：腾讯 IEG 前端开发，覆盖 Vue / React、Hippy 与 Uni-app 跨端、Electron 桌面端与 AI Native 研发实践。",
    keywords: ["前端工程师", "Vue 3", "React", "Hippy", "Uni-app", "Electron", "AI Native", "肖泽韬"],
    pages: {
      about: {
        title: "About | 肖泽韬",
        description: "肖泽韬的工作经历、技术栈与 AI 研发实践。",
      },
      projects: {
        title: "Projects | 肖泽韬",
        description: "无畏契约相关赛事系统、VES 办赛平台、咔擦相机与 AI 研发工作流项目。",
      },
      blog: {
        title: "Blog | 肖泽韬",
        description: "前端工程与技术实践笔记。",
      },
      contact: {
        title: "Contact | 肖泽韬",
        description: "欢迎交流前端工程、跨端与 AI 研发相关话题。",
      },
    },
  },
  home: {
    marquee: [
      "VUE / REACT / TYPESCRIPT",
      "HIPPY / UNI-APP / TARO",
      "ELECTRON 桌面端",
      "AI NATIVE 研发",
      "电竞赛事产品交付",
    ],
    experienceLabel: "/ 工作经历",
    projectsLabel: "/ 项目",
    blogLabel: "/ 博客",
    timelineCta: "[ 查看完整时间线 ]",
    projectsCta: "[ 查看全部项目 ]",
    blogCta: "[ 阅读全部文章 ]",
  },
  about: {
    eyebrow: "// 关于我",
    heading: "我是肖泽韬，深圳的前端工程师。",
    currentFocusLabel: "当前关注",
    currentFocus: "腾讯 IEG 赛事管理与多端前端开发，关注 AI Native 研发工作流在日常交付中的落地。",
    skillsLabel: "// 能力与技术栈",
    contactLabel: "[ 联系我 ]",
  },
  projects: {
    telemetryLabel: "项目概览",
    title: "/ 项目",
    introduction: "精选的产品、系统、实验与经验总结。",
    searchPlaceholder: "搜索项目...",
  },
  blog: {
    title: "博客 / 笔记",
    emptyState: "暂无已发布的文章。",
  },
  contact: {
    eyebrow: "/ 联系我",
    introduction: "有合作想法、问题或者想交流前端工程与 AI 研发，可以通过以下方式直接联系我。",
    displayTitle: "欢迎\n交流",
  },
};

export const themeDefaults = {
  accent: "#b57bff",
  accentDim: "#8b5cf6",
  background: "#131313",
  surface: "#090909",
  surfaceElevated: "#201f1f",
  primaryText: "#ffffff",
  mutedText: "#9a9a9a",
  dimText: "#646464",
  border: "#343434",
  danger: "#ff1a14",
};

export const themeToCssVariables = (theme = {}) => ({
  "--color-primary-fixed": theme.accent,
  "--color-primary-container": theme.accent,
  "--color-primary-fixed-dim": theme.accentDim,
  "--color-surface-tint": theme.accentDim,
  "--color-background": theme.background,
  "--color-surface-dim": theme.background,
  "--color-surface": theme.surface,
  "--color-surface-container": theme.surfaceElevated,
  "--color-primary": theme.primaryText,
  "--color-text-muted": theme.mutedText,
  "--color-text-dim": theme.dimText,
  "--color-border-primary": theme.border,
  "--color-danger": theme.danger,
});

export const CMS_CLIENT_KEYS = [
  "siteConfig",
  "navigation",
  "experience",
  "education",
  "projects",
  "skills",
  "skillCategories",
  "techStack",
  "pageContent",
  "theme",
];
