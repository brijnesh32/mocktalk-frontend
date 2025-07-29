// src/App.js
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const InterviewBot = lazy(() => import('./page/InterviewBot'));
const LandingPage = lazy(() => import('./page/LandingPage'));
const About = lazy(() => import('./page/About'));
const Blog = lazy(() => import('./page/Blog'));
const BlogDetail = lazy(() => import('./page/BlogDetail'));
const Docs = lazy(() => import('./page/Docs'));
const Contact = lazy(() => import('./page/Contact'));

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// ✅ Import custom loading component
import Loading from './components/Loading'

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

  // ✅ Show loading screen until auth state is known
  if (loading) return <Loading />;

  return (
    <Router>
      {/* ✅ Show custom spinner while lazy components load */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/contact" element={<Contact />} />

          {/* Blog Pages */}
          <Route path="/blognew" element={<Blog />} />
          <Route path="/blognew/:id" element={<BlogDetail />} />

          {/* Protected Route */}
          <Route path="/interview/*" element={isLoggedIn ? <InterviewBot /> : <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
