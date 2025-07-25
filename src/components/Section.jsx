import React from "react";
import "../css/Section.css";

const Section = ({setIsLoginOpen}) => {
  return (
    <div className="mocktalk-bg text-center text-dark py-5 px-3 position-relative">
      <div className="container position-relative z-1 margin-top">
        {/* Headline */}
        <h2 className="fw-bold display-6">
          Ace Your Interviews Faster with <br />
          <span className="mocktalk-color text-decoration-underline">
            AI-Powered
          </span>{" "}
          Mock Sessions!
        </h2>

        {/* Tagline */}
        <p className="mt-3 fs-5 fst-italic">Mock. Master. Succeed.</p>

        {/* Star Rating */}
        <div className="mt-3">
          <span className="text-warning fs-3">★★★★☆</span>
          <p className="fw-semibold fs-5 mt-1">
            4.1 rating from <strong>1059</strong> users
          </p>
        </div>

        {/* User Avatars */}
<div className="d-flex justify-content-center align-items-center mt-3">
  {[
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/65.jpg",
    "https://randomuser.me/api/portraits/men/76.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
    
  ].map((url, index) => (
    <img
      key={index}
      src={url}
      className={`avatar-img ${index > 0 ? "avatar-stack" : ""}`}
      alt={`user${index + 1}`}
    />
  ))}

  <div className="avatar-img avatar-stack bg-primary text-white d-flex justify-content-center align-items-center fw-bold">
    +99
  </div>
</div>

        {/* Action Buttons */}
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <button type="button" className="btn btn-primary" onClick={() => setIsLoginOpen(true)}>
            Get Started
          </button>
          <button type="button" className="btn btn-outline-secondary"onClick={() => window.location.href = "https://mocktalk-frontend-2tiv.vercel.app/docs/"}>
            Learn More
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section;
