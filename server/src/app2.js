const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function setupCourses() {
    await prisma.course.create({
        data: {
            title: 'JAVA TUTORIAL',
            description: 'Learn the fundamentals of Java, one of the most popular programming languages. This course covers object-oriented programming, data structures, algorithms, and real-world applications. Ideal for beginners and those looking to enhance their coding skills for software development.',
            thumbnail_pic_link: 'https://imgs.search.brave.com/rcrgCBGOSiHVwN-uUYY04_mYc9ClCXvEf_AfR9ly_Dk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/MTg3NjMwNy9waG90/by9idXNpbmVzc21h/bi1jbGlja3MtamF2/YS1wcm9ncmFtbWlu/Zy1sYW5ndWFnZS1h/cHBsaWNhdGlvbi1j/b25jZXB0LW9uLXZp/cnR1YWwtc2NyZWVu/LndlYnA_Yj0xJnM9/MTcwNjY3YSZ3PTAm/az0yMCZjPUJldktL/V0hyMTE0RzZTakpK/Rjg0dy1WRHZ6N3Zp/c1ZEODZPdXdrVV9z/dDQ9',
            chapters: {
                create: [
                    {
                        title: 'SET UP AND BASICS',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/ntLJmHOJ0ME?si=zfcttQ5Q3F4Al435' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/zIdg7hkqNE0?si=1zJij1QDYk1SVrVK' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/X0zdAG7gfgs?si=F3KP3-VwjUNBh_Lz' },
                                { title: 'Video 4', videoLink: 'https://youtu.be/HRfmLqqvzUs?si=huvO5lBIwHcYAtJM' },
                            ]
                        }
                    },
                    {
                        title: 'Logic operations',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/YPK6NYMJt_A?si=B1cwc_sVRQtSjcjO' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/hdOtQSuPBRY?si=hQ9LeEAk3-qsFa80' },
                            ]
                        }
                    },
                    {
                        title: 'LOOPS',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/GE5C_So1y00?si=OM-s93QoMFtg-uxR' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/XFyNiI6ozO0?si=onOHE0ex1NmYwflo' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/zY87HRloM18?si=pTaHT8ECnlDXjvAp' },
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
            chapters: {
                create: [
                    {
                        title: 'HTML BASICS',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/mbeT8mpmtHA?si=lZHJzvPa2MRXk9SI' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/YwbIeMlxZAU?si=E1nyWxexUJXPVKSU' },
                            ]
                        }
                    },
                    {
                        title: 'CSS BASICS',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/D3iEE29ZXRM?si=TxXqIHlQfXBsKhES' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/kGW8Al_cga4?si=xEncttcT-4XQthI-' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/FMu2cKWD90g?si=fPWNXY1MDMmxdb3k' },
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
            chapters: {
                create: [
                    {
                        title: 'PYTHON BASICS',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/Tto8TS-fJQU?si=DD7wKzsENlN2VKwA' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/xwKO_y2gHxQ?si=SUyJoaT7T4X0Akhv' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/xwKO_y2gHxQ?si=Xnb_4ev9qqTldDos' },
                            ]
                        }
                    },
                    {
                        title: 'PYTHON INTERMEDIATE',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/kMNFQYArrLg?si=bmRAqNPweMNpHkqm' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/0INvoK_T0cE?si=9G1KNFXMjeSRhLE5' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/Czxzr_90bJg?si=Z_oPxovmjTxodf2T' },
                                { title: 'Video 4', videoLink: 'https://youtu.be/WcGC3M4P_Vg?si=rP_kG0Ar8eUQ39Qn' },
                            ]
                        }
                    },
                    {
                        title: 'PYTHON ADVANCED',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/MXrhgn3t0Bo?si=diA8AIDmTC2YTh8v' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/LzJdn6DrYO0?si=n5CQjOvRRoYg2W4C' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/G4m7wozRuvM?si=nVZcBYT-TWX0Tz6s' },
                            ]
                        }
                    },
                ]
            }
        }
    });

    await prisma.course.create({
        data: {
            title: 'DATA STRUCTURES AND ALGORITHMS',
            description: 'Explore the core concepts of data structures and algorithms. This course covers arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and more. Understanding these topics is crucial for efficient problem-solving and is a key component of technical interviews for software engineering roles.',
            thumbnail_pic_link: 'https://imgs.search.brave.com/VYXPEdX0yLmjG9op2ZboE3FnZWkZDpCB2Hr55Ur8ap0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3BlY3RydW1wb3J0/LmNvbS90aHVtYm5h/aWxzLzYyNi0xNzUy/LTI1NjMvRGF0YS1T/dHJ1Y3R1cmVzLUFs/Z29yaXRobXMuanBn',
            chapters: {
                create: [
                    {
                        title: 'INTRODUCTION',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/BBpAmxU_NQo?si=ARdGyA7JeYroXvqD' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/5F02rr_Y5tk?si=XrT4Qab2mtDgxDQ9' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/lVFnqNUXIK8?si=sgIQfxdjJ3W_2D_L' },
                                { title: 'Video 4', videoLink: 'https://youtu.be/-ezztai9GVs?si=9X7_VGm-nwthmAgU' },
                            ]
                        }
                    },
                    {
                        title: 'DATA STRUCTURES',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/nMfrLBY7-Cc?si=SkRTzM61UlGgMyPI' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/4FDOYrURFHo?si=2D0qjNHnyYabnBba' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/16ZpEUNFIEw?si=IFPYAGpbDb1jMT7y' },
                            ]
                        }
                    },
                    {
                        title: 'ALGORITHMS',
                        videos: {
                            create: [
                                { title: 'Video 1', videoLink: 'https://youtu.be/lX0ony-vB70?si=9B4Msy8wJWnEkV5j' },
                                { title: 'Video 2', videoLink: 'https://youtu.be/ibjEGG7ylHk?si=gt-0b6RYxChqLzZ7' },
                                { title: 'Video 3', videoLink: 'https://youtu.be/bK7I79hcm08?si=PX24NGYPsk0EXHsV' },
                            ]
                        }
                    },
                ]
            }
        }
    });

    console.log('Courses and their data set up.');
}

setupCourses()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
