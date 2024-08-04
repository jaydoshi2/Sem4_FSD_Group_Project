/*
  Warnings:

  - You are about to drop the column `certificate_link` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Made the column `profilePic` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "certificate_preview_link" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "course_type" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "certificate_link",
DROP COLUMN "createdAt",
ADD COLUMN     "SignedUpat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "profilePic" SET NOT NULL;

-- CreateTable
CREATE TABLE "Certificates" (
    "id" SERIAL NOT NULL,
    "certificate_link" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Certificates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificates_userId_courseId_key" ON "Certificates"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
