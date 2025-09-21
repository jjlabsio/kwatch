import { allPosts, Post } from "@/.contentlayer/generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { compareDesc, format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "단기과열종목에 대한 유용한 정보와 주식시장 관련 인사이트를 제공하는 블로그입니다.",
  openGraph: {
    title: "블로그 | 단기과열종목 계산기",
    description:
      "단기과열종목에 대한 유용한 정보와 주식시장 관련 인사이트를 제공하는 블로그입니다.",
    url: "https://overheat-checker-web.vercel.app/blog",
    // images: [
    //   {
    //     url: "/og-blog.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "블로그 - 단기과열종목 계산기",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "블로그 | 단기과열종목 계산기",
    description:
      "단기과열종목에 대한 유용한 정보와 주식시장 관련 인사이트를 제공하는 블로그입니다.",
    // images: ["/og-blog.png"],
  },
  alternates: {
    canonical: "/blog",
  },
};

function PostCard(post: Post) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <Link href={`/${post.slug}`} className="block h-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100 rounded-full">
              {`blog`}
            </span>
          </div>
          <CardTitle className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </CardDescription>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(post.date, "yyyy.MM.dd")}</span>
            </div>
            <div className="inline-flex items-center text-blue-600 text-sm font-medium">
              자세히 보기
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function Page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="bg-background p-4 pt-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">블로그</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            서비스 사용법 및 단기과열종목에 대한 유용한 정보를 제공합니다
          </p>
        </div>

        {/* 블로그 포스트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>

        {/* 메인 페이지로 돌아가기 */}
        <div className="text-center py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
