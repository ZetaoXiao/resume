// Detailed skills shown on the About page.
// Provenance entries point to concrete work from the resume (company / project / education).

export const skillCategories = [
  { id: "all", label: "全部" },
  { id: "frontend", label: "前端与体验" },
  { id: "desktop", label: "跨端与桌面" },
  { id: "ai", label: "AI Native" },
];

export const skillsWithProvenance = [
  {
    id: "vue-react",
    name: "Vue 3 / React & TypeScript",
    shortName: "Vue 3 / React",
    category: "frontend",
    categoryLabel: "Frontend & UX",
    tag: "PRIMARY STACK",
    tagType: "primary",
    icon: "data_object",
    summary:
      "使用 Vue 3 与 React 开发复杂业务界面，配合 TypeScript 类型化组件与状态管理。",
    provenance: [
      {
        entity: "腾讯 IEG",
        role: "前端开发工程师",
        type: "work",
        badge: "WORK",
        summary:
          "Vue 3 + TypeScript 中后台与赛事管理前端开发，TDesign / Element Plus 组件体系落地。",
        link: "#experience",
      },
      {
        entity: "元象唯思",
        role: "前端开发工程师",
        type: "work",
        badge: "WORK",
        summary:
          "React / Vue 技术栈下的业务前端开发与组件化沉淀。",
        link: "#experience",
      },
    ],
    ecosystem: ["Vue 3", "React", "TypeScript", "Vite", "Pinia", "Element Plus", "TDesign"],
  },
  {
    id: "cross-platform",
    name: "跨端框架 (Hippy / Uni-app / Taro)",
    shortName: "Hippy / Uni-app",
    category: "frontend",
    categoryLabel: "Frontend & UX",
    tag: "MOBILE & CROSS-END",
    tagType: "info",
    icon: "devices",
    summary:
      "一套代码覆盖原生渲染的移动端与小程序端，涵盖渲染机制、原生桥接与性能取舍。",
    provenance: [
      {
        entity: "腾讯 IEG · 王者荣耀赛事",
        role: "Hippy 业务开发",
        type: "project",
        badge: "PROJECT",
        summary:
          "赛事功能在 Hippy 容器中实现，包含多阶段赛制、排行榜与列表渲染的 iOS / Android 适配。",
        link: "/projects/wuqian-esports",
      },
      {
        entity: "VES 办赛平台",
        role: "Uni-app / Taro 多端开发",
        type: "project",
        badge: "PROJECT",
        summary:
          "同一套业务代码覆盖小程序与 H5 等多端，统一封装请求、路由与埋点能力。",
        link: "/projects/ves-arena",
      },
    ],
    ecosystem: ["Hippy", "Uni-app", "Taro", "Native Bridge", "Vite", "小程序"],
  },
  {
    id: "electron",
    name: "Electron 桌面端开发",
    shortName: "Electron",
    category: "desktop",
    categoryLabel: "Cross-platform & Desktop",
    tag: "DESKTOP",
    tagType: "primary",
    icon: "desktop_windows",
    summary:
      "基于 Electron 开发桌面相机应用，通过 IPC 将 Web 界面与 Node 侧系统能力连接起来。",
    provenance: [
      {
        entity: "咔擦相机",
        role: "Electron 桌面端开发",
        type: "project",
        badge: "PROJECT",
        summary:
          "基于 Electron 的桌面相机项目，前端 Web 技术栈承载界面，主进程负责系统能力与窗口管理。",
        link: "/projects/kacha-camera",
      },
    ],
    ecosystem: ["Electron", "IPC", "Node.js", "Vue", "TypeScript"],
  },
  {
    id: "ai-native",
    name: "AI Native 研发工作流",
    shortName: "AI Native",
    category: "ai",
    categoryLabel: "AI Native",
    tag: "AI WORKFLOW",
    tagType: "primary",
    icon: "smart_toy",
    summary:
      "在日常前端交付中使用 AI Agent 与 MCP 接入的工具，覆盖需求查询、代码评审与变更验证。",
    provenance: [
      {
        entity: "GrowthWork",
        role: "AI 辅助研发实践",
        type: "project",
        badge: "PROJECT",
        summary:
          "通过 MCP 接入需求与代码系统，让 AI 辅助完成需求信息读取、代码检索与变更自检。",
        link: "/projects/growthwork",
      },
      {
        entity: "腾讯 IEG",
        role: "前端开发工程师",
        type: "work",
        badge: "WORK",
        summary:
          "在赛事模块开发中沉淀 AI 辅助的字段级验收与回归对比流程。",
        link: "#experience",
      },
    ],
    ecosystem: ["MCP", "AI Agent", "Code Review", "Automation"],
  },
];
