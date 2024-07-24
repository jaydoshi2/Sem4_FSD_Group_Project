-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT,
    "BirthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Bio" TEXT NOT NULL,
    "Accuracy" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "Number_of_question_Solved" INTEGER NOT NULL DEFAULT 0,
    "correct_questions" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "certificate_link" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_pic_link" TEXT NOT NULL,
    "Enrollment_Counts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "chapter_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("chapter_id")
);

-- CreateTable
CREATE TABLE "Video" (
    "video_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "videoLink" TEXT NOT NULL,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "dislikesCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("video_id")
);

-- CreateTable
CREATE TABLE "UserCourseProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_course" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "UserCourseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChapterProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_chapters" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "UserChapterProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVideoProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserVideoProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoInteraction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL,
    "dislike" BOOLEAN NOT NULL,

    CONSTRAINT "VideoInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VideoInteraction_userId_videoId_key" ON "VideoInteraction"("userId", "videoId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseProgress" ADD CONSTRAINT "UserCourseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseProgress" ADD CONSTRAINT "UserCourseProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChapterProgress" ADD CONSTRAINT "UserChapterProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChapterProgress" ADD CONSTRAINT "UserChapterProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChapterProgress" ADD CONSTRAINT "UserChapterProgress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVideoProgress" ADD CONSTRAINT "UserVideoProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVideoProgress" ADD CONSTRAINT "UserVideoProgress_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("video_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoInteraction" ADD CONSTRAINT "VideoInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoInteraction" ADD CONSTRAINT "VideoInteraction_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("video_id") ON DELETE RESTRICT ON UPDATE CASCADE;
