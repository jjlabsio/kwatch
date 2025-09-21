import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx-components";
import { Metadata } from "next";
import { cn } from "@repo/ui/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
// import { DashboardTableOfContents } from "@/components/toc";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  const doc = allPosts.find((doc) => doc._raw.flattenedPath === path);

  if (!doc) {
    return null;
  }

  return doc;
}

export const generateStaticParams = async () => {
  return allPosts.map((doc) => {
    const slugArray = doc._raw.flattenedPath.split("/");
    return { slug: slugArray };
  });
};

export const generateMetadata = async (
  params: DocPageProps
): Promise<Metadata> => {
  const doc = await getDocFromParams(params);

  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description || "A detailed guide to the topic.",
    openGraph: {
      title: doc.title,
      description: doc.description || "A detailed guide to the topic.",
    },
  };
};

const DocsPage = async ({ params }: DocPageProps) => {
  const doc = await getDocFromParams({ params });

  if (!doc) notFound();

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-2xl">
        <div className="mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {format(doc.date, "yyyy년 MM월 dd일")}
        </div>
        <div className="border-b border-border my-3"></div>
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
        {/* 네비게이션 */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            블로그 목록으로
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            계산기 사용해보기
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      {/* <div className="hidden text-sm xl:block">
        <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {doc.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default DocsPage;
