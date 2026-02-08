import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobPortal.css';
import axios from 'axios';

const UserDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const navigate = useNavigate();

    const API_URL = 'http://localhost:5001/api/v1'

    const getJobs = () => {
        axios
            .get(API_URL + '/jobs')
            .then((res) => {
                setJobs(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getJobs();
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const now = new Date();
        const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const handleJobClick = (jobId) => {
        navigate(`/job/${jobId}`);
    };

    return (
        <div className="main-content">
            <div className="jobs-section">
                <h2>Available Jobs ({jobs.length})</h2>
                <div className="jobs-list">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className={`job-card ${selectedJob?._id === job._id ? 'active' : ''}`}
                            onClick={() => handleJobClick(job._id)}
                        >
                            <h3>{job.title}</h3>
                            <p className="company">{job.company}</p>
                            <p>{job.location} | {job.salary}</p>
                            <p>{job.jobType} | {job.experience} yrs</p>
                            <p className="posted">{formatDate(job.postedDate)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default UserDashboard;