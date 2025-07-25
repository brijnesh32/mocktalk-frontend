import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import "../css/SiderBar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [compact, setCompact] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For slide-in on mobile

  // Global initial setup
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user?.photoURL) setProfileImage(user.photoURL);

    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setSidebarOpen(false); // reset open on resize to desktop
    };

    const onFullScreenChange = () => setIsFullscreen(!!document.fullscreenElement);

    window.addEventListener("resize", handleResize);
    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    const el = document.documentElement;
    document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
  };

  const handleToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      const newCompact = !compact;
      setCompact(newCompact);
      window.dispatchEvent(new CustomEvent("sidebarToggle", { detail: newCompact }));
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      await signOut(auth);
      alert("You have been logged out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false); // hide sidebar after click
    }
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll(".sidebar .nav-link");
    navLinks.forEach((link) => link.addEventListener("click", handleNavClick));
    return () => {
      navLinks.forEach((link) => link.removeEventListener("click", handleNavClick));
    };
  }, [isMobile]);

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${compact ? "compact" : ""} ${isMobile && sidebarOpen ? "open" : ""}`}>
        <h2><i className="bi bi-robot me-2"></i>{!compact && "MockTalk.AI"}</h2>
        <ul>
          {[
            { to: "/interview", icon: "person-lines-fill", label: "Candidate" },
            { to: "/interview/Ai-Bot", icon: "robot", label: "InterviewAI" },
            { to: "/interview/report-Card", icon: "clipboard2-data", label: "Report" },
            { to: "/interview/Candidate-Reports", icon: "journals", label: "Candidate Reports" }
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <Link to={to} className="nav-link">
                <i className={`bi bi-${icon} me-2`}></i>{!compact && label}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className="logout">
          <i className="bi bi-box-arrow-right me-2"></i>{!compact && "Logout"}
        </button>
      </div>

      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="d-flex align-items-center justify-content-between w-100">
          <button className="btn-balance" onClick={handleToggle}>
            <i className="lni lni-text-align-left" style={{ fontSize: 24, color: "white" }}>☰</i>
          </button>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-light btn-sm" onClick={toggleFullScreen} title="Toggle Fullscreen">
              <i className={`bi ${isFullscreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"}`}></i>
            </button>
            <Link to="#" className="profile-link">
              {profileImage
                ? <img src={profileImage} alt="User" className="profile-img mt-1" />
                : <i className="bi bi-person-circle fs-4 text-white"></i>}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
