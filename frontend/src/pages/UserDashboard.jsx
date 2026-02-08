import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobPortal.css';
import axios from 'axios';

const UserDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('All');
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const API_URL = 'http://localhost:5001/api/v1'

    const getJobs = () => {
        axios
            .get(API_URL + '/jobs')
            .then((res) => {
                setJobs(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        let filtered = jobs;

        if (selectedJobType !== 'All') {
            filtered = filtered.filter(
                (job) => job.jobType === selectedJobType
            );
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (job) =>
                    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
    }, [jobs, searchTerm, selectedJobType]);

    const jobTypes = ['All', ...new Set(jobs.map((job) => job.jobType))];

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
        <div className="job-portal">
            <div className="search-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <div className="filter-container">
                        {jobTypes.map((type) => (
                            <button
                                key={type}
                                className={`filter-btn ${selectedJobType === type ? 'active' : ''
                                    }`}
                                onClick={() => setSelectedJobType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="jobs-section">
                    <h2>Available Jobs ({filteredJobs.length})</h2>

                    {loading ? (
                        <p className="loading">Loading jobs...</p>
                    ) : filteredJobs.length === 0 ? (
                        <p className="no-jobs">No jobs found</p>
                    ) : (
                        <div className="jobs-list">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job._id}
                                    className={`job-card ${selectedJob?._id === job._id ? 'active' : ''
                                        }`}
                                    // ON CLICK: Navigate to job details page
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;