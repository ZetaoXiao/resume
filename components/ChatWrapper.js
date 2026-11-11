'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const PortfolioChat = dynamic(() => import('./PortfolioChat'), { ssr: false });

// AI 助手入口开关。设为 true 即可恢复聊天组件的挂载。
const ENABLE_AI_CHAT = false;

export default function ChatWrapper() {
  const pathname = usePathname();
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    if (!ENABLE_AI_CHAT) return undefined;
    const check404 = () => {
      const isHidden =
        document.body.classList.contains('hide-chatbot') ||
        pathname === '/404' ||
        pathname === '/_not-found';
      setIs404(isHidden);
    };

    check404();

    const observer = new MutationObserver(check404);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [pathname]);

  if (!ENABLE_AI_CHAT || is404 || pathname === '/404' || pathname === '/_not-found' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div id="portfolio-chat-root">
      <PortfolioChat />
    </div>
  );
}
