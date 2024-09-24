import React from 'react'
import { useRef } from 'react'
import '../styles/Home.css'
import {Link} from 'react-router-dom'
import webLogo from '../assets/images/profile.png'
import myimg from '../assets/images/profile.png'
const NavBar = () => {
  const mobileNavToggleBtn = useRef(null);

    return (
        <header
        id="header"
        className="header d-flex align-items-center fixed-top"
        >
            <div className="container-fluid container-xl position-relative d-flex align-items-center">
                <Link to="/" className="logo d-flex align-items-center me-auto">
                    <img src={webLogo} alt="" />
                    <h1 className="sitename">Project</h1>
                </Link>
                <div>
                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li>
                                <Link to="/" className="active">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/courses">Courses</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <i
                            ref={mobileNavToggleBtn}
                            className="mobile-nav-toggle d-xl-none bi bi-list"
                        ></i>
                    </nav>
                </div>
                <Link className="btn-getstarted" to="#about">
                  Login
                </Link>
            </div>
      </header>
    )
}

export default NavBar
