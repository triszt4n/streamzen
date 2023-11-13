-- CreateEnum
CREATE TYPE "ProcessStatus" AS ENUM ('UNPROCESSED', 'PROCESSING', 'PROCESSED');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "status" "ProcessStatus" NOT NULL DEFAULT 'UNPROCESSED';
