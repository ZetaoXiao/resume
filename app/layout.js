import { Analytics } from "@vercel/analytics/next";
import PageTransition from "@/components/PageTransition";
import ChatWrapper from "@/components/ChatWrapper";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import CmsProvider from "@/components/CmsProvider";
import { getClientCmsData, getPublishedCmsData } from "@/lib/cms-server";
import { siteUrl } from "@/lib/site-url";

export async function generateMetadata() {
  const cms = await getPublishedCmsData();
  const seo = cms.pageContent?.seo || {};
  const title = seo.siteTitle || "肖泽韬 | Frontend Engineer";
  const description = seo.siteDescription || cms.siteConfig?.tagline;

  let metadataBase;
  try {
    metadataBase = new URL(siteUrl);
  } catch {
    metadataBase = new URL("https://example.com");
  }

  return {
    metadataBase,
    title,
    description,
    keywords: seo.keywords,
    authors: [{ name: cms.siteConfig?.name || "肖泽韬" }],
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: cms.siteConfig?.name || "肖泽韬",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({ children }) {
  const cms = await getPublishedCmsData();

  return (
    <html lang="zh-CN">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative">
        <CustomCursor />
        <div className="noise-overlay" />
        <CmsProvider initialData={getClientCmsData(cms)}>
          <PageTransition>
            {children}
          </PageTransition>
        </CmsProvider>
        <ChatWrapper />
        <Analytics />
      </body>
    </html>
  );
}
