"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { StructuredData } from "@/components/structured-data";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function HomeContent() {
  const [stockSymbol, setStockSymbol] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stockSymbol || stockSymbol.length !== 6) {
      toast.warning("올바른 종목코드를 입력해주세요.");
      return;
    }

    redirect(`stock/${stockSymbol.trim()}`);
  };

  return (
    <>
      <StructuredData />
      <div className="bg-background p-4 pt-20">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              단기과열종목 계산기
            </h1>
            <p className="text-muted-foreground">
              단기과열종목 지정예고 종목이 실제로 단기과열종목에 지정되는 조건을
              미리 계산해보세요
            </p>
          </div>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>종목 검색</CardTitle>
              <CardDescription>
                <p>단기과열종목 지정 조건을 확인할 종목 코드를 입력하세요.</p>
                <p>(예: 005930, 000660, 035420)</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="종목 코드 입력 (예: 005930)"
                  value={stockSymbol}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStockSymbol(e.target.value)
                  }
                />
                <Button type="submit" className="w-full">
                  "단기과열종목 조건 계산"
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto mt-12 py-8 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                투자 유의사항
              </h3>
              <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                <p>
                  본 서비스는 단기과열종목 지정 조건 계산을 위한 참고 정보를
                  제공하며, 투자 권유나 매매 추천을 목적으로 하지 않습니다.
                </p>
                <p>
                  가격괴리율로 인한 단기과열종목 지정예고는 계산 대상에서
                  제외됩니다.
                </p>
                <p>
                  모든 투자 결정은 이용자 본인의 판단과 책임하에 이루어져야
                  하며, 본 정보를 바탕으로 한 투자 결과에 대해 당사는 어떠한
                  책임도 지지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
