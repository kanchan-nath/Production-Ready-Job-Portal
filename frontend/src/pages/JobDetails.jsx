    import React, { useState, useEffect } from 'react';
    import '../styles/JobDetails.css';
    import axios from 'axios';
    import { useParams } from 'react-router-dom';

    const JobDetails = () => {
        const { jobId } = useParams();
        const [job, setJob] = useState(null);
        const [error, setError] = useState(null);
        const [relatedJobs, setRelatedJobs] = useState([]);
        const [showForm, setShowForm] = useState(false);
        const [isExpired, setIsExpired] = useState(false);
        const [fullName, setFullName] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [resume, setResume] = useState('');
        const [coverLetter, setCoverLetter] = useState('');

        const API_URL = 'http://localhost:5001/api/v1';

        const getJobById = () => {
            axios
                .get(`${API_URL}/jobs/${jobId}`)
                .then((res) => {
                    setJob(res.data.data);
                    checkDeadline(res.data.data.deadline);
                })
                .catch((err) => {
                    setError(err.message);
                    console.log("Error:", err);
                });
        }

        useEffect(() => {
            getJobById()
        }, [jobId]);

        const getRelatedJobs = () => {
            axios
                .get(`${API_URL}/jobs?company=${job?.company}`)
                .then((res) => {
                    setRelatedJobs(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        useEffect(() => {
            if (job?.company) {
                getRelatedJobs();
            }
        }, [job?.company]);

        const checkDeadline = (deadline) => {
            const today = new Date();
            const deadlineDate = new Date(deadline);
            if (today > deadlineDate) {
                setIsExpired(true);
            } else {
                setIsExpired(false);
            }
        };

        const applyJob = () => {
            const application = {
                jobId: jobId,
                fullName: fullName,
                email: email,
                phone: phone,
                resume: resume,
                coverLetter: coverLetter
            };

            console.log(application)

            axios.post(API_URL + '/applications', application)
                .then(res => {
                    alert('Application submitted successfully!');
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setResume('');
                    setCoverLetter('');
                    setShowForm(false);
                })
                .catch(err => console.log(err));
        };

        if (!job) {
            return <div className="job-details-loading">Loading job details...</div>;
        }

        return (
            <div className="job-details-container">
                {/* JOB HEADER SECTION */}
                <div className="job-header">
                    <div className="job-header-content" key={job._id}>
                        <h1 className="job-title">{job.title}</h1>
                        <div className="job-meta">
                            <span className="job-company">
                                <span className="icon">🏢</span> {job.company}
                            </span>
                            <span className="job-location">
                                <span className="icon">📍</span> {job.location}
                            </span>
                            <span className="job-level">
                                <span className="icon">📊</span> {job.level}
                            </span>
                            <span className="job-salary">
                                <span className="icon">💰</span> {job.salary}
                            </span>
                        </div>
                        <p className="job-posted">Posted {job.postedDate}</p>
                    </div>
                    {!isExpired ? (
                        <button className="btn-apply-header" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Close' : 'Apply Now'}
                        </button>
                    ) : (
                        <button className="btn-apply-header-disabled" disabled>
                            Deadline Passed
                        </button>
                    )}
                </div>

                <div className="job-content-wrapper">
                    {/* MAIN CONTENT */}
                    <div className="job-main-content">
                        {/* DEADLINE WARNING */}
                        {job.deadline && (
                            <div className="deadline-section">
                                <p><strong>Application Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
                                {isExpired && <p className="expired-text">⚠️ This job posting has expired. You cannot apply.</p>}
                            </div>
                        )}

                        {/* JOB DESCRIPTION */}
                        <section className="job-section">
                            <h2 className="section-title">Job Description</h2>
                            <p className="section-description">{job.description}</p>
                        </section>

                        {/* KEY RESPONSIBILITIES */}
                        <section className="job-section">
                            <h2 className="section-title">Key Responsibilities</h2>
                            <ul className="responsibility-list">
                                {job.responsibilities && job.responsibilities.map((responsibility, index) => (
                                    <li key={index}>{responsibility}</li>
                                ))}
                            </ul>
                        </section>

                        {/* SKILLS REQUIRED */}
                        <section className="job-section">
                            <h2 className="section-title">Skills Required</h2>
                            <ul className="skills-list">
                                {job.skills && job.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>

                        {/* QUALIFICATIONS */}
                        <section className="job-section">
                            <h2 className="section-title">Qualifications</h2>
                            <ul className="qualifications-list">
                                {job.qualifications && job.qualifications.map((qualification, index) => (
                                    <li key={index}>{qualification}</li>
                                ))}
                            </ul>
                        </section>

                        {/* BENEFITS */}
                        {job.benefits && job.benefits.length > 0 && (
                            <section className="job-section">
                                <h2 className="section-title">Benefits</h2>
                                <div className="benefits-grid">
                                    {job.benefits.map((benefit, index) => (
                                        <div key={index} className="benefit-item">
                                            <span className="benefit-icon">✓</span>
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ABOUT COMPANY */}
                        {job.aboutCompany && (
                            <section className="job-section">
                                <h2 className="section-title">About {job.company}</h2>
                                <p className="section-description">{job.aboutCompany}</p>
                            </section>
                        )}

                        {/* APPLICATION FORM */}
                        {showForm && !isExpired && (
                            <div className="apply-form-box">
                                <h2>Apply for {job.title}</h2>
                                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <textarea placeholder="Resume/CV" value={resume} onChange={(e) => setResume(e.target.value)} />
                                <textarea placeholder="Cover Letter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
                                <button onClick={applyJob} className="btn-submit">Submit Application</button>
                            </div>
                        )}

                        {/* APPLY BUTTON (BOTTOM) */}
                        {!isExpired ? (
                            <button className="btn-apply-bottom" onClick={() => setShowForm(!showForm)}>
                                {showForm ? 'Close' : 'Apply Now'}
                            </button>
                        ) : (
                            <button className="btn-apply-bottom-disabled" disabled>
                                Application Deadline Passed
                            </button>
                        )}
                    </div>

                    {/* SIDEBAR - RELATED JOBS */}
                    <aside className="job-sidebar">
                        <h3 className="sidebar-title">More jobs from {job.company}</h3>
                        <div className="related-jobs">
                            {relatedJobs && relatedJobs.map((relatedJob) => (
                                <div key={relatedJob.id} className="related-job-card">
                                    <h4 className="related-job-title">{relatedJob.title}</h4>
                                    <div className="related-job-meta">
                                        <span className="related-job-location">{relatedJob.location}</span>
                                        <span className="related-job-level">{relatedJob.level}</span>
                                    </div>
                                    <p className="related-job-description">{relatedJob.description}</p>
                                    <button className="btn-related-job">Apply now</button>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        );
    };

    export default JobDetails;