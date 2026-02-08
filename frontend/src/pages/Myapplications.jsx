// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../context/AuthContext';
// import '../styles/MyApplications.css';

// const MyApplications = () => {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('all');
//     const { token } = useAuthContext();

//     const API_URL = 'http://localhost:5001/api/v1';

//     useEffect(() => {
//         const fetchApplications = async () => {
//             try {
//                 const res = await axios.get(
//                     `${API_URL}/applications/user/me`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//                 setApplications(res.data.data || []);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching applications:', err);
//                 setLoading(false);
//             }
//         };

//         if (token) {
//             fetchApplications();
//         }
//     }, [token]);

//     const filteredApplications = filter === 'all'
//         ? applications
//         : applications.filter(app => app.status === filter);

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'pending': return '#FFA500';
//             case 'reviewed': return '#2563eb';
//             case 'accepted': return '#10b981';
//             case 'rejected': return '#ef4444';
//             default: return '#6b7280';
//         }
//     };

//     return (
//         <div className="my-applications-container">
//             <div className="applications-header">
//                 <h1>My Applications</h1>
//                 <p>Track all your job applications in one place</p>
//             </div>

//             <div className="filter-section">
//                 {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map(status => (
//                     <button
//                         key={status}
//                         className={`filter-btn ${filter === status ? 'active' : ''}`}
//                         onClick={() => setFilter(status)}
//                     >
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div className="applications-list">
//                 {loading ? (
//                     <p className="loading">Loading applications...</p>
//                 ) : filteredApplications.length === 0 ? (
//                     <div className="no-applications">
//                         <p>No applications found</p>
//                         <a href="/">Browse Jobs</a>
//                     </div>
//                 ) : (
//                     filteredApplications.map(app => (
//                         <div key={app._id} className="application-card">
//                             <div className="app-header">
//                                 <div>
//                                     <h3>{app.jobId?.title}</h3>
//                                     <p className="company">{app.jobId?.company}</p>
//                                 </div>
//                                 <span
//                                     className="status-badge"
//                                     style={{ backgroundColor: getStatusColor(app.status) }}
//                                 >
//                                     {app.status}
//                                 </span>
//                             </div>
//                             <div className="app-details">
//                                 <p><strong>Applied:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
//                                 <p><strong>Location:</strong> {app.jobId?.location}</p>
//                                 <p><strong>Salary:</strong> {app.jobId?.salary}</p>
//                             </div>
//                             {app.adminNotes && (
//                                 <div className="admin-notes">
//                                     <strong>Admin Notes:</strong>
//                                     <p>{app.adminNotes}</p>
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyApplications;