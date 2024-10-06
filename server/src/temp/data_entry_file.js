const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv')
dotenv.config()
// async function truncateTables() {
//     await prisma.$executeRaw`TRUNCATE TABLE "Video" CASCADE;`;
//     await prisma.$executeRaw`TRUNCATE TABLE "Chapter" CASCADE;`;
//     await prisma.$executeRaw`TRUNCATE TABLE "Course" CASCADE;`;
//     console.log("Data Truncated")
// }

async function setupCourses() {
    // await truncateTables();
    // await prisma.course.create({
    //     data: {
    //         title: 'JAVA TUTORIAL',
    //         description: 'Learn the fundamentals of Java, one of the most popular programming languages. This course covers object-oriented programming, data structures, algorithms, and real-world applications. Ideal for beginners and those looking to enhance their coding skills for software development.',
    //         thumbnail_pic_link: 'https://imgs.search.brave.com/rcrgCBGOSiHVwN-uUYY04_mYc9ClCXvEf_AfR9ly_Dk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/MTg3NjMwNy9waG90/by9idXNpbmVzc21h/bi1jbGlja3MtamF2/YS1wcm9ncmFtbWlu/Zy1sYW5ndWFnZS1h/cHBsaWNhdGlvbi1j/b25jZXB0LW9uLXZp/cnR1YWwtc2NyZWVu/LndlYnA_Yj0xJnM9/MTcwNjY3YSZ3PTAm/az0yMCZjPUJldktL/V0hyMTE0RzZTakpK/Rjg0dy1WRHZ6N3Zp/c1ZEODZPdXdrVV9z/dDQ9',
    //         points_providing: 100,
    //         course_type: 'Programming',
    //         certificate_preview_link: 'https://lh3.googleusercontent.com/d/1OqQ9o89TjRLJY1PVPirm5cIo1CAVgG0S=w1000?authuser=0',
    //         price: 3000,
    //         number_of_people_rated:200,
    //         course_level:"medium",
    //         Rate: 3.5,
    //         Enrollment_Counts: 500,
    //         chapters: {
    //             create: [
    //                 {
    //                     title: 'SET UP AND BASICS',
    //                     videos: {
    //                         create: [
    //                             { title: 'Java Tutorial for Beginners - Full Course', videoLink: 'https://youtu.be/ntLJmHOJ0ME?si=zfcttQ5Q3F4Al435' },
    //                             { title: 'Java Programming Basics', videoLink: 'https://youtu.be/zIdg7hkqNE0?si=1zJij1QDYk1SVrVK' },
    //                             { title: 'Java Object-Oriented Programming', videoLink: 'https://youtu.be/X0zdAG7gfgs?si=F3KP3-VwjUNBh_Lz' },
    //                             { title: 'Java Tutorial for Beginners - Full Course', videoLink: 'https://youtu.be/HRfmLqqvzUs?si=huvO5lBIwHcYAtJM' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'Logic operations',
    //                     videos: {
    //                         create: [
    //                             { title: 'Java Logic Operations Tutorial', videoLink: 'https://youtu.be/YPK6NYMJt_A?si=B1cwc_sVRQtSjcjO' },
    //                             { title: 'Understanding Java Logic Operations', videoLink: 'https://youtu.be/hdOtQSuPBRY?si=hQ9LeEAk3-qsFa80' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'LOOPS',
    //                     videos: {
    //                         create: [
    //                             { title: 'Java Loops Tutorial', videoLink: 'https://youtu.be/GE5C_So1y00?si=OM-s93QoMFtg-uxR' },
    //                             { title: 'For and While Loops in Java', videoLink: 'https://youtu.be/XFyNiI6ozO0?si=onOHE0ex1NmYwflo' },
    //                             { title: 'Java Looping Concepts', videoLink: 'https://youtu.be/zY87HRloM18?si=pTaHT8ECnlDXjvAp' },
    //                         ]
    //                     }
    //                 },
    //             ]
    //         }
    //     }
    // });

    // await prisma.course.create({
    //     data: {
    //         title: 'HTML CSS TUTORIAL',
    //         description: 'Master the building blocks of web development with this course on HTML and CSS. You\'ll learn how to structure web pages with HTML and style them using CSS. Topics include responsive design, web accessibility, and modern web design practices, providing a strong foundation for creating visually appealing and functional websites.',
    //         thumbnail_pic_link: 'https://imgs.search.brave.com/0GKnwqToKH8DhIhvJYLGFS_pJSt4a7i6kkKp_icP9KY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vcHJhY3RpY2Fs/ZGV2L2ltYWdlL2Zl/dGNoL3MtLVF0eFpB/UDNELS0vY19saW1p/dCxmX2F1dG8sZmxf/cHJvZ3Jlc3NpdmUs/cV9hdXRvLHdfODAw/L2h0dHBzOi8vMS5i/cC5ibG9nc3BvdC5j/b20vLUtQdFV2V3Vv/VFdnL1h5WXVnS2dE/dWtJL0FBQUFBQUFB/aC1jLzRGR3B3VTNO/ZTFnZXBhQk12UVpi/SWxiWG5SQzBNT1BI/QUNMY0JHQXNZSFEv/dzMyMC1oMzIwL0hU/TUwlMjUyQyUyQkNT/UyUyNTJDJTJCYW5k/JTJCSmF2YVNjcmlw/dCUyQmZvciUyQldl/YiUyQkRldmVsb3Bl/cnMlMkIlMjU1QkNv/dXJzZXJhJTI1NUQl/MkItJTJCYmVzdCUy/QmNvdXJzZXJhJTJC/Y291cnNlLndlYnA',
    //         points_providing: 50,
    //         course_type: 'Programming',
    //         certificate_preview_link: 'https://lh3.googleusercontent.com/d/1WsQkGXdH8vxp2z1uqTRn04-LZxaJ7291=w1000?authuser=0',
    //         price: 1500,
    //         number_of_people_rated:300,
    //         course_level:"beginner",
    //         Rate: 4.5,
    //         Enrollment_Counts: 1000,
    //         chapters: {
    //             create: [
    //                 {
    //                     title: 'HTML BASICS',
    //                     videos: {
    //                         create: [
    //                             { title: 'HTML Crash Course For Beginners', videoLink: 'https://youtu.be/mbeT8mpmtHA?si=lZHJzvPa2MRXk9SI' },
    //                             { title: 'HTML Tutorial for Beginners', videoLink: 'https://youtu.be/YwbIeMlxZAU?si=E1nyWxexUJXPVKSU' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'CSS BASICS',
    //                     videos: {
    //                         create: [
    //                             { title: 'CSS Tutorial for Beginners', videoLink: 'https://youtu.be/D3iEE29ZXRM?si=TxXqIHlQfXBsKhES' },
    //                             { title: 'Learn CSS in 20 Minutes', videoLink: 'https://youtu.be/kGW8Al_cga4?si=xEncttcT-4XQthI-' },
    //                             { title: 'CSS Crash Course', videoLink: 'https://youtu.be/FMu2cKWD90g?si=fPWNXY1MDMmxdb3k' },
    //                         ]
    //                     }
    //                 },
    //             ]
    //         }
    //     }
    // });

    // await prisma.course.create({
    //     data: {
    //         title: 'Python Course',
    //         description: 'Dive into Python, a versatile and beginner-friendly programming language. This course covers essential topics such as variables, control structures, functions, and libraries. Whether you\'re interested in web development, data science, or automation, this course provides the skills needed to start coding in Python.',
    //         thumbnail_pic_link: 'https://imgs.search.brave.com/UYYANil0rAnZ5zGbqkQt7XeWYmjfgbCkY_1-XMGPqoE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy9pbWct/cHJhY3RpY2UvcHJv/ZC9jb3Vyc2VzLzI1/Ni9XZWIvQ29udGVu/dC9Db3Vyc2VfUHlo/dG9uX3Byb2dyYW1f/d2VicF8xNzE2Mzcx/NjA4LndlYnA',
    //         points_providing: 150,
    //         course_type: 'Advance Programming',
    //         certificate_preview_link: 'https://lh3.googleusercontent.com/d/14roQIB8ulxj6W2S_KQCpf9yc6Rl0lAEp=w1000?authuser=0',
    //         price: 2000,
    //         number_of_people_rated:500,
    //         course_level:"beginner",
    //         Rate: 4.2,
    //         Enrollment_Counts: 1500,
    //         chapters: {
    //             create: [
    //                 {
    //                     title: 'INTRODUCTION TO PYTHON',
    //                     videos: {
    //                         create: [
    //                             { title: 'Python Programming Tutorial for Beginners - Full Course', videoLink: 'https://youtu.be/rfscVS0vtbw?si=9tKJ9uQ54I2zOs1m' },
    //                             { title: 'Learn Python - Python Tutorial for Beginners', videoLink: 'https://youtu.be/YYXdXT2l-Gg?si=zuXnC4M3F5lJK02d' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'DATA TYPES AND VARIABLES',
    //                     videos: {
    //                         create: [
    //                             { title: 'Python Data Types Tutorial - Python Basics', videoLink: 'https://youtu.be/khKv-8q7YmY?si=wH8aB-cs-KKJ0U7q' },
    //                             { title: 'Understanding Python Variables - Python Programming', videoLink: 'https://youtu.be/x-1dtcTVNjo?si=4Tp7r8uETv8cRXYB' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'CONTROL STRUCTURES',
    //                     videos: {
    //                         create: [
    //                             { title: 'Python Control Structures - If Else Statements', videoLink: 'https://youtu.be/0z5Ykp0LFjs?si=3x1tKl8Y0bMyX9kd' },
    //                             { title: 'Loops in Python - For and While Loops', videoLink: 'https://youtu.be/8L_pB2q7d0g?si=Nz37lUEyfG9kbiZP' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'FUNCTIONS AND MODULES',
    //                     videos: {
    //                         create: [
    //                             { title: 'Functions in Python - Learn Python Functions', videoLink: 'https://youtu.be/9Os0o3wzS_I?si=1n2t0dDDxL5STZ9p' },
    //                             { title: 'Python Modules - Importing and Using Modules', videoLink: 'https://youtu.be/YWbOH0om4MA?si=knrHZHCP16Gmq8rl' },
    //                         ]
    //                     }
    //                 },
    //             ]
    //         }
    //     }
    // });

    // await prisma.course.create({
    //     data: {
    //         title: 'React Course',
    //         description: 'Build interactive user interfaces with React, a powerful JavaScript library for building dynamic web applications. This course covers React components, hooks, state management, and more. Ideal for developers looking to enhance their frontend skills with modern web development practices.',
    //         thumbnail_pic_link: 'https://imgs.search.brave.com/RksYdT2k0vsXOgXmy6s5k6rp7R9Ahrx7G1QYSpG6XeM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXJ0aWNsZS5pby9i/YWNrL2ltYWdlL2lt/YWdlL3ZpZGVvL2hv/dGtpbmctbG9vay1i/b3R0bGVkLXBvd2Vy/c2hpcGJjLWZ1bGwtaG9s/di1hbGktY3B4P3By/b3plYz1NMDM5NDgyOQ',
    //         points_providing: 200,
    //         course_type: 'Frontend Development',
    //         certificate_preview_link: 'https://lh3.googleusercontent.com/d/1g4T82gwjQeY3lHqsoOBQj_hR3PrwJHEa=w1000?authuser=0',
    //         price: 2500,
    //         number_of_people_rated:500,
    //         course_level:"advance",
    //         Rate: 4.5,
    //         Enrollment_Counts: 1000,
    //         chapters: {
    //             create: [
    //                 {
    //                     title: 'INTRODUCTION TO REACT',
    //                     videos: {
    //                         create: [
    //                             { title: 'React JS Crash Course', videoLink: 'https://youtu.be/dGcsHMXbSOA?si=wt7ANo5uOlnSgshs' },
    //                             { title: 'React Tutorial for Beginners', videoLink: 'https://youtu.be/J8EXrFQG9kE?si=mVHRKr3sIBkqUxlr' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'COMPONENTS AND PROPS',
    //                     videos: {
    //                         create: [
    //                             { title: 'React Components and Props', videoLink: 'https://youtu.be/m6bPAy6q7VE?si=B8rw1H8DCRlYx2Hz' },
    //                             { title: 'Understanding Props in React', videoLink: 'https://youtu.be/YZ6RGV3n7AE?si=J3G2F5eA5M3QWyxr' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'STATE MANAGEMENT',
    //                     videos: {
    //                         create: [
    //                             { title: 'React State Management with Hooks', videoLink: 'https://youtu.be/cZLP1H1is-M?si=46ktShw78m9FKhK7' },
    //                             { title: 'Managing State in React Apps', videoLink: 'https://youtu.be/xvS_t73l2P0?si=8ccEjRiCK8kG6XHp' },
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     title: 'ROUTING IN REACT',
    //                     videos: {
    //                         create: [
    //                             { title: 'React Router Tutorial', videoLink: 'https://youtu.be/0J2sOqOjw_Y?si=XN8WmScz4G3cbTrH' },
    //                             { title: 'React Routing and Navigation', videoLink: 'https://youtu.be/nCE7MW8Zqms?si=8M9J-VS1uD77Jj9o' },
    //                         ]
    //                     }
    //                 },
    //             ]
    //         }
    //     }
    // });
    
    const Digital_Marketing_Course = await prisma.course.create({
        data: {
          title: "Digital Marketing",
          course_type: "Business",
          description:
            "Learn the fundamentals of digital marketing and e-commerce to gain the skills needed to land an entry-level job .Measure marketing performance through analytics and present insights .Attract and engage customers through digital marketing channels like search and email .Build e-commerce stores, analyze online performance, and grow customer loyalty .",
          thumbnail_pic_link:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/31/57e51f7be543898f9fedd48fcd3baa/Intro-To-Digital-Marketing_CourseraGraphics_1200x1200.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
          certificate_preview_link:
            "https://lh3.googleusercontent.com/d/1OqQ9o89TjRLJY1PVPirm5cIo1CAVgG0S=w1000?authuser=0",
          number_of_people_rated: 450,
          course_level: "Basics",
          Rate: 4.8,
          points_providing: 100,
          Enrollment_Counts: 3524,
          price: 4000,
          chapters: {
            create: [
              {
                title: "Search Engine Marketing",
                videos: {
                  create: [
                    { title: "Keyword Research and Selection", videoLink: "https://youtu.be/bixR-KIJKYM?si=q9NxRfjyPDI8OrmX" },
                    { title: "Google Ads (AdWords)", videoLink: "https://youtu.be/5lIK9SNtrFA?si=rmG5jAdO6fViK65B" },
                    { title: "Copywriting", videoLink: "https://youtu.be/i2XzLO-8baQ?si=MkZqszTHV4cJXiBC" },
                  ],
                },
              },
              {
                title: "Communication with Customers",
                videos: {
                  create: [
                    { title: "Email Maketing", videoLink: "https://youtu.be/H8bGYARw_T8?si=KGbMPmsGj_DUTCCh" },
                    { title: "Social Media Marketing", videoLink: "https://youtu.be/KEirK5QWgrA?si=p8idPmDBZpsjzUDg " },
                  ],
                },
              },
              {
                title: "Content Marketing",
                videos: {
                  create: [
                    { title: "Content Marketing Strategy", videoLink: "https://youtu.be/6Oj6GoYrF-s?si=Eik9khjvWzrfiKcW" },
                    { title: "SEO-Driven Content  ", videoLink: "https://youtu.be/HeeUHugrG5U?si=L_yduzg4FwQl2qm5" },
                  ],
                },
              },
            ],
          },
        },
      });
    
      // Course 2: Project Management
      const Project_Management_Course = await prisma.course.create({
        data: {
          title: "Project Management",
          course_type: "Business",
          description:
            "Understand the stages of the project cycle .Monitor project activities and assess progress .Communicate proficiently to report project status .Develop and strengthen high performance teams .",
          thumbnail_pic_link:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/c7/4a9b1049ae11e4bc80b986c176101c/Project-Management-Course.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;q=25&amp;fit=fill",
          certificate_preview_link:
            "https://lh3.googleusercontent.com/d/1WsQkGXdH8vxp2z1uqTRn04-LZxaJ7291=w1000?authuser=0",
          number_of_people_rated: 1750,
          course_level: "Advanced",
          Rate: 4.2,
          points_providing: 50,
          Enrollment_Counts: 3000,
          price: 1700,
          chapters: {
            create: [
              {
                title: "Project Planning and Initiation",
                videos: {
                  create: [
                    { title: "Project Scope Definition", videoLink: "https://youtu.be/-AYM373MU-I?si=b8CBK092YhmGiXga" },
                    { title: "Scope Planning", videoLink: "https://youtu.be/KcsDTb-5n0I?si=TyVEwiUoNlM5r0S" },
                    { title: "Project Charter and Stakeholder Identification", videoLink: "https://youtu.be/aIIJ4IF3INk?si=ZfzbI5NH8n2kY_7s" },
                    { title: "Risk Management", videoLink: "https://youtu.be/kv2luB2pbBs?si=cwCc7B7x8M_kKVdG" },
                  ],
                },
              },
              {
                title: "Project Execution and Resource Management",
                videos: {
                  create: [
                    { title: "Team Building and Role Assignment", videoLink: "https://youtu.be/GrF_y9oSCIk?si=UJdhfYdwC5xTMhQA" },
                    { title: "Non financial resources", videoLink: "https://youtu.be/Iy1wFuaNnRs?si=VQFRkMVF0Uh15A5N" },
                    { title: "Quality Control", videoLink: "https://youtu.be/teer-Ha0c7I?si=qXAzVjlP8g8QIgWP" },
                  ],
                },
              },
            ],
          },
        },
      });
    
      // Course 3: Business Strategy
      const Business_Strategy_Course = await prisma.course.create({
        data: {
          title: "Excel Skills for Business",
          course_type: "Business",
          description: "Learn essential Excel skills for business, including basic and advanced functionalities, data analysis, and visualization techniques.",
          thumbnail_pic_link:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d2j5ihb19pt1hq.cloudfront.net/sdp_page/s12n_logos/UVA_Businessstrategy_Getty183489780.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
          certificate_preview_link:
            "https://example.com/excel-certificate.jpg",
          number_of_people_rated: 1300,
          course_level: "Intermediate",
          Rate: 4.2,
          points_providing: 40,
          Enrollment_Counts: 8500,
          price: 1700,
          chapters: {
            create: [
              {
                title: "Excel Basics and Fundamentals",
                videos: {
                  create: [
                    { title: "MS Excel| Introduction", "videoLink": "https://youtu.be/-ujVQzTtxSg?si=ONrc6VmWK5zm8fKi" },
                    { title: "MS Excel - Tabs & Groups", "videoLink": "https://youtu.be/diWl_7obZjA?si=qNkEjYde_U14U-8O" },
                    { title: "MS Excel - Editing Data", "videoLink": "https://youtu.be/ZnXYEljrelM?si=pFwv15-BtEm6xTx8" }
                  ]
                }
              },
              {
                title: "Data Analysis and Visualization",
                videos: {
                  create: [
                    { title: "MS Excel - Pivot Table", "videoLink": "https://youtu.be/4PWVFBiFVVU?si=ePJRbAwG0lmM_4-A" },
                    { title: "MS Excel - Conditional Formatting", "videoLink": "https://youtu.be/AYSW7N3Sh0c?si=3tcy2HIBpvuHUlsk" }
                  ]
                }
              },
              {
                title: "Advanced Excel Techniques for Business",
                videos: {
                  create: [
                    { title: "MS Excel - Hyperlink to Webpage", "videoLink": "https://youtu.be/Iq8yiUNtNqI?si=YnPauxP2iHIa39YT" },
                    { title: "MS Excel - Data Validation", "videoLink": "https://youtu.be/nMxl1_NAcxc?si=ercsro5WSTf0do0g" },
                    { title: "MS Excel - Protect Workbook", "videoLink": "https://youtu.be/nMxl1_NAcxc?si=s1PK8jd4tJVw-nVt" }
                  ]
                }
              }
            ]
          }
        },
      });
    
      // Course 3: Meta Data Analyst Professional
      const Meta_Data_Analyst_Professional_Course = await prisma.course.create({
        data: {
          title: "Meta Data Analyst Professional",
          course_type: "Business",
          description: "Collect, clean, sort, evaluate, and visualize data . Apply the OSEMN, framework to guide the data analysis process, ensuring a comprehensive and structured approach to deriving actionable insights.Use statistical analysis, including hypothesis testing, regression analysis, and more, to make data-driven decisions .",
          thumbnail_pic_link:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/63/baf9bea98641aeb8fd36a7b1291791/DA-PC_Image.jpg?auto=format%2Ccompress&amp;dpr=1&amp;w=330&amp;h=330&amp;fit=fill&amp;q=25",
          certificate_preview_link: "https://example.com/excel-certificate.jpg",
          number_of_people_rated: 800,
          course_level: "Advanced",
          Rate: 4.4,
          points_providing: 40,
          Enrollment_Counts: 1300,
          price: 5000,
          chapters: {
            create: [
              {
                title: "Introduction to Data Analysis",
                videos: {
                  create: [
                    { title: "Understanding Data Analytics", "videoLink": "https://youtu.be/KlsYCECWEWE?si=jKI8NR6H_UzQVSsF" },
                    { title: "Data Analyst Interview Questions", "videoLink": "https://youtu.be/Y6175TGFuMI?si=EjlnVz6gMJDxTlT_" },
                  ]
                }
              },
              {
                title: "Time Series",
                videos: {
                  create: [
                    { title: "R Tutorial", "videoLink": "https://youtu.be/4PWVFBiFVVU?si=ePJRbAwG0lmM_4-A" },
                    { title: "Time Series Analysis In R", "videoLink": "https://youtu.be/iTq6fNfi4Rs?si=J5HAy6RYpH44oK9u" }
                  ]
                }
              },
              {
                title: "Data Analysis Tools and Techniques",
                videos: {
                  create: [
                    { title: "Data Analytics With Python", "videoLink": "https://youtu.be/W1dzfYW4-KQ?si=2Knse0PxRmprG8wu" },
                    { title: "SQL Project For Data Analysis", "videoLink": "https://youtu.be/SAWiIV12sU4?si=Tx6fY-9acU-FN6GT" }
                  ]
                }
              }
            ]
          }
        },
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
