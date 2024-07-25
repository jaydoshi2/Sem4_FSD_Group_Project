const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      select: {
        title: true,
        thumbnail_pic_link: true,
        course_type: true,
      },
    });
    console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
