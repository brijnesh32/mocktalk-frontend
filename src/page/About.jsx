// src/page/About.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/About.css';
import { useState} from 'react';
import Login from '../components/Login'; // Import your login modal

const About = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <Header setIsLoginOpen={setIsLoginOpen} />
      <div className="about-section">
        <div className="about-hero bg-gradient-primary">
          <div className="container text-center py-5">
            <h1 className="display-4 fw-bold text-white mb-4">About <span className="text-highlight"> <span> </span> MockTalk.AI</span></h1>
            <p className="lead text-light opacity-85">
              Your smart interview companion that helps you practice, improve, and excel in your career journey.
            </p>
          </div>
        </div>

        <div className="container py-5">
          <div className="row align-items-center g-5 py-4">
            <div className="col-lg-6">
              <div className="pe-lg-5">
                <span className="badge bg-primary-soft mb-3">Our Origin</span>
                <h2 className="display-6 fw-bold mb-4">Bridging the gap in interview preparation</h2>
                <p className="lead mb-4">
                  In 2024, we identified a critical need in the job market - candidates lacked effective tools to prepare for the new era of AI-driven interviews.
                </p>
                <p>
                  MockTalk.AI was created by a team of engineers and HR professionals who understood both the technical and human aspects of the hiring process. 
                  We combined these insights to build a platform that offers realistic, adaptive mock interviews with intelligent feedback.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-img-container p-4">
                <img 
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20230321164453/Inter-Questions-in-Computer-Metwork.png" 
                  alt="Interview preparation network" 
                  className="img-fluid rounded-3 shadow-lg" 
                />
              </div>
            </div>
          </div>

          <div className="row align-items-center g-5 py-5 flex-lg-row-reverse">
            <div className="col-lg-6">
              <div className="ps-lg-5">
                <span className="badge bg-success-soft mb-3">Our Purpose</span>
                <h2 className="display-6 fw-bold mb-4">Empowering candidates through technology</h2>
                <p className="lead mb-4">
                  We believe everyone deserves the opportunity to present their best self during interviews.
                </p>
                <p>
                  Our mission is to democratize interview preparation by providing accessible, intelligent tools that help candidates 
                  understand their strengths, identify areas for improvement, and develop confidence through practice. We're not just 
                  preparing people for interviews - we're helping them unlock their career potential.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-img-container p-4">
                <img 
                  src="https://impress.ai/wp-content/uploads/2023/11/impress.ai-AI-based-end-to-end-recruitment-platform-offers-builtin-analytics-for-candidates-and-recruiters-2.png" 
                  alt="Mission values" 
                  className="img-fluid rounded-3 shadow-lg" 
                />
              </div>
            </div>
          </div>

          <div className="py-5 my-4">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="icon-lg bg-primary-soft text-primary rounded-3 mb-4">
                       <i className="bi bi-lightning-charge-fill"></i>
                    </div>
                    <h3 className="h4">Real-time Feedback</h3>
                    <p className="mb-0">
                      Get instant analysis on your responses, tone, and content to improve immediately.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="icon-lg bg-success-soft text-success rounded-3 mb-4">
                       <i className="bi bi-robot"></i>
                    </div>
                    <h3 className="h4">AI-Powered Simulations</h3>
                    <p className="mb-0">
                      Practice with intelligent mock interviews tailored to your target role and experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="icon-lg bg-info-soft text-info rounded-3 mb-4">
                       <i className="bi bi-graph-up-arrow"></i> 
                    </div>
                    <h3 className="h4">Progress Tracking</h3>
                    <p className="mb-0">
                      Monitor your improvement over time with detailed analytics and reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default About;