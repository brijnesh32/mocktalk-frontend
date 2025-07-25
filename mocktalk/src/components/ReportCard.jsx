import React, { useEffect, useState } from "react";
import "../css/ReportCard.css";
import axios from "axios";
import { getAuth } from "firebase/auth";

const ReportCard = () => {
   const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setIsCompact(e.detail);
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => {
      window.removeEventListener("sidebarToggle", handleSidebarToggle);
    };
  }, []);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // 🔥 Prevent multiple saves
  const [saving, setSaving] = useState(false);   // For button loading state

  useEffect(() => {
    const feedback = localStorage.getItem("feedback");
    const name = localStorage.getItem("name") || "Unknown";
    const role = localStorage.getItem("role") || "N/A";
    const date = new Date().toLocaleDateString();

    if (feedback) {
      try {
        const parsed = JSON.parse(feedback);
        setReport({
          name,
          role,
          date,
          score: parsed.score ?? 0,
          strengths: parsed.strengths ?? [],
          improvements: parsed.improvements ?? [],
          summary: parsed.summary ?? "No summary available"
        });
      } catch (err) {
        console.error("Error parsing feedback:", err);
      }
    }

    setLoading(false);
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-3">Loading report...</span>
    </div>
  );

  if (!report) return (
    <div className="alert alert-danger mt-5 mx-auto" style={{ maxWidth: '600px' }}>
      Report not found. Please complete an interview first.
    </div>
  );

  const progressWidth = `${report.score}%`;

  const handleSaveReport = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated. Please login first.");
      return;
    }

    const email = user.email;

    try {
      setSaving(true); // 🟡 Start saving
      const reportToSend = {
        ...report,
        email: email,
      };

      const response = await axios.post("http://127.0.0.1:8000/api/save-report/", reportToSend);

      if (response.status === 201 || response.status === 200) {
        alert("Report saved successfully!");
        setIsSaved(true);
      } else {
        alert("Failed to save report.");
      }
    } catch (error) {
      console.error("Error saving report:", error);
      if (error.response?.status === 400) {
        alert("This report has already been saved.");
        setIsSaved(true);
      } else {
        alert("An error occurred while saving the report.");
      }
    } finally {
      setSaving(false); // 🔴 End saving
    }
  };

  return (
    <div className={`container my-5 main-content ${isCompact ? "compact" : ""}`} style={{ width: '100%',marginRight:'70px' }}>

      <div className="card shadow-lg report-card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Interview Performance Report</h2>
        </div>

        <div className="card-body">
          <div className="row mb-4 report-header">
            <div className="col-md-6">
              <p><strong>Candidate:</strong> <span className="text-muted">{report.name}</span></p>
              <p><strong>Role:</strong> <span className="text-muted">{report.role}</span></p>
            </div>
            <div className="col-md-6 text-md-end">
              <p><strong>Date:</strong> <span className="text-muted">{report.date}</span></p>
              <div className="d-flex align-items-center justify-content-md-end">
                <strong className="me-2">Score:</strong>
                <div className="progress flex-grow-1" style={{ width: '100px', height: '20px' }}>
                  <div
                    className={`progress-bar ${report.score >= 70 ? 'bg-success' : report.score >= 40 ? 'bg-warning' : 'bg-danger'}`}
                    role="progressbar"
                    style={{ width: progressWidth }}
                    aria-valuenow={report.score}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {report.score}
                  </div>
                </div>
                <span className="ms-2">/100</span>
              </div>
            </div>
          </div>

          <div className="report-section mb-4 p-4 bg-light rounded">
            <h4 className="d-flex align-items-center text-success">
              <span className="badge bg-success me-2">✓</span>
              Strengths
            </h4>
            {report.strengths.length > 0 ? (
              <ul className="list-group list-group-flush">
                {report.strengths.map((item, index) => (
                  <li key={index} className="list-group-item bg-transparent">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No strengths noted</p>
            )}
          </div>

          <div className="report-section mb-4 p-4 bg-light rounded">
            <h4 className="d-flex align-items-center text-warning">
              <span className="badge bg-warning me-2">!</span>
              Areas for Improvement
            </h4>
            {report.improvements.length > 0 ? (
              <ul className="list-group list-group-flush">
                {report.improvements.map((item, index) => (
                  <li key={index} className="list-group-item bg-transparent">
                    <i className="bi bi-exclamation-circle-fill text-warning me-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No improvement areas noted</p>
            )}
          </div>

          <div className="report-summary p-4 bg-info bg-opacity-10 rounded">
            <h4 className="d-flex align-items-center text-info">
              <span className="badge bg-info me-2">AI</span>
              Summary Feedback
            </h4>
            <div className="p-3 bg-white rounded">
              <p className="mb-0">{report.summary}</p>
            </div>
          </div>
        </div>

        <div className="card-footer text-muted text-center">
          <button
            type="button"
            className="btn btn-success mx-5"
            onClick={handleSaveReport}
            disabled={isSaved || saving}
          >
            {saving ? "Saving..." : isSaved ? "Saved" : "Save"}
          </button>
          Thank you for using our interview system
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
