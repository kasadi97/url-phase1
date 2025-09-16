/*
  Warnings:

  - You are about to drop the column `original` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `short` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortCode]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalURL` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortCode` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Url_short_key";

-- AlterTable
ALTER TABLE "public"."Url" DROP COLUMN "original",
DROP COLUMN "short",
ADD COLUMN     "originalURL" TEXT NOT NULL,
ADD COLUMN     "shortCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortCode_key" ON "public"."Url"("shortCode");
