const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserData = async (req, res) => {
    try {
        const courses = await prisma.user.findMany({
            select: {
                points: true,
                profilePic: true,
                username: true,
                user_id: true,
                first_name:true,
                last_name:true
            },
            orderBy: [
                {
                    points: 'desc',  // Sort by points in ascending order
                },
            ],
        });
        // console.log(courses);
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};