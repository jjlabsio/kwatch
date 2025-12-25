import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";

const envFile =
  process.env.NODE_ENV === "development" ? ".env.local" : ".env.production";
config({ path: envFile });

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
    seed: "tsx src/prisma/script.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
