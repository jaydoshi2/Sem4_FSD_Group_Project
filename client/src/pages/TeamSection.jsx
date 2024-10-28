import React from "react";
import WP1 from '../assets/images/sampleprofile.png';
import '../styles/TeamSection.css'
// import NavBar from "../components/Navbar";
// import Footer from "../components/Footer";
// 
const TeamSection = () => {
    return (
        <>
            <section id="team" className="team section" data-aos="fade-up">
                {/* Section Title */}
                <div className="container section-title">
                    <h2>Team</h2>
                    <p>
                        We Are Computer Science Students Currently In Our Fourth Semester Dedicated To Tackling Coding Challenges And Projects Together.
                    </p>
                </div>
                <div className="container">
                    <div className="row gy-4">
                        <section className="team" id="team1">
                            <div className="box-container" data-aos="fade-up">
                                <div className="box">
                                    <div className="image">
                                        <img src={WP1} alt="my image" />
                                        <div className="share">
                                            <a href="#" className="fab fa-facebook-f"></a>
                                            <a href="#" className="fab fa-twitter"></a>
                                            <a href="#" className="fab fa-instagram"></a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Kavya Trivedi</h3>
                                        <span>Member 1</span>
                                    </div>
                                </div>

                                <div className="box">
                                    <div className="image">
                                        <img src={WP1} alt=" my image" />
                                        <div className="share">
                                            <a href="#" className="fab fa-facebook-f"></a>
                                            <a href="#" className="fab fa-twitter"></a>
                                            <a href="#" className="fab fa-instagram"></a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Archan Patel</h3>
                                        <span>Member 2</span>
                                    </div>
                                </div>

                                <div className="box">
                                    <div className="image">
                                        <img src={WP1} alt="my image" />
                                        <div className="share">
                                            <a href="#" className="fab fa-facebook-f"></a>
                                            <a href="#" className="fab fa-twitter"></a>
                                            <a href="#" className="fab fa-instagram"></a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Jay Pandya</h3>
                                        <span>Member 3</span>
                                    </div>
                                </div>

                                <div className="box">
                                    <div className="image">
                                        <img src={WP1} alt="my image" />
                                        <div className="share">
                                            <a href="#" className="fab fa-facebook-f"></a>
                                            <a href="#" className="fab fa-twitter"></a>
                                            <a href="#" className="fab fa-instagram"></a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Jay Doshi</h3>
                                        <span>Member 4</span>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="image">
                                        <img src={WP1} alt="my image" />
                                        <div className="share">
                                            <a href="#" className="fab fa-facebook-f"></a>
                                            <a href="#" className="fab fa-twitter"></a>
                                            <a href="#" className="fab fa-instagram"></a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Kirtan Patel</h3>
                                        <span>Member 5</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamSection;