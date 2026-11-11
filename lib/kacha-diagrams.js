// 咔擦相机技术方案中的三张图：整体架构（第 2 节）、线下现拍现打（3.1）、小程序下单到线下打印（3.2）。
// 图源来自《咔擦相机-技术方案与Electron面试准备》，语法已适配 mermaid 11。

export const architectureChart = `flowchart LR
  subgraph C端
    MP[小程序<br/>Taro+React]
  end
  subgraph 设备端["线下设备（Mac mini + 摄像头 + 照片打印机）"]
    EC[Electron 客户端]
    CAM[USB 摄像头]
    PRN[照片打印机<br/>CUPS]
    EC --- CAM
    EC --- PRN
  end
  subgraph B端
    ADM[PC 管理端<br/>React+AntD]
  end
  subgraph 服务端
    API[业务 API<br/>订单/设备/模板/支付]
    WS[WebSocket 网关<br/>设备长连接]
    AIQ[AI 任务队列]
    GPU[AIGC 推理服务<br/>SD + 换脸/人像保持]
    OSS[(对象存储 COS/OSS)]
    DB[(MySQL / Redis)]
  end
  MP -- HTTPS --> API
  ADM -- HTTPS --> API
  EC -- HTTPS --> API
  EC <-->|长连接: 心跳/订单推送/远程指令| WS
  API --> AIQ --> GPU
  GPU --> OSS
  MP -- 直传 --> OSS
  EC -- 直传 --> OSS
  API --- DB
  WS --- DB`;

export const onsitePrintChart = `sequenceDiagram
  participant U as 现场用户
  participant R as 渲染进程(React)
  participant M as 主进程(Node)
  participant S as 服务端
  participant P as 打印机
  U->>R: 选择主题
  R->>R: getUserMedia 预览 / 倒计时拍照
  R->>S: 直传原图 → 创建 AI 任务
  S-->>R: taskId
  R->>R: 展示收款码（小程序码 / 聚合支付）
  S-->>M: WS 推送: 支付成功 + 生成完成
  M-->>R: IPC 通知
  R->>R: Canvas 300dpi 合成（主题图 + 相框 + 二维码）
  R->>M: ipc invoke('print:job', 文件路径)
  M->>P: lp / webContents.print 静默打印
  M->>S: 上报打印结果、耗材计数-1`;

export const oToOChart = `sequenceDiagram
  participant U as 线上用户
  participant MP as 小程序
  participant S as 服务端
  participant EC as Electron 客户端
  U->>MP: 上传照片 + 选主题
  MP->>S: 创建 AI 任务，轮询结果
  MP->>U: 预览（带水印）→ 支付
  S-->>MP: 订单号 + 取件码
  U->>EC: 到店扫设备二维码 / 输入取件码
  EC->>S: 核销取件码（或 小程序扫码后 S 绑定 order→deviceId）
  S-->>EC: WS 推送打印任务（无水印原图 URL）
  EC->>EC: 下载 → 合成 → 静默打印
  EC->>S: 回传打印状态，S 订阅消息通知用户`;

export const orderStateNotes = [
  '订单状态机：PAID → ASSIGNED(deviceId) → PRINTING → PRINTED / FAILED',
  '设备端打印前以 orderId 做本地幂等',
  '服务端核销接口用乐观锁 / Redis 锁，保证一个订单只被一台设备领取',
];
