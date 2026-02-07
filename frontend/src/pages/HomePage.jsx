import React, { useState, useEffect } from 'react';
import '../styles/JobsPage.css';
import axios from 'axios';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  const API_URL = 'http://localhost:5001/api/v1';

  const getJobs = () => {
    axios.get(API_URL + '/jobs')
      .then((res) => setJobs(res.data.data))
      .catch((err) => console.log(err));
  };
    useEffect(() => {
      getJobs();
    }, []);

  const deleteJob = (id) => {
    axios.delete(API_URL + '/jobs/' + id)
      .then(res => getJobs())
      .catch(err => console.log(err));
  };  
  
  return (
    <div>
      <div className="jobs-list">
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
      </div>
    </div>
  )
}

export default HomePage
