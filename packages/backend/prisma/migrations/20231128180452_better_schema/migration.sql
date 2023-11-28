/*
  Warnings:

  - You are about to drop the column `filename` on the `Live` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `Live` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Live` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Live` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `Vod` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `Vod` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Vod` table. All the data in the column will be lost.
  - The `status` column on the `Vod` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `airDate` to the `Live` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Live` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descMarkdown` to the `Live` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Vod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descMarkdown` to the `Vod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ext` to the `Vod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Vod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderName` to the `Vod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalDate` to the `Vod` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LiveState" AS ENUM ('PREMIERE', 'ON_AIR', 'OFF_AIR');

-- CreateEnum
CREATE TYPE "LiveType" AS ENUM ('LOCAL_RTMP', 'EMBED_YOUTUBE', 'EMBED_TWITCH');

-- CreateEnum
CREATE TYPE "ProcessState" AS ENUM ('UNPROCESSED', 'PROCESSING', 'PROCESSED', 'FAILED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Live" DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "path",
DROP COLUMN "status",
ADD COLUMN     "airDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "descMarkdown" TEXT NOT NULL,
ADD COLUMN     "embedUrl" TEXT,
ADD COLUMN     "liveType" "LiveType" NOT NULL DEFAULT 'LOCAL_RTMP',
ADD COLUMN     "localRtmpStreamKey" TEXT,
ADD COLUMN     "localRtmpUrl" TEXT,
ADD COLUMN     "state" "LiveState" NOT NULL DEFAULT 'PREMIERE';

-- AlterTable
ALTER TABLE "Vod" DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "path",
ADD COLUMN     "collectionId" INTEGER,
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "descMarkdown" TEXT NOT NULL,
ADD COLUMN     "ext" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "folderName" TEXT NOT NULL,
ADD COLUMN     "originalDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ProcessState" NOT NULL DEFAULT 'UNPROCESSED';

-- DropEnum
DROP TYPE "LiveStatus";

-- DropEnum
DROP TYPE "ProcessStatus";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authSchId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descMarkdown" TEXT NOT NULL,
    "originalDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authSchId_key" ON "User"("authSchId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vod" ADD CONSTRAINT "Vod_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vod" ADD CONSTRAINT "Vod_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Live" ADD CONSTRAINT "Live_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
