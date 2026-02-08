import React, { useState } from 'react';
import axios from 'axios';
import '../styles/JobsPage.css';
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [jobType, setJobType] = useState('Full-time');
    const [experience, setExperience] = useState('');
    const [level, setLevel] = useState('Mid');

    const [skills, setSkills] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [benefits, setBenefits] = useState('');

    const [aboutCompany, setAboutCompany] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();
    const API_URL = 'http://localhost:5001/api/v1';

    const postJob = () => {
        const newJob = {
            title,
            description,
            company,
            location,
            salary,
            jobType,
            experience,
            level,
            skills: skills.split(','),
            responsibilities: responsibilities.split(','),
            qualifications: qualifications.split(','),
            benefits: benefits.split(','),
            aboutCompany,
            deadline,
            isActive
        };

        axios.post(API_URL + '/jobs', newJob)
            .then(() => {
                setTitle('');
                setDescription('');
                setCompany('');
                setLocation('');
                setSalary('');
                setJobType('Full-time');
                setExperience('');
                setLevel('Mid');
                setSkills('');
                setResponsibilities('');
                setQualifications('');
                setBenefits('');
                setAboutCompany('');
                setDeadline('');
                setIsActive(true);
                setShowForm(false);
                navigate("/admin");
            })
            .catch(err => console.log("API Failed:\n", err));
    };

    return (
        <div className="jobs-page">
            <h1>Jobs</h1>

            <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                {showForm ? 'Cancel' : 'Post Job'}
            </button>

            {showForm && (
                <div className="form-box">
                    <input placeholder="Job Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
                    <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                    <input placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />

                    <select value={jobType} onChange={e => setJobType(e.target.value)}>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Freelance</option>
                    </select>

                    <input placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} />

                    <select value={level} onChange={e => setLevel(e.target.value)}>
                        <option>Entry</option>
                        <option>Mid</option>
                        <option>Senior</option>
                        <option>Lead</option>
                    </select>

                    <input placeholder="Skills (comma separated)" value={skills} onChange={e => setSkills(e.target.value)} />
                    <input placeholder="Responsibilities (comma separated)" value={responsibilities} onChange={e => setResponsibilities(e.target.value)} />
                    <input placeholder="Qualifications (comma separated)" value={qualifications} onChange={e => setQualifications(e.target.value)} />
                    <input placeholder="Benefits (comma separated)" value={benefits} onChange={e => setBenefits(e.target.value)} />

                    <textarea placeholder="About Company" value={aboutCompany} onChange={e => setAboutCompany(e.target.value)} />

                    <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />

                    <label>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={e => setIsActive(e.target.checked)}
                        />
                        Active Job
                    </label>

                    <button onClick={postJob} className="btn-success">
                        Add New Job
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobsPage;
