import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import MobileMenu from '@/components/MobileMenu';
import SectionReveal from '@/components/SectionReveal';
import Marquee from '@/components/Marquee';
import { honors } from '@/lib/data';
import { getPublishedCmsData } from '@/lib/cms-server';


export default async function Home({ cmsData } = {}) {
  const cms = cmsData || await getPublishedCmsData();
  const { siteConfig, experience, education, projects } = cms;
  const pageContent = cms.pageContent?.home || {};

  return (
    <>
      <Sidebar />
      <main className="md:ml-[180px] min-h-screen flex flex-col">
        <TopBar />
        <MobileMenu />

        <HeroSection siteConfig={siteConfig} projects={projects} />

        {/* MARQUEE SECTION */}
        <Marquee items={pageContent.marquee} />

        {/* LOWER GRID SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr_1fr] flex-grow bg-border-primary gap-[1px]">
          {/* Experience Column */}
          <div className="bg-surface h-full flex flex-col">
            <SectionReveal>
              <div className="p-5 md:p-[28px] lg:p-8 flex flex-col h-full">
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.04em] leading-[1.2] text-text-muted uppercase mb-8">
                  {pageContent.experienceLabel || '/ 工作经历'}
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-6 content-start">
                  {[
                    ...experience.map((item) => ({ ...item, kind: 'WORK', name: item.company, sub: item.role })),
                    ...education.map((item) => ({ ...item, kind: 'EDU', name: item.institution, sub: item.degree })),
                  ]
                    .sort((a, b) => Number(b.year.match(/\d{4}/)?.[0] || 0) - Number(a.year.match(/\d{4}/)?.[0] || 0))
                    .map((exp, i) => (
                      <div key={`${exp.kind}-${i}`} className="grid grid-cols-[80px_1fr] py-4 border-b border-border-muted group hover:bg-surface-hover transition-colors">
                        <span className={`font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.04em] leading-[1.2] ${i === 0 ? 'text-primary-fixed' : 'text-text-muted group-hover:text-primary-fixed transition-colors'}`}>
                          {exp.year}
                        </span>
                        <div>
                          <div className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[0.02em] text-primary leading-[1] mb-2">
                            [{exp.kind}] {exp.name}
                          </div>
                          <div className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.04em] leading-[1.2] text-text-muted mb-2">
                            {exp.sub}
                          </div>
                          <div className="font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-[0.04em] leading-[1.2] text-text-dim">
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="pt-8 mt-auto">
                  <Link 
                    href="/about" 
                    className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[0.02em] text-primary-fixed hover:text-primary transition-colors"
                  >
                    {pageContent.timelineCta || '[ FULL TIMELINE ]'}
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Projects Grid */}
          <div className="bg-border-primary h-full flex flex-col gap-[1px]">
            <div className="bg-surface p-5 pb-4 md:p-[28px] lg:p-8 md:pb-4">
              <div className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.04em] leading-[1.2] text-text-muted uppercase">
                {pageContent.projectsLabel || '/ 项目'}
              </div>
            </div>
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-[1px] flex-grow bg-border-primary">
                {projects.slice(0, 4).map((project, i) => (
                  <div key={i} className="bg-surface relative group overflow-hidden flex items-end p-4 min-h-[120px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#8b5cf6] to-[#b57bff] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-3 left-4 z-10 font-[family-name:var(--font-display)] text-[28px] font-bold text-white leading-none">{project.id}</div>
                    <div className="absolute inset-0 border border-transparent group-hover:border-primary-fixed transition-colors pointer-events-none z-10"></div>
                    <Link href={project.href} className="relative z-20 w-full h-full flex items-end">
                      <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[0.02em] text-primary group-hover:text-primary-fixed transition-colors">
                        {project.title}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <div className="bg-surface p-4 text-center mt-auto">
              <Link 
                href="/projects" 
                className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[0.02em] text-primary-fixed hover:text-primary transition-colors"
              >
                {pageContent.projectsCta || '[ VIEW ALL PROJECTS ]'}
              </Link>
            </div>
          </div>

          {/* Blog Column */}
          <div className="bg-surface h-full flex flex-col">
            <SectionReveal delay={0.2}>
              <div className="p-5 md:p-[28px] lg:p-8 flex flex-col h-full">
                <div className="font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.04em] leading-[1.2] text-text-muted uppercase mb-8">
                  / 荣誉
                </div>
                <div className="flex-grow flex flex-col gap-6">
                  {honors.map((item) => (
                    <Link key={item.title} href="/blog" className="group block">
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-primary-fixed mb-2">{item.detail}</div>
                      <div className="font-[family-name:var(--font-mono)] text-[14px] text-primary group-hover:text-primary-fixed transition-colors leading-[1.4]">{item.title}</div>
                    </Link>
                  ))}
                </div>
                <div className="pt-8 mt-auto">
                  <Link 
                    href="/blog" 
                    className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-[0.02em] text-primary-fixed hover:text-primary transition-colors"
                  >
                    [ 查看更多 ]
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}
