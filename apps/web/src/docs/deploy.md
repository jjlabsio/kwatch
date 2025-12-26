# 실서버 데이터베이스 배포 가이드

## 1. Prisma 스키마 설정

프로젝트의 `schema.prisma` 파일에 다음 설정을 추가합니다:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}
```

## 2. Vercel 배포 설정

### Build Command 설정

1. Vercel 대시보드 접속
2. **Settings** → **Build and Deployment** 이동
3. **Build Command** 섹션에서 **Override** 활성화
4. 다음 명령어 입력:

```bash
npx prisma migrate deploy && npx prisma generate && npm run build
```

**설명:**
- `prisma migrate deploy`: 프로덕션 환경에서 마이그레이션 실행
- `prisma generate`: Prisma Client 생성
- `npm run build`: Next.js 앱 빌드

## 3. 데이터베이스 마이그레이션 전략

### 문제점

로컬 개발 환경에서 실서버 데이터베이스에 직접 접근할 수 없는 경우가 있습니다.

### 권장 해결방법

**API Route를 통한 마이그레이션 실행:**

1. 마이그레이션 실행용 API Route Handler 생성
2. 배포 완료 후 해당 API 엔드포인트에 직접 접근
3. 마이그레이션 실행

**예시:**

```typescript
// app/api/migrate/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  // 보안: 인증 체크 필수
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.MIGRATION_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    return NextResponse.json({
      success: true,
      output: stdout,
      error: stderr
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
```

**사용법:**

```bash
curl -X POST https://your-domain.vercel.app/api/migrate \
  -H "Authorization: Bearer YOUR_SECRET_TOKEN"
```

### 주의사항

- ⚠️ API Route 사용 시 **반드시 인증을 구현**하세요
- ⚠️ 마이그레이션 완료 후 API Route를 제거하거나 비활성화하는 것을 권장합니다
- ⚠️ `MIGRATION_SECRET` 환경변수를 Vercel 환경변수에 설정하세요
