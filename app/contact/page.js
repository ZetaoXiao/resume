"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MobileMenu from "@/components/MobileMenu";
import SectionReveal from "@/components/SectionReveal";
import { useCms } from "@/components/CmsProvider";

const PENDING_TEXT = "待补充";

function ContactItem({ label, value, href }) {
  const hasValue = Boolean(value);
  const content = hasValue ? (
    <span className="font-[family-name:var(--font-mono)] text-[17px] text-primary">{value}</span>
  ) : (
    <span className="font-[family-name:var(--font-mono)] text-[17px] text-text-dim">{PENDING_TEXT}</span>
  );

  return (
    <div className="border-b border-border-primary py-5 flex flex-col gap-1">
      <h3 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-primary-fixed">
        {label}
      </h3>
      {hasValue && href ? (
        <a href={href} className="hover:text-primary-fixed transition-colors">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

export default function Contact() {
  const { siteConfig, pageContent } = useCms();
  const copy = pageContent?.contact || {};

  return (
    <>
      <Sidebar />
      <main className="md:ml-[180px] min-h-screen flex flex-col relative z-10">
        <TopBar />
        <MobileMenu />

        <div className="flex-1 p-[28px] lg:p-12">
          <SectionReveal>
            <div className="mb-12 border-b border-border-primary pb-4">
              <h1 className="font-[family-name:var(--font-display)] text-[32px] font-bold uppercase text-primary tracking-tight">
                {copy.eyebrow || "/ 联系我"}
              </h1>
              <p className="font-[family-name:var(--font-mono)] text-[14px] text-text-muted max-w-2xl mt-2">
                {copy.introduction || "有合作想法、问题或者想交流前端工程与 AI 研发，可以通过以下方式直接联系我。"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl">
            <SectionReveal delay={0.1}>
              <h2 className="font-[family-name:var(--font-display)] text-[64px] md:text-[80px] font-extrabold leading-[0.85] tracking-[-0.04em] text-outline uppercase">
                {(copy.displayTitle || "欢迎\n交流").split("\n").map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="border-t border-border-primary">
                <ContactItem
                  label="EMAIL"
                  value={siteConfig.email}
                  href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined}
                />
                <ContactItem label="QQ" value={siteConfig.qq} />
                <ContactItem label="WECHAT" value={siteConfig.wechat} />
                <ContactItem
                  label="PHONE"
                  value={siteConfig.phone}
                  href={siteConfig.phone ? `tel:${siteConfig.phone}` : undefined}
                />
              </div>
            </SectionReveal>
          </div>
        </div>

        <footer className="mt-auto border-t border-border-primary p-[28px] flex justify-between items-center text-text-dim font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider">
          <div>{siteConfig.copyright}</div>
        </footer>
      </main>
    </>
  );
}
