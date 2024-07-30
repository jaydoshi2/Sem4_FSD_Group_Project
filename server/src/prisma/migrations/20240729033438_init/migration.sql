/*
  Warnings:

  - You are about to drop the column `Accuracy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `BirthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Number_of_question_Solved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `SignedupAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `correct_questions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "Rate" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Accuracy",
DROP COLUMN "Bio",
DROP COLUMN "BirthDate",
DROP COLUMN "Number_of_question_Solved",
DROP COLUMN "SignedupAt",
DROP COLUMN "correct_questions",
ADD COLUMN     "accuracy" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "correctQuestions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfQuestionsSolved" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "signedUpAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "profilePic" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
