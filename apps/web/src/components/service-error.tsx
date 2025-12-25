"use client";

import type React from "react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Alert, AlertDescription } from "@repo/ui/components/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ServiceErrorProps {
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export function ServiceError({
  onRetry,
  title = "서비스 일시 오류",
  description = "현재 서비스에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
}: ServiceErrorProps) {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm">
              Yahoo Finance API에서 일시적으로 데이터를 가져올 수 없습니다.
              네트워크 연결을 확인하시고 잠시 후 다시 시도해주세요.
            </AlertDescription>
          </Alert>
          
          {onRetry && (
            <Button onClick={onRetry} className="w-full" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              다시 시도
            </Button>
          )}
          
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="text-sm text-muted-foreground"
            >
              페이지 새로고침
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}