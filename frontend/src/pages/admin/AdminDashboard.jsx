// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../../context/Authcontext.jsx';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//     const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { token } = useAuthContext();
//     const navigate = useNavigate();

//     const API_URL = 'http://localhost:5001/api/v1/admin';

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const res = await axios.get(
//                     `${API_URL}/stats`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//                 setStats(res.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching stats:', err);
//                 setLoading(false);
//             }
//         };

//         if (token) {
//             fetchStats();
//         }
//     }, [token]);

//     if (loading) {
//         return <div className="admin-loading">Loading...</div>;
//     }

//     return (
//         <div className="admin-dashboard">
//             <div className="admin-header">
//                 <h1>Admin Dashboard</h1>
//                 <p>Manage jobs, applications, and users</p>
//             </div>

//             <div className="stats-grid">
//                 <div className="stat-card" onClick={() => navigate('/admin/jobs')}>
//                     <div className="stat-number">{stats?.totalJobs || 0}</div>
//                     <div className="stat-label">Total Jobs</div>
//                     <div className="stat-icon">📋</div>
//                 </div>

//                 <div className="stat-card" onClick={() => navigate('/admin/applications')}>
//                     <div className="stat-number">{stats?.totalApplications || 0}</div>
//                     <div className="stat-label">Total Applications</div>
//                     <div className="stat-icon">📤</div>
//                 </div>

//                 <div className="stat-card" onClick={() => navigate('/admin/users')}>
//                     <div className="stat-number">{stats?.totalUsers || 0}</div>
//                     <div className="stat-label">Total Users</div>
//                     <div className="stat-icon">👥</div>
//                 </div>
//             </div>

//             <div className="admin-sections">
//                 <section className="admin-section">
//                     <h2>Recent Applications</h2>
//                     <div className="applications-table">
//                         {stats?.recentApplications?.length === 0 ? (
//                             <p>No recent applications</p>
//                         ) : (
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Job</th>
//                                         <th>Applicant</th>
//                                         <th>Email</th>
//                                         <th>Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {stats?.recentApplications?.map(app => (
//                                         <tr key={app._id}>
//                                             <td>{app.jobId?.title}</td>
//                                             <td>{app.userId?.name}</td>
//                                             <td>{app.userId?.email}</td>
//                                             <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 </section>
//             </div>

//             <div className="admin-actions">
//                 <button
//                     className="admin-btn primary"
//                     onClick={() => navigate('/admin/jobs')}
//                 >
//                     Manage Jobs
//                 </button>
//                 <button
//                     className="admin-btn secondary"
//                     onClick={() => navigate('/admin/applications')}
//                 >
//                     Manage Applications
//                 </button>
//                 <button
//                     className="admin-btn secondary"
//                     onClick={() => navigate('/admin/users')}
//                 >
//                     Manage Users
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;