import React, { useState, useEffect } from 'react';
import '../styles/AdminJobsPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AdminDashBoard = () => {
  const [jobs, setJobs] = useState([]);

  const API_URL = 'http://localhost:5001/api/v1';

  const getJobs = () => {
    axios
      .get(API_URL + '/jobs')
      .then((res) => setJobs(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getJobs();
  }, []);

  const deleteJob = (id) => {
    axios
      .delete(API_URL + '/jobs/' + id)
      .then(() => getJobs())
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin</h2>
        <nav className="sidebar-nav">
          <Link to="/jobs">Create Job</Link>
          <a href="/admin/jobs" className="active">All Jobs</a>
        </nav>
      </aside>

      <main className="admin-content">
        <h1 className="page-title">All Jobs</h1>

        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>

              <p className="job-company">{job.company}</p>
              <p className="job-meta">
                {job.location} • {job.salary}
              </p>
              <p className="job-meta">
                {job.jobType} • {job.experience}
              </p>
              <p className="job-description">{job.description}</p>
              <p className="job-skills">
                {job.skills.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashBoard;
