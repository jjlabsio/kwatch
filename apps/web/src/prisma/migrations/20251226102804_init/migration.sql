-- CreateEnum
CREATE TYPE "MarketMeasureType" AS ENUM ('ATTENTION', 'WARNING', 'WARNING_NOTICE', 'RISK', 'RISK_NOTICE', 'TRADING_SUSPENSION', 'TRADING_SUSPENSION_NOTICE', 'OVERHEATED', 'OVERHEATED_NOTICE');

-- CreateTable
CREATE TABLE "stock_market_measures" (
    "id" TEXT NOT NULL,
    "stock_code" CHAR(6) NOT NULL,
    "type" "MarketMeasureType" NOT NULL,
    "start_at" DATE NOT NULL,
    "end_at" DATE,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_market_measures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stock_market_measures_stock_code_idx" ON "stock_market_measures"("stock_code");

-- CreateIndex
CREATE INDEX "stock_market_measures_type_idx" ON "stock_market_measures"("type");

-- CreateIndex
CREATE INDEX "stock_market_measures_start_at_end_at_idx" ON "stock_market_measures"("start_at", "end_at");

-- CreateIndex
CREATE UNIQUE INDEX "stock_market_measures_stock_code_type_start_at_key" ON "stock_market_measures"("stock_code", "type", "start_at");
