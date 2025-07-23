import React, { useState ,useEffect} from "react";
import "../css/UserForm.css"; // We'll create this CSS file

const UserForm = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsCompact(event.detail); // true or false
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    education: "",
    experience: "",
    skills: "",
    achievements: "",
    questionCount: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/start-interview/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.fullName,
          role: formData.role,
          education: formData.education,
          experience: formData.experience,
          skills: formData.skills.split(",").map(s => s.trim()),  // send as array
          question_count: formData.questionCount
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Interview Started:", data);
        localStorage.setItem("reportId", data.report_id || "");
        localStorage.setItem("questions", JSON.stringify(data.questions));
        localStorage.setItem("name", formData.fullName);
        localStorage.setItem("role", formData.role);
        localStorage.setItem("education", formData.education);
        localStorage.setItem("experience", formData.experience);
        localStorage.setItem("skills", formData.skills);
        window.location.href = "/interview/Ai-Bot";
      } else {
        console.error("❌ Error:", data.error);
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error: " + err.message);
    }
  };
  

  return (
    <div className={`form-container main-content ${isCompact ? "compact" : ""}`}>
      <div className="form-wrapper">
        <div className="form-header text-center mb-5">
          <h2 className="display-5 fw-bold text-primary">Candidate Information</h2>
          <p className="lead text-muted">Fill in your details to start the interview process</p>
        </div>
        
        <form onSubmit={handleSubmit} className="form-card shadow-lg p-4 p-md-5 rounded-3 bg-white">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Brijnesh Gupta"
                  required
                />
                <label htmlFor="fullName">Full Name</label>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />
                <label htmlFor="role">Role Applying For</label>
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-floating mb-4">
                <textarea
                  className="form-control"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech in Computer Science from XYZ University"
                  style={{ height: "100px" }}
                />
                <label htmlFor="education">Education</label>
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-floating mb-4">
                <textarea
                  className="form-control"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 1 year at ABC Corp as React Developer"
                  style={{ height: "100px" }}
                />
                <label htmlFor="experience">Experience</label>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Redux, Django, Firebase"
                />
                <label htmlFor="skills">Skills (comma separated)</label>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <select
                  className="form-select"
                  id="questionCount"
                  name="questionCount"
                  value={formData.questionCount || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="5">5 questions</option>
                  <option value="10">10 questions</option>
                  <option value="15">15 questions</option>
                  <option value="20">20 questions</option>
                  <option value="25">25 questions</option>
                </select>
                <label htmlFor="questionCount">Number of Questions</label>
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-floating mb-4">
                <textarea
                  className="form-control"
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  placeholder="e.g. Won Hackathon 2024, Top 10 in Codeforces"
                  style={{ height: "100px" }}
                />
                <label htmlFor="achievements">Achievements (Optional)</label>
              </div>
            </div>
            
            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-primary btn-lg px-5 py-3 submit-btn">
                Start Interview <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;