'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import MobileMenu from '@/components/MobileMenu';
import SectionReveal from '@/components/SectionReveal';
import TiltCard from '@/components/TiltCard';
import MermaidDiagram from '@/components/MermaidDiagram';
import { useCms } from '@/components/CmsProvider';

export default function ProjectShowcaseView({ project, adjacent }) {
  const { siteConfig } = useCms();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxSvg, setLightboxSvg] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
        setLightboxSvg(null);
      }
    };
    if (lightboxImage || lightboxSvg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage, lightboxSvg]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const hasDiagrams = (project.architectureDiagrams?.length || 0) > 0;
  const tabs = [
    { id: 'overview', label: '// 01. 概述与背景' },
    ...(hasDiagrams ? [{ id: 'diagrams', label: '// 02. 技术架构' }] : []),
    { id: 'architecture', label: `// ${hasDiagrams ? '03' : '02'}. 项目演示` },
    { id: 'capabilities', label: `// ${hasDiagrams ? '04' : '03'}. 核心能力` },
    { id: 'technical', label: `// ${hasDiagrams ? '05' : '04'}. 技术细节` },
  ];

  const heroImage = project.primaryImage || project.screenshots?.[0]?.src;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface-dim grid-background relative font-[family-name:var(--font-mono)] text-primary">
      <div className="noise-overlay"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col relative w-full md:ml-[180px]">
        <TopBar />
        <MobileMenu />

        <main className="flex-1 p-[20px] md:p-12 lg:p-16 pt-28 md:pt-12 flex flex-col max-w-[1300px] w-full mx-auto">
          
          {/* BREADCRUMB / TOP NAVIGATION WITH LIVE TELEMETRY BLIP */}
          <SectionReveal delay={0.05}>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-primary mb-8 text-[11px] uppercase tracking-wider text-text-muted">
              <div className="flex items-center gap-2">
                <Link 
                  href="/projects" 
                  className="text-primary-fixed hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  / PROJECTS
                </Link>
                <span className="text-border-primary">/</span>
                <span className="text-primary font-bold">{project.title}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-primary-fixed bg-primary-fixed/10 px-2.5 py-1 border border-primary-fixed/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed"></span>
                </span>
                <span>NODE {project.id} {'//'} ACTIVE</span>
              </div>
            </div>
          </SectionReveal>

          {/* HERO HEADER WITH PREVIEW BANNER */}
          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 items-start mb-10">
              {/* Left Column: Text Metadata */}
              <div>
                <div className="text-[11px] font-mono text-primary-fixed uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>{'//'}</span>
                  <span>{project.category}</span>
                </div>
                <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-primary tracking-tight leading-[0.95] mb-4">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-secondary-fixed font-semibold max-w-4xl leading-snug mb-4">
                  {project.subtitle}
                </p>
                <p className="text-body-md text-text-muted max-w-3xl leading-relaxed mb-6 font-mono text-[13px]">
                  {project.headline}
                </p>

                {/* ACTION BUTTONS & METADATA BAR */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-primary-fixed text-surface font-bold text-[12px] tracking-wider uppercase hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(204,242,0,0.25)]"
                    >
                      <span className="material-symbols-outlined text-[16px]">code</span>
                      [ GITHUB REPOSITORY ]
                    </motion.a>
                  )}
                  {project.liveDemo && (
                    <motion.a
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-surface-container border border-primary-fixed text-primary-fixed font-bold text-[12px] tracking-wider uppercase hover:bg-primary-fixed hover:text-surface transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      [ LIVE DEMO ]
                    </motion.a>
                  )}
                  <div className="text-[12px] text-text-dim flex items-center gap-3 font-mono">
                    <span>YEAR: <strong className="text-text-muted">{project.year || project.timeline || "2026"}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Frame with TiltCard Physics */}
              {heroImage && (
                <TiltCard className="border border-border-primary bg-surface-container-high overflow-hidden shadow-2xl hover:border-primary-fixed/80 transition-all">
                  <div 
                    onClick={() => setLightboxImage(heroImage)}
                    className="relative group cursor-pointer aspect-video md:aspect-[16/10] overflow-hidden"
                    title="Click to view full image"
                  >
                    <Image
                      src={heroImage}
                      alt={`${project.title} Preview`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-3 right-3 flex items-center pointer-events-none">
                      <span className="text-[11px] text-white flex items-center gap-1 bg-black/80 px-2 py-0.5 border border-border-primary">
                        <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                        EXPAND
                      </span>
                    </div>
                  </div>
                </TiltCard>
              )}
            </div>
          </SectionReveal>

          {/* STATS TICKER GRID WITH TILTCARDS */}
          <SectionReveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {project.stats.map((stat, i) => (
                <TiltCard 
                  key={i} 
                  className="bg-surface/80 p-4 border border-border-primary hover:border-primary-fixed/60 shadow-md flex flex-col justify-between min-h-[95px] transition-colors"
                >
                  <span className="text-[10px] text-text-muted uppercase tracking-widest mb-1.5 font-mono">
                    {stat.label}
                  </span>
                  <span className="text-[13px] font-bold text-primary-fixed leading-tight font-mono">
                    {stat.value}
                  </span>
                </TiltCard>
              ))}
            </div>
          </SectionReveal>

          {/* TECHNOLOGIES CHIPS WITH MOTION */}
          <SectionReveal delay={0.18}>
            <div className="mb-10 p-5 bg-surface border border-border-primary flex flex-col md:flex-row md:items-center gap-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted shrink-0 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed">terminal</span>
                TECHNOLOGIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <motion.span 
                    key={i}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-surface-container-high border border-border-primary text-text-muted text-[11px] font-mono hover:border-primary-fixed hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* NAVIGATION TABS WITH GLIDING SPRING INDICATOR */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-surface border border-border-primary mb-8 overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-4 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors shrink-0"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-showcase-tab"
                        className="absolute inset-0 bg-primary-fixed shadow-[0_0_12px_rgba(204,242,0,0.25)]"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className={`relative z-10 ${
                      isActive ? 'text-surface font-extrabold' : 'text-text-muted hover:text-primary'
                    }`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </SectionReveal>

          {/* TAB CONTENT PANELS WITH ANIMATE PRESENCE */}
          <div className="min-h-[450px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW & PROBLEM */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  {/* Executive Summary */}
                  <TiltCard className="p-6 md:p-8 bg-surface border border-border-primary shadow-lg">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider text-primary-fixed mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">subject</span>
                      EXECUTIVE SUMMARY
                    </h3>
                    <div className="text-[14px] leading-relaxed text-text-muted space-y-4 font-mono">
                      {project.overview.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </TiltCard>

                  {/* Problem vs Solution Split with TiltCards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* The Problem */}
                    <TiltCard className="p-6 bg-surface border border-red-500/30 relative overflow-hidden shadow-lg">
                      <div className="absolute top-0 right-0 w-2 h-full bg-red-500/60"></div>
                      <div className="text-[12px] font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        THE CORE PROBLEM
                      </div>
                      <p className="text-[13px] leading-relaxed text-text-muted font-mono">
                        {project.problemStatement.problem}
                      </p>
                    </TiltCard>

                    {/* The Solution */}
                    <TiltCard className="p-6 bg-surface border border-primary-fixed/30 relative overflow-hidden shadow-lg">
                      <div className="absolute top-0 right-0 w-2 h-full bg-primary-fixed"></div>
                      <div className="text-[12px] font-bold text-primary-fixed uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        THE ENGINEERED SOLUTION
                      </div>
                      <p className="text-[13px] leading-relaxed text-text-muted font-mono">
                        {project.problemStatement.solution}
                      </p>
                    </TiltCard>
                  </div>

                  {/* Key Takeaway Banner */}
                  <div className="p-5 bg-surface-container-high border-l-4 border-primary-fixed border-t border-r border-b border-border-primary">
                    <span className="text-[11px] font-bold text-primary-fixed uppercase tracking-wider block mb-1">
                      KEY TAKEAWAY:
                    </span>
                    <span className="text-[13px] text-primary font-mono italic">
                      &quot;{project.problemStatement.keyTakeaway}&quot;
                    </span>
                  </div>
                </motion.div>
              )}

              {/* TAB: 技术架构（mermaid 图，仅有架构图的项目展示） */}
              {activeTab === 'diagrams' && hasDiagrams && (
                <motion.div
                  key="diagrams"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  {project.architectureDiagrams.map((d, i) => (
                    <div key={d.title} className="p-6 md:p-8 bg-surface border border-border-primary shadow-lg">
                      <h3 className="text-[14px] font-bold uppercase tracking-wider text-primary-fixed mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">account_tree</span>
                        0{i + 1} · {d.title}
                      </h3>
                      <MermaidDiagram
                        chart={d.chart}
                        id={`${project.slug}-diagram-${i}`}
                        onExpand={(svg) => setLightboxSvg(svg)}
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB: 项目演示 */}
              {activeTab === 'architecture' && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  {/* Architecture Overview */}
                  <div className="p-6 md:p-8 bg-surface border border-border-primary shadow-lg">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider text-primary-fixed mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">account_tree</span>
                      项目演示
                    </h3>
                    <p className="text-[13px] text-text-muted leading-relaxed mb-6">
                      {project.demoDescription}
                    </p>

                    {/* 项目演示图：主图 + 其他展示图 */}
                    <div className="flex flex-col gap-6">
                      {[
                        ...(project.primaryImage ? [{ src: project.primaryImage, alt: project.title, caption: project.title }] : []),
                        ...(project.screenshots || []),
                      ].map((item, idx) => (
                        <TiltCard key={`${item.src}-${idx}`} className="border border-border-primary bg-black p-2 relative group shadow-2xl">
                          <div
                            onClick={() => setLightboxImage(item.src)}
                            className="relative w-full cursor-pointer overflow-hidden"
                          >
                            <img
                              src={item.src}
                              alt={item.alt || project.title}
                              className="w-full h-auto object-contain"
                            />
                            <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 border border-border-primary text-[10px] text-primary-fixed font-mono flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]">zoom_in</span>
                              点击放大
                            </div>
                          </div>
                          {item.caption && (
                            <div className="p-2 text-[11px] text-text-dim text-center font-mono">
                              {item.caption}
                            </div>
                          )}
                        </TiltCard>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB 3: KEY CAPABILITIES WITH TILTCARDS */}
              {activeTab === 'capabilities' && (
                <motion.div
                  key="capabilities"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {project.keyCapabilities.map((cap, i) => (
                    <TiltCard 
                      key={i} 
                      className="p-6 bg-surface border border-border-primary hover:border-primary-fixed/80 transition-all flex flex-col justify-between group shadow-lg"
                    >
                      <div>
                        <div className="text-[11px] font-mono text-primary-fixed mb-2 font-bold flex items-center justify-between">
                          <span>CAPABILITY 0{i + 1}</span>
                          <span className="material-symbols-outlined text-[16px] text-text-dim group-hover:text-primary-fixed transition-colors">
                            insights
                          </span>
                        </div>
                        <h4 className="text-[15px] font-bold text-primary mb-3 font-[family-name:var(--font-display)] uppercase group-hover:text-primary-fixed transition-colors">
                          {cap.title}
                        </h4>
                        <p className="text-[13px] text-text-muted leading-relaxed font-mono">
                          {cap.description}
                        </p>
                      </div>
                    </TiltCard>
                  ))}
                </motion.div>
              )}

              {/* TAB 4: TECHNICAL DEEP DIVE & SAFETY */}
              {activeTab === 'technical' && (
                <motion.div
                  key="technical"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  {project.technicalDeepDive.map((dive, i) => (
                    <TiltCard key={i} className="p-6 md:p-8 bg-surface border border-border-primary shadow-lg">
                      <div className="text-[11px] font-mono text-primary-fixed font-bold uppercase tracking-wider mb-2">
                        {'//'} ENGINEERING RATIONALE 0{i + 1}
                      </div>
                      <h3 className="text-[18px] font-bold text-primary font-[family-name:var(--font-display)] uppercase mb-4">
                        {dive.title}
                      </h3>
                      <p className="text-[13px] text-text-muted leading-relaxed font-mono">
                        {dive.content}
                      </p>
                    </TiltCard>
                  ))}
                </motion.div>
              )}

              {/* TAB 5: GALLERY */}
              {activeTab === 'gallery' && project.screenshots && project.screenshots.length > 0 && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  {/* Main Viewport */}
                  <TiltCard className="bg-surface border border-border-primary p-4 md:p-6 shadow-2xl">
                    <div 
                      onClick={() => setLightboxImage(project.screenshots[activeScreenshot].src)}
                      className="relative w-full aspect-video md:aspect-[16/9] border border-border-primary bg-black overflow-hidden mb-4 cursor-pointer group"
                      title="Click to view full size"
                    >
                      <Image
                        src={project.screenshots[activeScreenshot].src}
                        alt={project.screenshots[activeScreenshot].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                      <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 border border-border-primary text-[10px] text-primary-fixed font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                        EXPAND FULLSCREEN
                      </div>
                    </div>
                    <div className="p-3 bg-surface-container-high border border-border-primary flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <span className="text-[12px] text-text-muted font-mono">
                        {project.screenshots[activeScreenshot].caption}
                      </span>
                      <span className="text-[10px] text-primary-fixed font-mono shrink-0 uppercase">
                        [{activeScreenshot + 1} / {project.screenshots.length}]
                      </span>
                    </div>
                  </TiltCard>

                  {/* Thumbnails Strip */}
                  {project.screenshots.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {project.screenshots.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveScreenshot(idx)}
                          className={`relative aspect-video border transition-all overflow-hidden bg-black ${
                            activeScreenshot === idx 
                              ? 'border-primary-fixed ring-1 ring-primary-fixed shadow-[0_0_10px_rgba(204,242,0,0.3)]' 
                              : 'border-border-primary opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={s.src}
                            alt={s.alt}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 6: CLI & GETTING STARTED */}
              {activeTab === 'cli' && (
                <motion.div
                  key="cli"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  {/* CLI Reference */}
                  {project.cliOrApiReference && (
                    <div className="p-6 md:p-8 bg-surface border border-border-primary shadow-lg">
                      <h3 className="text-[14px] font-bold uppercase tracking-wider text-primary-fixed mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">terminal</span>
                        {project.cliOrApiReference.title}
                      </h3>
                      <div className="space-y-4">
                        {project.cliOrApiReference.items.map((item, idx) => (
                          <div key={idx} className="p-4 bg-[#0a0a0a] border border-border-primary flex flex-col gap-2 group hover:border-primary-fixed/60 transition-colors">
                            <div className="flex items-center justify-between gap-2">
                              <code className="text-[12px] md:text-[13px] text-primary-fixed font-mono break-all">
                                $ {item.command}
                              </code>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyToClipboard(item.command, idx)}
                                className="px-2.5 py-1 bg-surface-container border border-border-primary text-[10px] text-text-muted hover:border-primary-fixed hover:text-primary transition-colors shrink-0 uppercase font-mono"
                                title="Copy Command"
                              >
                                {copiedIndex === idx ? 'COPIED!' : 'COPY'}
                              </motion.button>
                            </div>
                            <span className="text-[11px] text-text-dim font-mono">
                              # {item.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Getting Started Guide */}
                  <div className="p-6 md:p-8 bg-surface border border-border-primary shadow-lg">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider text-primary-fixed mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                      QUICKSTART & LOCAL SETUP
                    </h3>

                    {/* Prerequisites */}
                    <div className="mb-6 p-4 bg-surface-container-high border border-border-primary">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2 font-mono">
                        PREREQUISITES:
                      </span>
                      <ul className="list-disc list-inside text-[12px] text-text-muted space-y-1 font-mono">
                        {project.gettingStarted.prerequisites.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Steps */}
                    <div className="space-y-6">
                      {project.gettingStarted.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                          <span className="text-[12px] font-bold text-primary font-mono uppercase">
                            {step.title}
                          </span>
                          <div className="p-4 bg-[#0a0a0a] border border-border-primary flex items-start justify-between gap-3 group hover:border-primary-fixed/60 transition-colors">
                            <pre className="text-[12px] text-text-muted font-mono leading-relaxed overflow-x-auto whitespace-pre">
                              {step.code}
                            </pre>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(step.code, `step-${idx}`)}
                              className="px-2.5 py-1 bg-surface-container border border-border-primary text-[10px] text-text-muted hover:border-primary-fixed hover:text-primary transition-colors shrink-0 uppercase font-mono"
                              title="Copy snippet"
                            >
                              {copiedIndex === `step-${idx}` ? 'COPIED!' : 'COPY'}
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ADJACENT PROJECT FOOTER NAVIGATION */}
          <SectionReveal delay={0.25}>
            <div className="mt-16 pt-8 border-t border-border-primary grid grid-cols-1 md:grid-cols-2 gap-4">
              {adjacent.prev && (
                <TiltCard className="border border-border-primary hover:border-primary-fixed/80 transition-all">
                  <Link
                    href={`/projects/${adjacent.prev.slug}`}
                    className="p-5 bg-surface/80 group flex flex-col justify-between h-full block"
                  >
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider group-hover:text-primary-fixed transition-colors">
                      ← PREVIOUS NODE [{adjacent.prev.id}]
                    </span>
                    <span className="text-[15px] font-bold text-primary font-[family-name:var(--font-display)] uppercase mt-2 group-hover:text-primary-fixed transition-colors">
                      {adjacent.prev.title}
                    </span>
                    <span className="text-[11px] text-text-muted font-mono truncate mt-1">
                      {adjacent.prev.subtitle}
                    </span>
                  </Link>
                </TiltCard>
              )}

              {adjacent.next && (
                <TiltCard className="border border-border-primary hover:border-primary-fixed/80 transition-all">
                  <Link
                    href={`/projects/${adjacent.next.slug}`}
                    className="p-5 bg-surface/80 group flex flex-col justify-between md:text-right h-full block"
                  >
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider group-hover:text-primary-fixed transition-colors">
                      NEXT NODE [{adjacent.next.id}] →
                    </span>
                    <span className="text-[15px] font-bold text-primary font-[family-name:var(--font-display)] uppercase mt-2 group-hover:text-primary-fixed transition-colors">
                      {adjacent.next.title}
                    </span>
                    <span className="text-[11px] text-text-muted font-mono truncate mt-1">
                      {adjacent.next.subtitle}
                    </span>
                  </Link>
                </TiltCard>
              )}
            </div>
          </SectionReveal>

          {/* COPYRIGHT FOOTER */}
          <footer className="mt-12 pt-6 border-t border-border-primary flex flex-col sm:flex-row justify-between items-center gap-4 text-text-dim text-[11px] font-mono">
            <div>{siteConfig.copyright}</div>
            <Link 
              href="/projects" 
              className="text-primary-fixed hover:text-primary transition-colors"
            >
              [ RETURN TO PROJECTS ]
            </Link>
          </footer>

        </main>
      </div>

      {/* FULLSCREEN SVG LIGHTBOX (技术架构图) */}
      {lightboxSvg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setLightboxSvg(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto border border-border-primary bg-black p-4 shadow-2xl [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:h-auto"
            onClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: lightboxSvg }}
          />
          <button
            onClick={() => setLightboxSvg(null)}
            className="absolute top-6 right-6 text-white font-mono text-[12px] hover:text-primary-fixed transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            [ CLOSE ESC ]
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] aspect-video border border-border-primary bg-black p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white font-mono text-[12px] hover:text-primary-fixed transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
              [ CLOSE ESC ]
            </button>
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage}
                alt="Fullscreen Preview"
                fill
                className="object-contain"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
