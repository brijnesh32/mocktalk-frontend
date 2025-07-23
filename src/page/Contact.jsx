// src/page/Contact.jsx
import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Contact.css'
import Login from '../components/Login'; // Import your login modal

const Contact = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
       <Header setIsLoginOpen={setIsLoginOpen} />
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero bg-primary text-white py-5">
          <div className="container py-4">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-4">Get in Touch</h1>
                <p className="lead mb-4">
                  We'd love to hear from you! Whether you have questions about our services or just want to say hello, 
                  our team is ready to assist you.
                </p>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-envelope-fill fs-4 me-3"></i>
                  <span>support@mocktalk.ai</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-telephone-fill fs-4 me-3"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill fs-4 me-3"></i>
                  <span>123 AI Street, Tech Valley, CA 94025</span>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <img 
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Contact us" 
                  className="img-fluid rounded shadow contact-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4 p-md-5">
                    <h2 className="text-center mb-4">Send us a message</h2>
                    <form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="firstName" className="form-label">First Name</label>
                          <input type="text" className="form-control" id="firstName" required />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input type="text" className="form-control" id="lastName" required />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="col-12">
                          <label htmlFor="subject" className="form-label">Subject</label>
                          <input type="text" className="form-control" id="subject" required />
                        </div>
                        <div className="col-12">
                          <label htmlFor="message" className="form-label">Message</label>
                          <textarea className="form-control" id="message" rows="5" required></textarea>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary btn-lg w-100 submit-btn">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section py-5 bg-white">
          <div className="container">
            <h2 className="text-center mb-5">Frequently Asked Questions</h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="accordion" id="faqAccordion">
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h3 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        How quickly can I expect a response?
                      </button>
                    </h3>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Our team typically responds within 24-48 hours during business days. For urgent matters, please call our support line.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h3 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        Do you offer enterprise solutions?
                      </button>
                    </h3>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Yes! We have customized enterprise packages. Please mention your requirements in your message and our sales team will get back to you.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0 shadow-sm">
                    <h3 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                        Where can I find documentation?
                      </button>
                    </h3>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Our full documentation is available at docs.mocktalk.ai. If you can't find what you're looking for, feel free to ask us directly!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Contact;