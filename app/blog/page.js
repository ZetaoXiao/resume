import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import SectionReveal from '@/components/SectionReveal';
import { getPublishedCmsData } from '@/lib/cms-server';
import { honors } from '@/lib/data';


export async function generateMetadata() {
  const cms = await getPublishedCmsData();
  return cms.pageContent?.seo?.pages?.blog || { title: '其他 | 肖泽韬' };
}

const labelClass = 'font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] uppercase text-primary-fixed mb-4';

const publicService = [
  { value: '50+', unit: '小时', label: '公益活动累计时长' },
  { value: '2000+', unit: '元', label: '司内捐款' },
];

const hobbies = [
  { name: '音乐', note: '听歌与现场' },
  { name: 'Livehouse', note: '现场演出，越近越好' },
  { name: '旅行', note: '走走看看，换个视角' },
  { name: '历史', note: '读史，看人如何在时代里做选择' },
  { name: '电影', note: '《死亡诗社》(Dead Poets Society)' },
];

export default function OtherPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-background">
      <Sidebar />
      <MobileMenu />

      <main className="flex-1 flex flex-col md:ml-[180px] min-h-screen border-l border-border-primary relative z-10 pt-16 md:pt-0">
        <div className="flex-1 px-6 py-12 md:px-12 md:py-20 flex justify-center">
          <div className="flex-1 flex flex-col w-full max-w-5xl gap-16">
            <SectionReveal>
              <div className="border-b border-border-primary pb-10">
                <p className="font-[family-name:var(--font-mono)] text-[12px] text-primary-fixed tracking-[0.2em] uppercase mb-3">
                  《死亡诗社》· Carpe Diem
                </p>
                <h1 className="font-[family-name:var(--font-display)] text-[48px] md:text-[88px] font-black uppercase leading-[0.95] text-primary tracking-tight">
                  Seize the Time
                </h1>
                <p className="mt-4 font-[family-name:var(--font-display)] text-[28px] md:text-[40px] font-bold text-primary-fixed">
                  珍惜时间
                </p>
              </div>
            </SectionReveal>

            <SectionReveal>
              <section>
                <div className={labelClass}>/ 荣誉</div>
                <ul className="flex flex-col divide-y divide-border-primary border-y border-border-primary">
                  {honors.map((item) => (
                    <li key={item.title} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[15px] text-primary">{item.title}</span>
                      <span className="font-[family-name:var(--font-mono)] text-[12px] text-text-muted flex items-center gap-3">
                        {item.detail}
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary-fixed hover:text-primary underline">
                            查看链接
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </SectionReveal>

            <SectionReveal>
              <section>
                <div className={labelClass}>/ 公益</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {publicService.map((item) => (
                    <div key={item.label} className="border border-border-primary bg-surface p-6">
                      <div className="font-[family-name:var(--font-display)] text-[48px] font-black text-primary leading-none">
                        {item.value}
                        <span className="text-[18px] text-text-muted ml-2">{item.unit}</span>
                      </div>
                      <div className="mt-3 font-[family-name:var(--font-mono)] text-[13px] text-text-muted">{item.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            </SectionReveal>

            <SectionReveal>
              <section>
                <div className={labelClass}>/ 爱好</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hobbies.map((h) => (
                    <li key={h.name} className="border border-border-primary bg-surface p-5 flex flex-col gap-2">
                      <span className="font-[family-name:var(--font-display)] text-[22px] font-bold uppercase text-primary">{h.name}</span>
                      <span className="font-[family-name:var(--font-mono)] text-[13px] text-text-muted">{h.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </SectionReveal>
          </div>
        </div>
      </main>
    </div>
  );
}
