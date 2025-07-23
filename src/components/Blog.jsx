import React from "react";
import "../css/blog.css"; // Keep your styles here

const Blog = () => {
  const blogs = [
    {
      img: "https://fyx.ai/media/blog_backgrounds/ATWIN_20250212181704_Aipowered.png",
      tag: "AI Insights",
      date: "February 12, 2025",
      title: "How MockTalk Uses AI to Transform Interview Preparation",
      link: "/blog_detail/ai-interview-prep/",
    },
    {
      img: "https://fyx.ai/media/blog_backgrounds/ATWIN_20250212181438_viral.jpg",
      tag: "Tech Trends",
      date: "March 5, 2025",
      title: "Can MockTalk Simulate Real Interview Pressure? Here's the Answer",
      link: "/blog_detail/mocktalk-real-simulation/",
    },
    {
      img: "https://fyx.ai/media/blog_backgrounds/ATWIN_20250212181128_howaiknowsbetter.jpeg",
      tag: "Education",
      date: "April 1, 2025",
      title: "From Nervous to Confident: How Students Benefit from MockTalk",
      link: "/blog_detail/confidence-through-ai/",
    },
  ];

  return (
    <section className="py-5 bg-white text-dark">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-primary">From the MockTalk Blog</h2>
          <p className="fs-5 text-secondary">
            Explore insights, success stories, and the tech behind better interviews.
          </p>
        </div>

        <div className="row g-4">
          {blogs.map((blog, index) => (
            <div className="col-md-4" key={index}>
              <a href={blog.link} className="text-decoration-none text-dark">
                <div className="card border-0 rounded-4 overflow-hidden blog-hover shadow-sm">
                  <div className="position-relative">
                    <img
                      src={blog.img}
                      alt="Blog"
                      className="img-fluid w-100 blog-img"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-light"></div>
                  </div>
                  <div className="card-body bg-white">
                    <div className="d-flex small text-muted mb-2">
                      <div className="text-primary text-uppercase fw-semibold">{blog.tag}</div>
                      <span className="mx-2">•</span>
                      <span>{blog.date}</span>
                    </div>
                    <h5 className="fw-bold blog-title">{blog.title}</h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
