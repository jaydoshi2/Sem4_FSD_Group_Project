/*
  Warnings:

  - You are about to alter the column `price` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `SignedUpat` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "points_providing" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "certificate_preview_link" DROP DEFAULT,
ALTER COLUMN "course_type" DROP DEFAULT,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "SignedUpat",
ADD COLUMN     "SignedupAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
