const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    // Course 4: JavaScript Fundamentals
    const jsCourse = await prisma.course.create({
        data: {
            title: "JavaScript Fundamentals",
            course_type: "Programming",
            description:
                "Get started with JavaScript, the language that powers the web. This course covers the basics, including variables, functions, and DOM manipulation. Perfect for aspiring web developers and anyone looking to enhance their programming skills.",
            thumbnail_pic_link:
                "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/63/264f5bf7334330995636a7a1c9c3e0/learn-js.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
            certificate_preview_link:
                "https://lh3.googleusercontent.com/d/1I8WTT7XmMv0fhgg-vMZwoDRUHzJliOsl=w1000?authuser=0",
            number_of_people_rated: 890,
            course_level: "Intermediate",
            Rate: 4.2,
            points_providing: 75,
            Enrollment_Counts: 6800,
            price: 1800,
            chapters: {
                create: [
                    {
                        title: "Introduction to JavaScript",
                        videos: {
                            create: [
                                { title: "JavaScript Basics", videoLink: "https://youtu.be/W6NZfCO5SIk?si=RWb1mHJspZxbDQ_1" },
                                { title: "JavaScript Variables and Constants", videoLink: "https://youtu.be/1wztuq_mUfI?si=hAKSnBTSr9wBL0HR" },
                            ],
                        },
                    },
                    {
                        title: "DOM Manipulation",
                        videos: {
                            create: [
                                { title: "Introduction to the DOM", videoLink: "https://youtu.be/OtUlL5Lv1sA?si=F8sHvUgG7N9quXtS" },
                                { title: "JavaScript Events", videoLink: "https://youtu.be/NKz7_2I6uhk?si=8kaJ3bsn9XrGJnzC" },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // Course 5: Data Structures & Algorithms
    const dsaCourse = await prisma.course.create({
        data: {
            title: "Data Structures & Algorithms",
            course_type: "Programming",
            description:
                "Learn the key concepts of data structures and algorithms. This course is essential for those looking to excel in coding interviews and understand the foundational principles that underpin efficient coding.",
            thumbnail_pic_link:
                "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/b0/73c42fb4f443b0a802d5bed01add87/1325192.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
            certificate_preview_link:
                "https://lh3.googleusercontent.com/d/1oLjeJD05QezJbxfC-X8PjEMo0m2_SdeB=w1000?authuser=0",
            number_of_people_rated: 6000,
            course_level: "Advanced",
            Rate: 4.8,
            points_providing: 150,
            Enrollment_Counts: 9000,
            price: 5000,
            chapters: {
                create: [
                    {
                        title: "Arrays and Linked Lists",
                        videos: {
                            create: [
                                { title: "Introduction to Arrays", videoLink: "https://youtu.be/zuegQmMdy8M?si=ieG7HK5DY93pVJpO" },
                                { title: "Singly Linked List", videoLink: "https://youtu.be/F9xtp11Vh24?si=H9EfWcFiLP-AK_L6" },
                            ],
                        },
                    },
                    {
                        title: "Sorting Algorithms",
                        videos: {
                            create: [
                                { title: "Merge Sort", videoLink: "https://youtu.be/JSceec-wEyw?si=WUmKl5TWmoKDZcSk" },
                                { title: "Quick Sort", videoLink: "https://youtu.be/SLauY6PpjW4?si=5U5tFOGJgKouTIp9" },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // Course 6: Machine Learning with Python
    const mlCourse = await prisma.course.create({
        data: {
            title: "Machine Learning with Python",
            course_type: "Programming",
            description:
                "Unlock the power of machine learning with Python. This course covers supervised and unsupervised learning, model evaluation, and real-world applications. Ideal for aspiring data scientists and AI enthusiasts.",
            thumbnail_pic_link:
                "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/30/642985a29449dba4ed46240a482e3a/new-ml-on-gcp-logo.jpeg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;q=25&amp;fit=fill",
            certificate_preview_link:
                "https://lh3.googleusercontent.com/d/1VbId3OVh7Quu6fV0cTBHYJni72y8ln0k=w1000?authuser=0",
            number_of_people_rated: 8000,
            course_level: "Advanced",
            Rate: 4.9,
            points_providing: 200,
            Enrollment_Counts: 12000,
            price: 6000,
            chapters: {
                create: [
                    {
                        title: "Introduction to Machine Learning",
                        videos: {
                            create: [
                                { title: "What is Machine Learning?", videoLink: "https://youtu.be/ukzFI9rgwfU?si=c96TZ8AvbCKN4WPl" },
                                { title: "Supervised Learning", videoLink: "https://youtu.be/6M5VXKLf4D4?si=Q_yvcayH_nPsdI-L" },
                            ],
                        },
                    },
                    {
                        title: "Deep Learning",
                        videos: {
                            create: [
                                { title: "Neural Networks", videoLink: "https://youtu.be/aircAruvnKk?si=Ulkmic4_tRjQCSsm" },
                                { title: "Convolutional Neural Networks", videoLink: "https://youtu.be/YRhxdVk_sIs?si=mvOWqFZkS8oGBsFr" },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // Course 7: Web Development Bootcamp
    const webDevCourse = await prisma.course.create({
        data: {
            title: "Web Development Bootcamp",
            course_type: "Programming",
            description:
                "Become a full-stack web developer by learning HTML, CSS, JavaScript, and back-end technologies. This comprehensive bootcamp takes you from beginner to pro, covering both front-end and back-end development.",
            thumbnail_pic_link:
                "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/18/2aa16c328a457cb910aa933bf2cd87/Professional-Certificate-Cloud-App.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
            certificate_preview_link:
                "https://lh3.googleusercontent.com/d/1akTeOarEjb8cTND8e2uCsXkP0TP6GnAj=w1000?authuser=0",
            number_of_people_rated: 9500,
            course_level: "Beginner to Advanced",
            Rate: 4.7,
            points_providing: 180,
            Enrollment_Counts: 14000,
            price: 7000,
            chapters: {
                create: [
                    {
                        title: "HTML & CSS",
                        videos: {
                            create: [
                                { title: "HTML Basics", videoLink: "https://youtu.be/pQN-pnXPaVg?si=ahY0VNHbgNOjrLer" },
                                { title: "CSS Flexbox", videoLink: "https://youtu.be/JJSoEo8JSnc?si=6rwFZFcX3j1IwhpX" },
                            ],
                        },
                    },
                    {
                        title: "JavaScript & DOM",
                        videos: {
                            create: [
                                { title: "JavaScript Fundamentals", videoLink: "https://youtu.be/hdI2bqOjy3c?si=ybzRJ9Ce6kEP_-Fn" },
                                { title: "DOM Manipulation", videoLink: "https://youtu.be/0ik6X4DJKCc?si=8XNx4OC5ATkA7cU1" },
                            ],
                        },
                    },
                    {
                        title: "Back-end Development",
                        videos: {
                            create: [
                                { title: "Node.js Basics", videoLink: "https://youtu.be/TlB_eWDSMt4?si=HvZ4Or5pGrHcGQJ5" },
                                { title: "Express.js & APIs", videoLink: "https://youtu.be/L72fhGm1tfE?si=Uz91ckBdtNC9DCmr" },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // Course 8: Artificial Intelligence for Everyone
    const aiCourse = await prisma.course.create({
        data: {
            title: "Artificial Intelligence",
            course_type: "AI & ML",
            description:
                "Explore the fascinating world of Artificial Intelligence. This course is designed for non-technical individuals interested in understanding AI concepts, applications, and the ethical considerations surrounding AI technology.",
            thumbnail_pic_link:
                "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a7/edd3b41ddd45298d7bbcb04b19fba6/200766_Logo-Image_1200x1200pxl-copy-3.png?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
            certificate_preview_link:
                "https://lh3.googleusercontent.com/d/1uY6bJHL5nyJK-fB5B5Umt3MmAjGcJ7bB=w1000?authuser=0",
            number_of_people_rated: 11000,
            course_level: "Beginner",
            Rate: 4.5,
            points_providing: 100,
            Enrollment_Counts: 18000,
            price: 2500,
            chapters: {
                create: [
                    {
                        title: "Introduction to AI",
                        videos: {
                            create: [
                                { title: "What is AI?", videoLink: "https://youtu.be/kWmX3pd1f10?si=rYg98yYzxW8bfZr1" },
                                { title: "History of AI", videoLink: "https://youtu.be/xyhl18Qtl7U?si=FJ_CNE0DBto5f92W" },
                            ],
                        },
                    },
                    {
                        title: "AI in Real-World Applications",
                        videos: {
                            create: [
                                { title: "AI in Healthcare", videoLink: "https://youtu.be/if5snlsjB9k?si=NgivPqIWbhu-5-UV" },
                                { title: "AI in Finance", videoLink: "https://youtu.be/dmFic6AQb9Y?si=HYKEAEw8L8qJ7W6d" },
                            ],
                        },
                    },
                    {
                        title: "Ethical Considerations",
                        videos: {
                            create: [
                                { title: "Ethics in AI", videoLink: "https://youtu.be/f6kdp27TYZs?si=89JX5j9Un_pNcM_i" },
                                { title: "Future of AI", videoLink: "https://youtu.be/TNsfayV4I4Y?si=dJlOEwvOoe7E4DMI" },
                            ],
                        },
                    },
                ],
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });