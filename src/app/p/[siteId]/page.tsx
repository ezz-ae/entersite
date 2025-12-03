import { getPublishedSite } from '@/lib/publish-service';
import { PageRenderer } from '@/components/page-renderer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ siteId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { siteId } = await params;
  const page = await getPublishedSite(siteId);

  if (!page) {
    return {
      title: 'Site Not Found',
    };
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    keywords: page.seo?.keywords,
  };
}

export default async function PublishedPage({ params }: Props) {
  const { siteId } = await params;
  const page = await getPublishedSite(siteId);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageRenderer page={page} />
      
      {/* "Made with EntreSite" Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <a 
            href="/" 
            target="_blank" 
            className="bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-black transition-colors flex items-center gap-1 shadow-lg"
        >
            <span>⚡ Made with EntreSite</span>
        </a>
      </div>
    </main>
  );
}
