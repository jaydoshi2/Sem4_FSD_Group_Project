import React from 'react';
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li><a href="#">what we offer</a></li>
              <li><a href="#">careers</a></li>
              <li><a href="#">professional certificates</a></li>
              <li><a href="#">for enterprise</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>community</h4>
            <ul>
              <li><a href="#">learners</a></li>
              <li><a href="#">partners</a></li>
              <li><a href="#">beta testers</a></li>
              <li><a href="#">blog</a></li>
              <li><a href="#">teaching center</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>more</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
