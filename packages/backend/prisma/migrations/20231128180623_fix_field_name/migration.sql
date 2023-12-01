/*
  Warnings:

  - You are about to drop the column `status` on the `Vod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vod" DROP COLUMN "status",
ADD COLUMN     "state" "ProcessState" NOT NULL DEFAULT 'UNPROCESSED';
