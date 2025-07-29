import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Section from '../components/Section';
import Discover from '../components/Discover';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Tools from '../components/Tools';
import UserReview from '../components/UserReview';

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
      <Header setIsLoginOpen={setIsLoginOpen} />
      <Section  setIsLoginOpen={setIsLoginOpen}/>
      <Discover />
      <Tools  setIsLoginOpen={setIsLoginOpen}/>
      <UserReview />
      <Blog />
      <FAQ />
      <Footer />
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default LandingPage;
