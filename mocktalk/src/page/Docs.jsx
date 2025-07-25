import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Forming from "../assets/images/formimg.png";
import interv from "../assets/images/interv.png";
import report from"../assets/images/report.jpg";
import reports from "../assets/images/reports.png"
import Login from '../components/Login'; // Import your login modal


import "../css/Docs.css"
const Docs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // Check window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-close sidebar when resizing to larger screens
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Toggle body scroll lock
    document.body.classList.toggle('sidebar-open', !sidebarOpen);
  };

  // All documentation sections in a DRY array
  const sections = [
    {
      id: 'Fill-Form-Properly',
      title: 'Fill Form Properly',
      icon: 'bi bi-clipboard-check',
      gif: Forming,
      alt: 'Fill-Form-Properly',
      category: 'Getting Started',
      steps: [
        'Log in to your Mocktalk.ai account',
        'There will be a <strong>POPUP</strong> of Login With Google or Facebook',
        'Enter <strong>Full Name </strong> in First Box ',
        'Enter <strong>Role for applyong</strong> in Second Box ex.data analyst',
        'Enter your <strong> Qualification</strong> in Third box',
        'Enter your<strong>Experience</strong> into fourth box',
        '<strong>Select</strong> Number ofQuestion will ask by AI Bot in interview round',
        '<strong>Achievement</strong> will be Optional in form',
        '<strong>Fill All form </strong>expect optional For accurate question ask in interview ',
        '<strong>Click on Start Intervieww</strong> for starting  interview round'
      ]
    },
    {
      id: 'interview-section',
      title: 'Interview Section',
      icon: 'bi bi-chat-square-text-fill',
      gif: interv,
      alt: 'Add Balance',
      category: 'Getting Started',
      steps: [
        'All <strong>Questions</strong> Come one by one',
        'Click <strong>🔉Icon </strong> on/off speaking Qyestions',
        'You can type your answer in input box',
        'or you can <strong>Click on 🎙️ icon</strong> using mic  ',
        'Finally when your answer is ready then click on send button',
        
      ]
    },
    {
      id: 'Report-Card',
      title: 'Report Card',
      icon: '"bi bi-clipboard-data-fill',
      gif: report,
      alt: 'Report-card',
      category: 'Audience Management',
      steps: [
        ' User can see <strong>Score </strong>base on give answers',
        'User see <strong>Strengths</strong> details ',
        'User see <strong>Area of improvement </strong> details ',
        'User can see his all over Summary Feedback',
        'Click <strong>Save</strong> to save his in database  ',
        
      ]
    },
    {
      id: 'Report-list',
      title: 'History reports',
      icon: 'bi-eye-fill',
      gif: reports,
      alt: 'View Audiences',
      category: 'Audience Management',
      steps: [
        'user can see <strong>previous reports</strong> list',
        'user can <strong>Improments Report</strong> Details',
        'user can  view weakness ',
        'user can see all report date ',
        
      ]
    }
  ];

  // Group sections by category for navigation
  const navCategories = [...new Set(sections.map(section => section.category))];
  const navSections = navCategories.map(category => ({
    title: category,
    items: sections.filter(section => section.category === category)
  }));

  return (
    <>
      <Header setIsLoginOpen={setIsLoginOpen} />
      <div className="docs-container">
        {/* Mobile Toggle Button - shows below 768px */}
        {windowWidth < 768 && (
          <button 
            className="sidebar-toggle btn btn-primary"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            <span className="toggle-text">{sidebarOpen ? 'Close' : 'Menu'}</span>
          </button>
        )}

        {/* Sidebar - shows by default on 768px and up */}
        <aside className={`docs-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h4 className="sidebar-title">MockTalk Documentation</h4>
            
          </div>
          <nav className="sidebar-nav">
            {navSections.map((section, index) => (
              <div className="nav-section" key={`nav-section-${index}`}>
                <h5 className="nav-section-title">{section.title}</h5>
                {section.items.map(item => (
                  <a 
                    className={`nav-link ${window.location.hash === `#${item.id}` ? 'active' : ''}`} 
                    href={`#${item.id}`}
                    key={item.id}
                    onClick={() => windowWidth < 768 && setSidebarOpen(false)}
                  >
                    <i className={`bi ${item.icon}`}></i> {item.title}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="docs-content">
          <header className="docs-header">
            <div className="container">
              <div className="header-content">
                <h1>MockTalk.ai Documentation</h1>
                <p className="lead">Everything you need to know about practicing AI-powered mock interviews with MockTalk</p>
                <div className="header-meta">
                  <span className="badge bg-primary">Updated: {new Date().toLocaleDateString()}</span>
                  <span className="text-muted">v2.1.0</span>
                </div>
              </div>
            </div>
          </header>

          <div className="container">
            {sections.map((section, index) => (
              <section id={section.id} className="docs-section" key={section.id}>
                <div className="section-header">
                  <h2>
                    <span className="section-number">{`0${index + 1}`}</span>
                    {section.title}
                  </h2>
                  <div className="section-actions">
                    <button 
                      className="btn btn-sm btn-outline-secondary copy-section"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href.split('#')[0] + `#${section.id}`);
                        // You could add a toast notification here
                      }}
                    >
                      <i className="bi bi-clipboard"></i> Copy Link
                    </button>
                  </div>
                </div>
                
                <div className="section-content">
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="media-container">
                        <img src={section.gif} className="img-fluid rounded shadow" alt={section.alt} />
                        <div className="media-caption">Figure {index + 1}: {section.alt}</div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="steps-container">
                        <ol className="step-list">
                          {section.steps.map((step, i) => (
                            <li key={`step-${section.id}-${i}`} dangerouslySetInnerHTML={{ __html: step }} />
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      <Footer />
       <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Docs;