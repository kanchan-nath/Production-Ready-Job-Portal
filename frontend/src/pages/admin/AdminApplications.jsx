// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../../context/Authcontext.jsx';

// import '../../styles/AdminApplications.css';

// const AdminApplications = () => {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [statusFilter, setStatusFilter] = useState('');
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [notes, setNotes] = useState('');
//     const [newStatus, setNewStatus] = useState('pending');
//     const { token } = useAuthContext();

//     const API_URL = 'http://localhost:5001/api/v1/admin';

//     const fetchApplications = async (pageNum = 1) => {
//         try {
//             const res = await axios.get(
//                 `${API_URL}/applications?page=${pageNum}&limit=10${statusFilter ? `&status=${statusFilter}` : ''}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             setApplications(res.data.data.applications);
//             setTotalPages(res.data.data.totalPages);
//             setPage(pageNum);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching applications:', err);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchApplications(1);
//         }
//     }, [token, statusFilter]);

//     const handleStatusUpdate = async (appId) => {
//         try {
//             await axios.put(
//                 `${API_URL}/applications/${appId}/status`,
//                 { status: newStatus, adminNotes: notes },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             setSelectedApp(null);
//             setNotes('');
//             fetchApplications(page);
//         } catch (err) {
//             console.error('Error updating application:', err);
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'pending': return '#FFA500';
//             case 'reviewed': return '#2563eb';
//             case 'accepted': return '#10b981';
//             case 'rejected': return '#ef4444';
//             default: return '#6b7280';
//         }
//     };

//     if (loading) {
//         return <div className="admin-loading">Loading...</div>;
//     }

//     return (
//         <div className="admin-applications-container">
//             <div className="admin-header">
//                 <h1>Manage Applications</h1>
//                 <p>Review and manage job applications</p>
//             </div>

//             <div className="apps-filter">
//                 <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="filter-select"
//                 >
//                     <option value="">All Status</option>
//                     <option value="pending">Pending</option>
//                     <option value="reviewed">Reviewed</option>
//                     <option value="accepted">Accepted</option>
//                     <option value="rejected">Rejected</option>
//                 </select>
//             </div>

//             <div className="applications-grid">
//                 {applications.map(app => (
//                     <div key={app._id} className="app-card">
//                         <div className="app-card-header">
//                             <h3>{app.userId?.name}</h3>
//                             <span
//                                 className="status-badge"
//                                 style={{ backgroundColor: getStatusColor(app.status) }}
//                             >
//                                 {app.status}
//                             </span>
//                         </div>

//                         <div className="app-card-content">
//                             <p><strong>Job:</strong> {app.jobId?.title}</p>
//                             <p><strong>Email:</strong> {app.userId?.email}</p>
//                             <p><strong>Phone:</strong> {app.phone || 'N/A'}</p>
//                             <p><strong>Applied:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
//                         </div>

//                         {app.adminNotes && (
//                             <div className="app-notes">
//                                 <strong>Notes:</strong> {app.adminNotes}
//                             </div>
//                         )}

//                         <button
//                             className="btn-view"
//                             onClick={() => {
//                                 setSelectedApp(app);
//                                 setNewStatus(app.status);
//                                 setNotes(app.adminNotes || '');
//                             }}
//                         >
//                             Update Status
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {selectedApp && (
//                 <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <h2>Update Application</h2>
//                         <p><strong>Applicant:</strong> {selectedApp.userId?.name}</p>
//                         <p><strong>Job:</strong> {selectedApp.jobId?.title}</p>

//                         <div className="form-group">
//                             <label>Status</label>
//                             <select
//                                 value={newStatus}
//                                 onChange={(e) => setNewStatus(e.target.value)}
//                             >
//                                 <option value="pending">Pending</option>
//                                 <option value="reviewed">Reviewed</option>
//                                 <option value="accepted">Accepted</option>
//                                 <option value="rejected">Rejected</option>
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label>Admin Notes</label>
//                             <textarea
//                                 value={notes}
//                                 onChange={(e) => setNotes(e.target.value)}
//                                 placeholder="Add notes for the applicant..."
//                                 rows="4"
//                             />
//                         </div>

//                         <div className="modal-actions">
//                             <button
//                                 className="btn-primary"
//                                 onClick={() => handleStatusUpdate(selectedApp._id)}
//                             >
//                                 Update
//                             </button>
//                             <button
//                                 className="btn-secondary"
//                                 onClick={() => setSelectedApp(null)}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="pagination">
//                 <button
//                     onClick={() => fetchApplications(page - 1)}
//                     disabled={page === 1}
//                     className="pagination-btn"
//                 >
//                     Previous
//                 </button>
//                 <span className="page-info">Page {page} of {totalPages}</span>
//                 <button
//                     onClick={() => fetchApplications(page + 1)}
//                     disabled={page === totalPages}
//                     className="pagination-btn"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminApplications;