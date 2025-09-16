/*
  Warnings:

  - You are about to drop the column `originalURL` on the `Url` table. All the data in the column will be lost.
  - Added the required column `originalUrl` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Url" DROP COLUMN "originalURL",
ADD COLUMN     "originalUrl" TEXT NOT NULL;
