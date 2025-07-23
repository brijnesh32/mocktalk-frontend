import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import '../css/login.css';

const Login = ({ isOpen, onClose, setIsLoggedIn }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      setIsLoggedIn(true);
      onClose();
      navigate('/interview');
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("✅ Facebook Login User:", result.user);
      setIsLoggedIn(true);
      onClose();
      navigate('/interview');
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box text-center">
        <button className="close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <h2>
          Welcome to <span className="brand">MockTalk.AI</span>
        </h2>

        <button className="login-btn google" onClick={loginWithGoogle}>
          <i className="bi bi-google icon"></i> Login with Google
        </button>

        <button className="login-btn facebook" onClick={loginWithFacebook}>
          <i className="bi bi-facebook icon"></i> Login with Facebook
        </button>

        <button className="login-btn signup">New User? Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
