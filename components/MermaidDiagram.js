"use client";

import { useEffect, useRef, useState } from "react";

// 把一段 mermaid 源码渲染成 SVG。mermaid 体积较大，只在需要时动态 import。
// 渲染完成后，点击图形会通过 onExpand 把 SVG 字符串交给父组件，由父组件以全屏灯箱展示。
export default function MermaidDiagram({ chart, id, onExpand }) {
  const ref = useRef(null);
  const [svg, setSvg] = useState("");
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
        const result = await mermaid.render(id, chart);
        if (!cancelled) setSvg(result.svg);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  useEffect(() => {
    if (ref.current && svg) ref.current.innerHTML = svg;
  }, [svg]);

  if (error) return <pre className="text-red-400 text-sm whitespace-pre-wrap">{error}</pre>;

  return (
    <div
      className="relative group"
      onClick={() => onExpand?.(svg)}
    >
      <div
        ref={ref}
        className="overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full"
      />
      {onExpand && svg && (
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 border border-border-primary text-[10px] text-primary-fixed font-mono flex items-center gap-1 cursor-pointer">
          <span className="material-symbols-outlined text-[12px]">zoom_in</span>
          点击放大
        </div>
      )}
    </div>
  );
}
