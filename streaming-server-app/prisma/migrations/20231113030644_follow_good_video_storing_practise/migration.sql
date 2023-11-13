/*
  Warnings:

  - You are about to drop the column `customUrl` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Video` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "customUrl",
DROP COLUMN "src",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
