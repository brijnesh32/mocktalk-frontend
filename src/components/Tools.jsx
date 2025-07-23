import React from "react";
import "../css/Tools.css"; // optional custom CSS
import Forming from "../assets/images/formimg.png";
import interv from "../assets/images/interv.png";
import report from"../assets/images/report.jpg";


const Tools = ({setIsLoginOpen}) => {
  
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center fw-bold text-primary mb-5 display-5">
          Introducing <br /> MockTalk.AI Ad Tools
        </h2>

        {/* Tool 1: Headline Generator */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src= {Forming}
              alt="Headline Generator"
              className="img-fluid rounded-4 shadow tool-img"
              style={{ height: "25rem", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold text-primary">Ace Your Next Interview<br />with AI-Powered Precision</h3>
            <p className="text-muted fs-5">
              Craft personalized interview questions in seconds. MockTalk analyzes your role, experience, and education to generate realistic, role-specific questions that mirror real-world interviews.Say goodbye to generic prep — and hello to tailored mock sessions that boost your confidence and performance.
            </p>
            <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary px-4 py-2 fw-semibold shadow-sm">
              Try Now
            </button>
          </div>
        </div>

        {/* Tool 2: Facebook Ad Mockup */}
        <div className="row align-items-center flex-md-row-reverse mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={interv}
              alt="Facebook Ad Mockup"
              className="img-fluid rounded-4 shadow tool-img"
              style={{ height: "25rem", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold text-primary">Instant<br />Interview Previews</h3>
            <p className="text-muted fs-5">
              Simulate your interview experience before it begins. With MockTalk’s real-time preview, you can test how your questions will be asked, adjust your tone, and prepare mentally — all with integrated mic and speaker controls.Practice speaking your answers aloud and get comfortable with AI-driven interview dynamics, ensuring you're fully prepared when it counts.
            </p>
            <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary px-4 py-2 fw-semibold shadow-sm">
              Try Now
            </button>
          </div>
        </div>

        {/* Tool 3: Video Ad Analyzer */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={report}
              alt="Video Ad Analyzer"
              className="img-fluid rounded-4 shadow tool-img"
              style={{ height: "25rem", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold text-primary">Get Smart Feedback <br />After Every Interview</h3>
            <p className="text-muted fs-5">
              Upload your interview session or complete a live AI round — and let MockTalk break it down. Our AI pinpoints your strongest and weakest responses, suggests areas for improvement, and even analyzes voice clarity, tone, and speaking pace using your mic input.
With speaker-enabled playback and real-time scoring, every session becomes a learning opportunity driven by data.
            </p>
            <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary px-4 py-2 fw-semibold shadow-sm">
              Try Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
