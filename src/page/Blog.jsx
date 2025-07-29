// src/page/Blog.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';
import { useState } from 'react';
import Login from '../components/Login'; // Import your login modal


const Blog = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <Header setIsLoginOpen={setIsLoginOpen} />
      <div className="container mt-5 pt-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">
            <span className="text-primary">Our</span> Blog
          </h1>
          <p className="lead text-muted">
            Welcome to the MockTalk blog section. Stay tuned for updates and insights!
          </p>
        </div>

        <div className="row g-4">
          {blogPosts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={post.image} 
                    className="card-img-top img-fluid" 
                    alt={post.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-img-overlay d-flex align-items-end p-0">
                    <span className="badge bg-primary bg-opacity-75 text-white rounded-pill px-3 py-2 ms-auto me-3 mb-3">
                      {post.category || 'General'}
                    </span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <small className="text-muted me-3">
                      <i className="far fa-calendar-alt me-2"></i>
                      {post.date || new Date().toLocaleDateString()}
                    </small>
                    <small className="text-muted">
                      <i className="far fa-clock me-2"></i>
                      {post.readTime || '5 min read'}
                    </small>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                  <p className="card-text text-secondary flex-grow-1 mb-4">
                    {post.description}
                  </p>
                  <Link 
                    to={`/blognew/${post.id}`} 
                    className="btn btn-outline-primary align-self-start mt-auto"
                  >
                    Read More <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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

export default Blog;