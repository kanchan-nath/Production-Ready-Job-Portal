    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import '../styles/JobsPage.css';
    import { useNavigate } from "react-router-dom";

    const JobsPage = () => {
        // const [jobs, setJobs] = useState([]);
        const [showForm, setShowForm] = useState(false);
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [company, setCompany] = useState('');
        const [location, setLocation] = useState('');
        const [salary, setSalary] = useState('');
        const [jobType, setJobType] = useState('Full-time');
        const [experience, setExperience] = useState('');
        const [skills, setSkills] = useState('');

        const navigate = useNavigate();

        const API_URL = 'http://localhost:5001/api/v1';

        const postJob = () => {
            const newJob = {
                title: title,
                description: description,
                company: company,
                location: location,
                salary: salary,
                jobType: jobType,
                experience: experience,
                skills: skills.split(',')
            };

            axios.post(API_URL + '/jobs', newJob)
                .then((res) => {
                    setTitle('');
                    setDescription('');
                    setCompany('');
                    setLocation('');
                    setSalary('');
                    setJobType('Full-time');
                    setExperience('');
                    setSkills('');
                    setShowForm(false);
                })
                .catch((err) => console.log("API Fetched Failed:\n",err));
                navigate("/all-jobs")
        };



        return (
            <div className="jobs-page">
                <h1>Jobs</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                    {showForm ? 'Cancel' : 'Post Job'}
                </button>

                {showForm && (
                    <div className="form-box">
                        <input 
                        type="text" 
                        placeholder="Job Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        />

                        <textarea 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        />

                        <input 
                        type="text" 
                        placeholder="Company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        />

                        <input 
                        type="text" 
                        placeholder="Location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        />

                        <input 
                        type="text" 
                        placeholder="Salary" 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)} 
                        />

                        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Freelance</option>
                        </select>

                        <input 
                        type="text" 
                        placeholder="Experience" 
                        value={experience} 
                        onChange={(e) => setExperience(e.target.value)} 
                        />

                        <input 
                        type="text" 
                        placeholder="Skills (comma separated)" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)} 
                        />

                        <button onClick={postJob} className="btn-success">Add New Job</button>
                    </div>
                )}

                {/* <div className="jobs-list">
                    {jobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <h3>{job.title}</h3>
                            <p><strong>{job.company}</strong></p>
                            <p>{job.location} | {job.salary}</p>
                            <p>{job.jobType} | {job.experience}</p>
                            <p>{job.description}</p>
                            <p>{job.skills.join(', ')}</p>
                            <button onClick={() => deleteJob(job._id)} className="btn-danger">Delete</button>
                        </div>
                    ))}
                </div> */}
            </div>
        );
    };

    export default JobsPage;