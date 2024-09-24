/*
  Warnings:

  - You are about to drop the column `accuracy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `correctQuestions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfQuestionsSolved` on the `User` table. All the data in the column will be lost.
  - Added the required column `course_level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_people_rated` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "course_level" TEXT NOT NULL,
ADD COLUMN     "number_of_people_rated" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accuracy",
DROP COLUMN "correctQuestions",
DROP COLUMN "numberOfQuestionsSolved";
