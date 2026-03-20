import SEO from '../components/Seo';
<SEO
  title="AI Mock Interview"
  description="Practice interviews with AI. Get instant feedback, scores and improvement tips."
  url="https://mocktalk.vercel.app"
/>
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Section from '../components/Section';
import Login from '../components/Login';

// Lazy-loaded components
const Discover = lazy(() => import('../components/Discover'));
const Tools = lazy(() => import('../components/Tools'));
const UserReview = lazy(() => import('../components/UserReview'));
const Blog = lazy(() => import('../components/Blog'));
const FAQ = lazy(() => import('../components/FAQ'));
const Footer = lazy(() => import('../components/Footer'));

const LandingPage = ({ setIsLoggedIn, isLoggedIn }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/interview');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {/* Always-loaded components */}
      <Header setIsLoginOpen={setIsLoginOpen} />
      <Section setIsLoginOpen={setIsLoginOpen} />

      {/* Lazy-loaded components */}
      <Suspense fallback={<div className="loading text-center py-5">Loading...</div>}>
        <Discover />
        <Tools setIsLoginOpen={setIsLoginOpen} />
        <UserReview />
        <Blog />
        <FAQ />
        <Footer />
      </Suspense>

      {/* Login Modal */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default LandingPage;
