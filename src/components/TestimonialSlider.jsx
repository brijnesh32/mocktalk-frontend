import React, { useState } from "react";
import "../css/TestimonialSlider.css";

const testimonials = [
  {
    name: "Arjun Kapoor",
    role: "Software Engineer Aspirant",
    text: `MockTalk helped me land my first interview confidently. Practicing with the AI felt so real—it taught me where I stammered and gave instant tips.`,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sakshi Verma",
    role: "Recent CS Graduate",
    text: `Every session felt like the real thing! The instant analysis and AI questions really helped me prepare. MockTalk is a must-have for job seekers.`,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ravi Sharma",
    role: "Final Year B.Tech Student",
    text: `I practiced daily with MockTalk. It boosted my confidence, fixed my tone, and helped me understand what interviewers really look for.`,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-5 bg-light text-dark">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">MockTalk User <span className="text-primary">Testimonials</span></h2>
          <p className="text-muted">Hear how MockTalk is transforming interview preparation for aspiring professionals.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card p-4 border-0 shadow-lg text-center rounded-4">
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="testimonial-img mx-auto mb-4"
              />
              <blockquote className="blockquote mb-4 fs-5 fst-italic">
                “{testimonials[index].text}”
              </blockquote>
              <h5 className="mb-1">{testimonials[index].name}</h5>
              <small className="text-muted">{testimonials[index].role}</small>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                onClick={handlePrev}
                className="btn btn-outline-primary custom-btn"
              >
                ‹ Prev
              </button>
              <button
                onClick={handleNext}
                className="btn btn-primary custom-btn"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
