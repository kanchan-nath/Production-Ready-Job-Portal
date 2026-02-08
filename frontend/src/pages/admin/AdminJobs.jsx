// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../../context/Authcontext.jsx';

// import '../../styles/AdminJobs.css';

// const AdminJobs = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [statusFilter, setStatusFilter] = useState('');
//     const { token } = useAuthContext();

//     const API_URL = 'http://localhost:5001/api/v1/admin';

//     const fetchJobs = async (pageNum = 1) => {
//         try {
//             const res = await axios.get(
//                 `${API_URL}/jobs?page=${pageNum}&limit=10${statusFilter ? `&status=${statusFilter}` : ''}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             setJobs(res.data.data.jobs);
//             setTotalPages(res.data.data.totalPages);
//             setPage(pageNum);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching jobs:', err);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchJobs(1);
//         }
//     }, [token, statusFilter]);

//     const handleStatusChange = async (jobId, isActive) => {
//         try {
//             await axios.put(
//                 `${API_URL}/jobs/${jobId}/status`,
//                 { isActive },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             fetchJobs(page);
//         } catch (err) {
//             console.error('Error updating job:', err);
//         }
//     };

//     const handleDelete = async (jobId) => {
//         if (window.confirm('Are you sure you want to delete this job?')) {
//             try {
//                 await axios.delete(
//                     `http://localhost:5001/api/v1/jobs/${jobId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//                 fetchJobs(page);
//             } catch (err) {
//                 console.error('Error deleting job:', err);
//             }
//         }
//     };

//     if (loading) {
//         return <div className="admin-loading">Loading...</div>;
//     }

//     return (
//         <div className="admin-jobs-container">
//             <div className="admin-header">
//                 <h1>Manage Jobs</h1>
//                 <p>View and manage all job postings</p>
//             </div>

//             <div className="jobs-filter">
//                 <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="filter-select"
//                 >
//                     <option value="">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                 </select>
//             </div>

//             <div className="jobs-table-container">
//                 <table className="jobs-table">
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Company</th>
//                             <th>Location</th>
//                             <th>Type</th>
//                             <th>Status</th>
//                             <th>Posted</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {jobs.map(job => (
//                             <tr key={job._id}>
//                                 <td className="job-title">{job.title}</td>
//                                 <td>{job.company}</td>
//                                 <td>{job.location}</td>
//                                 <td>{job.jobType}</td>
//                                 <td>
//                                     <span className={`status ${job.isActive ? 'active' : 'inactive'}`}>
//                                         {job.isActive ? 'Active' : 'Inactive'}
//                                     </span>
//                                 </td>
//                                 <td>{new Date(job.postedDate).toLocaleDateString()}</td>
//                                 <td className="actions">
//                                     <button
//                                         className="btn-status"
//                                         onClick={() => handleStatusChange(job._id, !job.isActive)}
//                                     >
//                                         {job.isActive ? 'Deactivate' : 'Activate'}
//                                     </button>
//                                     <button
//                                         className="btn-delete"
//                                         onClick={() => handleDelete(job._id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="pagination">
//                 <button
//                     onClick={() => fetchJobs(page - 1)}
//                     disabled={page === 1}
//                     className="pagination-btn"
//                 >
//                     Previous
//                 </button>
//                 <span className="page-info">Page {page} of {totalPages}</span>
//                 <button
//                     onClick={() => fetchJobs(page + 1)}
//                     disabled={page === totalPages}
//                     className="pagination-btn"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminJobs;