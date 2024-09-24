const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getCourses = async (req, res) => {
  try {
    // Use prisma.$queryRawUnsafe to execute the raw SQL directly
    const randomCourses = await prisma.$queryRawUnsafe(`
      SELECT title, thumbnail_pic_link, course_type, course_id 
      FROM "Course"
      ORDER BY RANDOM()
      LIMIT 5;
    `);

    console.log(randomCourses);
    res.status(200).json(randomCourses);
  } catch (error) {
    console.error('Error fetching random courses:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCourseDetails = async (req, res) => {
  const { course_id } = req.params;

  try {
    const courseDetails = await prisma.course.findUnique({
      where: {
        course_id: parseInt(course_id),
      },
      select: {
        title: true,
        description: true,
        thumbnail_pic_link: true,
        Enrollment_Counts: true,
        certificate_preview_link: true,
        course_type: true,
        price: true,
        points_providing: true,
        Rate: true,
        course_level: true,
        number_of_ratings: true,
      }
    });

    if (!courseDetails) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(courseDetails);
  } catch (error) {
    console.error('Error fetching course details:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
