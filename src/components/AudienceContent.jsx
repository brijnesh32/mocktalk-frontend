import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from "firebase/auth";

const auth = getAuth();

const AudienceContent = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setIsCompact(e.detail);
    };
    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      if (!userEmail) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports/`,{
          params: { email: userEmail },
        });
        setReports(response.data.reports);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [userEmail]);

  const parseDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("-");
    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  if (loading || userEmail === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 main-content">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading reports...</span>
      </div>
    );
  }

  return (
    <div className={`main-content ${isCompact ? "compact" : ""}`}>
      {/* reports-page centres and constrains width — defined in mocktalk-global.css */}
      <div className="reports-page">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">My Interview Reports</h2>
          </div>

          <div className="card-body">
            {reports.length === 0 ? (
              <div className="alert alert-info mb-0">
                No reports available.
              </div>
            ) : (
              <div className="report-list">
                {reports.map((report, index) => (
                  <div
                    key={report.id || index}
                    className="report-item card mb-3"
                    style={{ "--item-order": index }}
                  >
                    <div className="card-body">
                      <div className="row align-items-center mb-3">
                        <div className="col-md-5">
                          <h5 className="mb-1 text-truncate">
                            <i className="bi bi-person-circle me-2"></i>
                            {report.name}
                          </h5>
                          <p className="mb-0 text-muted small">
                            <i className="bi bi-briefcase me-1"></i>
                            {report.role}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <div className="d-flex align-items-center">
                            <span className="badge bg-light text-dark me-2">Score</span>
                            <div className="progress flex-grow-1" style={{ height: '20px' }}>
                              <div
                                className={`progress-bar ${
                                  report.score >= 70 ? 'bg-success' :
                                  report.score >= 40 ? 'bg-warning' : 'bg-danger'
                                }`}
                                role="progressbar"
                                style={{ width: `${report.score}%` }}
                                aria-valuenow={report.score}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {report.score}%
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 text-center">
                          <span className="badge bg-secondary">
                            <i className="bi bi-calendar me-1"></i>
                            {parseDate(report.created_at).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <strong>Strengths:</strong>
                          <p className="text-success small mb-2">{report.strengths || "N/A"}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Areas for Improvement:</strong>
                          <p className="text-danger small mb-2">{report.improvements || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card-footer text-muted text-center">
            Showing {reports.length} report{reports.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceContent;