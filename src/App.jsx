// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './page/LandingPage';
import InterviewBot from './page/InterviewBot';
import About from './page/About';
import Blog from './page/Blog';
import BlogDetail from './page/BlogDetail';
import Docs from './page/Docs';
import Contact from './page/Contact';

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let logoutTimer;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setLoading(false);

        logoutTimer = setTimeout(() => {
          signOut(auth);
          alert("⏳ Session expired. You've been logged out.");
          window.location.href = '/';
        }, 30 * 60 * 1000);
      } else {
        setIsLoggedIn(false);
        setLoading(false);
        if (logoutTimer) clearTimeout(logoutTimer);
      }
    });

    return () => {
      unsubscribe();
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About  />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Blog Pages */}
        <Route path="/blognew" element={<Blog />} />
        <Route path="/blognew/:id" element={<BlogDetail />} />


        {/* Protected Route */}
        <Route path="/interview/*" element={isLoggedIn ? <InterviewBot /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
