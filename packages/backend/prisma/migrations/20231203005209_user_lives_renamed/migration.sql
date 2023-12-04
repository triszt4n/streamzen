/*
  Warnings:

  - A unique constraint covering the columns `[folderName]` on the table `Vod` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vod_folderName_key" ON "Vod"("folderName");
