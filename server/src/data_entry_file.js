const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function truncateTables() {
    await prisma.$executeRaw`TRUNCATE TABLE "Video" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Chapter" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Course" CASCADE;`;
    console.log("Data Truncated")
}

async function setupCourses() {
    await truncateTables();
    await prisma.course.create({
        data: {
            title: 'JAVA TUTORIAL',
            description: 'Learn the fundamentals of Java, one of the most popular programming languages. This course covers object-oriented programming, data structures, algorithms, and real-world applications. Ideal for beginners and those looking to enhance their coding skills for software development.',
            thumbnail_pic_link: 'https://imgs.search.brave.com/rcrgCBGOSiHVwN-uUYY04_mYc9ClCXvEf_AfR9ly_Dk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/MTg3NjMwNy9waG90/by9idXNpbmVzc21h/bi1jbGlja3MtamF2/YS1wcm9ncmFtbWlu/Zy1sYW5ndWFnZS1h/cHBsaWNhdGlvbi1j/b25jZXB0LW9uLXZp/cnR1YWwtc2NyZWVu/LndlYnA_Yj0xJnM9/MTcwNjY3YSZ3PTAm/az0yMCZjPUJldktL/V0hyMTE0RzZTakpK/Rjg0dy1WRHZ6N3Zp/c1ZEODZPdXdrVV9z/dDQ9',
            points_providing: 100,
            course_type: 'Programming',
            certificate_preview_link: 'https://lh3.googleusercontent.com/d/1OqQ9o89TjRLJY1PVPirm5cIo1CAVgG0S=w1000?authuser=0',
            price: 3000,
            chapters: {
                create: [
                    {
                        title: 'SET UP AND BASICS',
                        videos: {
                            create: [
                                { title: 'Java Tutorial for Beginners - Full Course', videoLink: 'https://youtu.be/ntLJmHOJ0ME?si=zfcttQ5Q3F4Al435' },
                                { title: 'Java Programming Basics', videoLink: 'https://youtu.be/zIdg7hkqNE0?si=1zJij1QDYk1SVrVK' },
                                { title: 'Java Object-Oriented Programming', videoLink: 'https://youtu.be/X0zdAG7gfgs?si=F3KP3-VwjUNBh_Lz' },
                                { title: 'Java Tutorial for Beginners - Full Course', videoLink: 'https://youtu.be/HRfmLqqvzUs?si=huvO5lBIwHcYAtJM' },
                            ]
                        }
                    },
                    {
                        title: 'Logic operations',
                        videos: {
                            create: [
                                { title: 'Java Logic Operations Tutorial', videoLink: 'https://youtu.be/YPK6NYMJt_A?si=B1cwc_sVRQtSjcjO' },
                                { title: 'Understanding Java Logic Operations', videoLink: 'https://youtu.be/hdOtQSuPBRY?si=hQ9LeEAk3-qsFa80' },
                            ]
                        }
                    },
                    {
                        title: 'LOOPS',
                        videos: {
                            create: [
                                { title: 'Java Loops Tutorial', videoLink: 'https://youtu.be/GE5C_So1y00?si=OM-s93QoMFtg-uxR' },
                                { title: 'For and While Loops in Java', videoLink: 'https://youtu.be/XFyNiI6ozO0?si=onOHE0ex1NmYwflo' },
                                { title: 'Java Looping Concepts', videoLink: 'https://youtu.be/zY87HRloM18?si=pTaHT8ECnlDXjvAp' },
                            ]
                        }
                    },
                ]
            }
        }
    });

    await prisma.course.create({
        data: {
            title: 'HTML CSS TUTORIAL',
            description: 'Master the building blocks of web development with this course on HTML and CSS. You\'ll learn how to structure web pages with HTML and style them using CSS. Topics include responsive design, web accessibility, and modern web design practices, providing a strong foundation for creating visually appealing and functional websites.',
            thumbnail_pic_link: 'https://imgs.search.brave.com/0GKnwqToKH8DhIhvJYLGFS_pJSt4a7i6kkKp_icP9KY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vcHJhY3RpY2Fs/ZGV2L2ltYWdlL2Zl/dGNoL3MtLVF0eFpB/UDNELS0vY19saW1p/dCxmX2F1dG8sZmxf/cHJvZ3Jlc3NpdmUs/cV9hdXRvLHdfODAw/L2h0dHBzOi8vMS5i/cC5ibG9nc3BvdC5j/b20vLUtQdFV2V3Vv/VFdnL1h5WXVnS2dE/dWtJL0FBQUFBQUFB/aC1jLzRGR3B3VTNO/ZTFnZXBhQk12UVpi/SWxiWG5SQzBNT1BI/QUNMY0JHQXNZSFEv/dzMyMC1oMzIwL0hU/TUwlMjUyQyUyQkNT/UyUyNTJDJTJCYW5k/JTJCSmF2YVNjcmlw/dCUyQmZvciUyQldl/YiUyQkRldmVsb3Bl/cnMlMkIlMjU1QkNv/dXJzZXJhJTI1NUQl/MkItJTJCYmVzdCUy/QmNvdXJzZXJhJTJC/Y291cnNlLndlYnA',
            points_providing: 50,
            course_type: 'Programming',
            certificate_preview_link: 'https://lh3.googleusercontent.com/d/1WsQkGXdH8vxp2z1uqTRn04-LZxaJ7291=w1000?authuser=0',
            price: 1500,
            chapters: {
                create: [
                    {
                        title: 'HTML BASICS',
                        videos: {
                            create: [
                                { title: 'HTML Crash Course For Beginners', videoLink: 'https://youtu.be/mbeT8mpmtHA?si=lZHJzvPa2MRXk9SI' },
                                { title: 'HTML Tutorial for Beginners', videoLink: 'https://youtu.be/YwbIeMlxZAU?si=E1nyWxexUJXPVKSU' },
                            ]
                        }
                    },
                    {
                        title: 'CSS BASICS',
                        videos: {
                            create: [
                                { title: 'CSS Tutorial for Beginners', videoLink: 'https://youtu.be/D3iEE29ZXRM?si=TxXqIHlQfXBsKhES' },
                                { title: 'Learn CSS in 20 Minutes', videoLink: 'https://youtu.be/kGW8Al_cga4?si=xEncttcT-4XQthI-' },
                                { title: 'CSS Crash Course', videoLink: 'https://youtu.be/FMu2cKWD90g?si=fPWNXY1MDMmxdb3k' },
                            ]
                        }
                    },
                ]
            }
        }
    });

    await prisma.course.create({
        data: {
            title: 'Python Course',
            description: 'Dive into Python, a versatile and beginner-friendly programming language. This course covers essential topics such as variables, control structures, functions, and libraries. Whether you\'re interested in web development, data science, or automation, this course provides the skills needed to start coding in Python.',
            thumbnail_pic_link: 'https://imgs.search.brave.com/UYYANil0rAnZ5zGbqkQt7XeWYmjfgbCkY_1-XMGPqoE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy9pbWct/cHJhY3RpY2UvcHJv/ZC9jb3Vyc2VzLzI1/Ni9XZWIvQ29udGVu/dC9Db3Vyc2VfUHlo/dG9uX3Byb2dyYW1f/d2VicF8xNzE2Mzcx/NjA4LndlYnA',
            points_providing: 150,
            course_type: 'Advance Programming',
            certificate_preview_link: 'https://lh3.googleusercontent.com/d/14roQIB8ulxj6W2S_KQCpf9yc6Rl0lAEp=w1000?authuser=0',
            price: 2000,
            chapters: {
                create: [
                    {
                        title: 'INTRODUCTION TO PYTHON',
                        videos: {
                            create: [
                                { title: 'Python Programming Tutorial for Beginners - Full Course', videoLink: 'https://youtu.be/rfscVS0vtbw?si=9tKJ9uQ54I2zOs1m' },
                                { title: 'Learn Python - Python Tutorial for Beginners', videoLink: 'https://youtu.be/YYXdXT2l-Gg?si=zuXnC4M3F5lJK02d' },
                            ]
                        }
                    },
                    {
                        title: 'DATA TYPES AND VARIABLES',
                        videos: {
                            create: [
                                { title: 'Python Data Types Tutorial - Python Basics', videoLink: 'https://youtu.be/khKv-8q7YmY?si=wH8aB-cs-KKJ0U7q' },
                                { title: 'Understanding Python Variables - Python Programming', videoLink: 'https://youtu.be/x-1dtcTVNjo?si=4Tp7r8uETv8cRXYB' },
                            ]
                        }
                    },
                    {
                        title: 'CONTROL STRUCTURES',
                        videos: {
                            create: [
                                { title: 'Python Control Structures - If Else Statements', videoLink: 'https://youtu.be/0z5Ykp0LFjs?si=3x1tKl8Y0bMyX9kd' },
                                { title: 'Loops in Python - For and While Loops', videoLink: 'https://youtu.be/8L_pB2q7d0g?si=Nz37lUEyfG9kbiZP' },
                            ]
                        }
                    },
                    {
                        title: 'FUNCTIONS AND MODULES',
                        videos: {
                            create: [
                                { title: 'Functions in Python - Learn Python Functions', videoLink: 'https://youtu.be/9Os0o3wzS_I?si=1n2t0dDDxL5STZ9p' },
                                { title: 'Python Modules - Importing and Using Modules', videoLink: 'https://youtu.be/YWbOH0om4MA?si=knrHZHCP16Gmq8rl' },
                            ]
                        }
                    },
                ]
            }
        }
    });

    await prisma.course.create({
        data: {
            title: 'React Course',
            description: 'Build interactive user interfaces with React, a powerful JavaScript library for building dynamic web applications. This course covers React components, hooks, state management, and more. Ideal for developers looking to enhance their frontend skills with modern web development practices.',
            thumbnail_pic_link: 'https://imgs.search.brave.com/RksYdT2k0vsXOgXmy6s5k6rp7R9Ahrx7G1QYSpG6XeM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXJ0aWNsZS5pby9i/YWNrL2ltYWdlL2lt/YWdlL3ZpZGVvL2hv/dGtpbmctbG9vay1i/b3R0bGVkLXBvd2Vy/c2hpcGJjLWZ1bGwtaG9s/di1hbGktY3B4P3By/b3plYz1NMDM5NDgyOQ',
            points_providing: 200,
            course_type: 'Frontend Development',
            certificate_preview_link: 'https://lh3.googleusercontent.com/d/1g4T82gwjQeY3lHqsoOBQj_hR3PrwJHEa=w1000?authuser=0',
            price: 2500,
            chapters: {
                create: [
                    {
                        title: 'INTRODUCTION TO REACT',
                        videos: {
                            create: [
                                { title: 'React JS Crash Course', videoLink: 'https://youtu.be/dGcsHMXbSOA?si=wt7ANo5uOlnSgshs' },
                                { title: 'React Tutorial for Beginners', videoLink: 'https://youtu.be/J8EXrFQG9kE?si=mVHRKr3sIBkqUxlr' },
                            ]
                        }
                    },
                    {
                        title: 'COMPONENTS AND PROPS',
                        videos: {
                            create: [
                                { title: 'React Components and Props', videoLink: 'https://youtu.be/m6bPAy6q7VE?si=B8rw1H8DCRlYx2Hz' },
                                { title: 'Understanding Props in React', videoLink: 'https://youtu.be/YZ6RGV3n7AE?si=J3G2F5eA5M3QWyxr' },
                            ]
                        }
                    },
                    {
                        title: 'STATE MANAGEMENT',
                        videos: {
                            create: [
                                { title: 'React State Management with Hooks', videoLink: 'https://youtu.be/cZLP1H1is-M?si=46ktShw78m9FKhK7' },
                                { title: 'Managing State in React Apps', videoLink: 'https://youtu.be/xvS_t73l2P0?si=8ccEjRiCK8kG6XHp' },
                            ]
                        }
                    },
                    {
                        title: 'ROUTING IN REACT',
                        videos: {
                            create: [
                                { title: 'React Router Tutorial', videoLink: 'https://youtu.be/0J2sOqOjw_Y?si=XN8WmScz4G3cbTrH' },
                                { title: 'React Routing and Navigation', videoLink: 'https://youtu.be/nCE7MW8Zqms?si=8M9J-VS1uD77Jj9o' },
                            ]
                        }
                    },
                ]
            }
        }
    });

    console.log('Courses have been seeded successfully!');
}

setupCourses()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
