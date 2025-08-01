import React from "react";
import "../css/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row g-4 justify-content-between align-items-start">

          {/* Logo & Intro */}
          <div className="col-md-4 aos-fade">
            <h4 className="fw-bold text-white mb-3">
              MockTalk<span className="text-primary">.AI</span>
            </h4>
            <p className="text-secondary">
              Your smart AI interview assistant. Practice like a pro, improve in real-time, and crack your dream job.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 col-lg-3 aos-fade">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/blognew" className="footer-link">Blog</a></li>
              <li><a href="docs/" className="footer-link">FAQs</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-4 aos-fade">
            <h5 className="text-white mb-3">Follow Us</h5>
            <div className="d-flex gap-3 social-icons">
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
              <a href="#"><i className="bi bi-github"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} MockTalk.AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
