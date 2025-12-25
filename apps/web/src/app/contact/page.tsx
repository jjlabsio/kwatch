import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Mail, MessageCircle, MoveLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "단기과열종목 계산기에 대한 문의사항이나 피드백을 보내주세요. 서비스 개선을 위한 소중한 의견을 기다립니다.",
  openGraph: {
    title: "문의하기 | 단기과열종목 계산기",
    description: "단기과열종목 계산기에 대한 문의사항이나 피드백을 보내주세요.",
    url: "https://overheat-checker-web.vercel.app/contact",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "문의하기 - 단기과열종목 계산기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "문의하기 | 단기과열종목 계산기",
    description: "단기과열종목 계산기에 대한 문의사항이나 피드백을 보내주세요.",
    images: ["/og-contact.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background p-4 pt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">문의하기</h1>
          <p className="text-muted-foreground">
            서비스 이용 중 궁금한 점이나 개선 사항이 있으시면 언제든 연락해
            주세요
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              이메일 문의
            </CardTitle>
            <CardDescription>
              문의사항이나 건의사항이 있으시면 아래 이메일로 연락해 주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">연락처</span>
              </div>
              <a
                href="mailto:wowlxx28@gmail.com"
                className="text-lg font-mono text-blue-600 hover:text-blue-800 transition-colors"
              >
                wowlxx28@gmail.com
              </a>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                다음과 같은 내용으로 문의해 주시면 더욱 빠른 답변이 가능합니다:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>서비스 이용 중 발생한 오류나 문제점</li>
                <li>새로운 기능에 대한 제안이나 개선 아이디어</li>
                <li>데이터 정확성에 대한 문의</li>
                <li>기타 서비스 관련 질문</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <MoveLeft className="h-4 w-4 me-2" />
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
