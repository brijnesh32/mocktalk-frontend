// src/page/BlogDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blogPosts from '../data/blogData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Blogs.css';

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id.toString() === id);

  if (!post) {
    return (
      <>
        <Header />
        <div className="container mt-5 pt-5">
          <div className="text-center py-5 my-5">
            <h2 className="display-4 fw-bold text-danger mb-4">404</h2>
            <h3 className="mb-4">Blog post not found</h3>
            <Link to="/blognew" className="btn btn-primary px-4 py-2">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <article className="col-lg-8">
            <div className="mb-4">
              <span className="badge text-white bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3">
                {post.category || 'General'}
              </span>
              <h1 className="display-5 fw-bold mb-3">{post.title}</h1>
              <div className="d-flex align-items-center mb-4">
                <small className="text-muted me-3">
                  <i className="far fa-calendar-alt me-2"></i>
                  {post.date || new Date().toLocaleDateString()}
                </small>
                <small className="text-muted">
                  <i className="far fa-clock me-2"></i>
                  {post.readTime || '5 min read'}
                </small>
              </div>
            </div>

            <div className="mb-5">
              <img 
                src={post.image} 
                alt={post.title} 
                className="img-fluid rounded-3 shadow-sm mb-4 w-100" 
              />
              <div className="blog-content">
                {post.content}
              </div>
            </div>

            <div className="d-flex justify-content-between border-top pt-4 mt-4">
              <Link to="/blognew" className="btn btn-outline-secondary px-4">
                <i className="fas fa-arrow-left me-2"></i> Back to Blog
              </Link>
              <div className="d-flex">
                {post.tags?.map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark me-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;