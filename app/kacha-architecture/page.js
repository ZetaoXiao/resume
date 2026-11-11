"use client";

import { useEffect, useRef, useState } from "react";
import {
  architectureChart,
  onsitePrintChart,
  oToOChart,
  orderStateNotes,
} from "@/lib/kacha-diagrams";

// 把一段 mermaid 源码渲染成 SVG。mermaid 体积较大，只在本页按需 import。
function MermaidDiagram({ chart, id }) {
  const ref = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: { primaryColor: "#7e44ff", lineColor: "#b57bff", fontFamily: "inherit" },
        });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) return <pre className="text-red-400 text-sm whitespace-pre-wrap">{error}</pre>;
  return <div ref={ref} className="overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full" />;
}

function Section({ no, title, desc, children }) {
  return (
    <section className="mb-16">
      <div className="mb-4">
        <p className="text-[#b57bff] text-sm font-mono">{no}</p>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {desc && <p className="text-gray-400 mt-2 leading-relaxed">{desc}</p>}
      </div>
      <div className="rounded-xl border border-white/10 bg-black/40 p-6">{children}</div>
    </section>
  );
}

export default function KachaArchitecturePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <header className="mb-12">
        <p className="text-[#b57bff] font-mono text-sm">PROJECT · 咔擦相机</p>
        <h1 className="text-4xl font-black text-white mt-2">技术架构与核心链路</h1>
        <p className="text-gray-400 mt-3 max-w-3xl leading-relaxed">
          线下 AIGC 主题照打印机：用户拍照或线上下单，AI 生成主题图，设备端完成 300dpi 合成并静默打印。
          下面三张图分别是整体架构、线下现拍现打、小程序下单到线下打印。
        </p>
      </header>

      <Section
        no="01 · 整体架构"
        title="三端 + 服务端"
        desc="小程序（C 端）、Electron 设备端、PC 管理端（B 端）共用一套业务 API；设备通过 WebSocket 长连接接收订单和远程指令。图片不经过业务服务器，直传对象存储。"
      >
        <MermaidDiagram chart={architectureChart} id="kacha-architecture" />
      </Section>

      <Section
        no="02 · 核心流程 A"
        title="线下现拍现打"
        desc="设备端闭环：选主题、拍照、AI 生成、收款后合成，最后调用打印机。渲染进程只发意图，打印由主进程执行。"
      >
        <MermaidDiagram chart={onsitePrintChart} id="kacha-onsite" />
      </Section>

      <Section
        no="03 · 核心流程 B"
        title="小程序下单 → 线下打印（O2O）"
        desc="线上用户下单后，到店扫码或输入取件码，订单被绑定到具体设备，设备拉取无水印原图完成打印。"
      >
        <MermaidDiagram chart={oToOChart} id="kacha-o2o" />
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-white font-semibold mb-2">防重复打印</p>
          <ul className="list-disc pl-5 text-gray-400 space-y-1">
            {orderStateNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
