  import React from 'react'
import { Link } from 'react-router-dom'
import TeamSection from './TeamSection'
const About = () => {
  return (
    <div>
      <TeamSection/>
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>About Us</h2>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
              <p>
                We are a passionate team of students dedicated to making high-quality education available to everyone, everywhere. Our diverse interests and experiences allow us to create a dynamic learning environment that fosters growth and curiosity.
              </p>
              <p>
                As students, we understand the challenges and opportunities that come with learning in today's digital age. Our journey began with a shared vision to create a space where knowledge is easily accessible, learning is enjoyable, and education is tailored to meet the diverse needs of all students. With this goal in mind, we combined our skills and passions to build Skillbridge.
              </p>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <p>Our mission is to revolutionize the way people access and experience education by providing a comprehensive and engaging online learning platform. We believe that education should be accessible, flexible, and tailored to the needs of each learner. </p>
              <Link to="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  )
}

export default About