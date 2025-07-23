import React, { useState } from "react";
import "../css/FAQ.css"; // Make sure this file exists or change the path accordingly


const faqs = [
  {
    question: "How does MockTalk improve my interview performance?",
    answer:
      "MockTalk analyzes your responses using AI, gives real-time feedback on content, tone, and delivery, and helps you master behavioral and technical questions.",
  },
  {
    question: "Can MockTalk simulate real interview scenarios?",
    answer:
      "Yes! MockTalk mimics real-world interview formats including HR rounds, technical panels, and even system design interviews.",
  },
  {
    question: "Is my data secure on MockTalk?",
    answer:
      "Absolutely. We encrypt all data end-to-end and never share your recordings or transcripts with anyone.",
  },
  {
    question: "Can I customize interview questions?",
    answer:
      "You can upload job descriptions or select question categories to tailor your interview experience.",
  },
  {
    question: "How soon do I see improvements?",
    answer:
      "Many users report improved confidence and structure within just 3–5 sessions using MockTalk.",
  },
  {
    question: "Does MockTalk support feedback from mentors?",
    answer:
      "Yes. You can share your recorded sessions with mentors or peers to get additional feedback.",
  },
  {
    question: "Do I need a subscription to access all features?",
    answer:
      "You can get started for free. Premium plans unlock advanced analytics, unlimited mock sessions, and mentor feedback tools.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="container py-5" id="faqs">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Frequently Asked Questions</h2>
        <p className="text-muted">
          If your query isn't listed, email us at{" "}
          <a href="mailto:info@mocktalk.ai" className="text-primary fw-medium">
            info@mocktalk.ai
          </a>{" "}
          and we'll get back to you quickly.
        </p>
      </div>

      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item mb-3 border rounded shadow-sm" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                type="button"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
