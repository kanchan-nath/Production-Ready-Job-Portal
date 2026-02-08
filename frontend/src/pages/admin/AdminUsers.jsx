// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../../context/Authcontext.jsx';

// import '../../styles/AdminUsers.css';

// const AdminUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const { token } = useAuthContext();

//     const API_URL = 'http://localhost:5001/api/v1/admin';

//     const fetchUsers = async (pageNum = 1) => {
//         try {
//             const res = await axios.get(
//                 `${API_URL}/users?page=${pageNum}&limit=10`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             setUsers(res.data.data.users);
//             setTotalPages(res.data.data.totalPages);
//             setPage(pageNum);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchUsers(1);
//         }
//     }, [token]);

//     const handleRoleChange = async (userId, newRole) => {
//         try {
//             await axios.put(
//                 `${API_URL}/users/${userId}/role`,
//                 { role: newRole },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             fetchUsers(page);
//         } catch (err) {
//             console.error('Error updating user role:', err);
//         }
//     };

//     if (loading) {
//         return <div className="admin-loading">Loading...</div>;
//     }

//     return (
//         <div className="admin-users-container">
//             <div className="admin-header">
//                 <h1>Manage Users</h1>
//                 <p>View and manage user roles</p>
//             </div>

//             <div className="users-table-container">
//                 <table className="users-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                             <th>Joined</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user._id}>
//                                 <td>
//                                     <div className="user-info">
//                                         {user.picture && (
//                                             <img src={user.picture} alt={user.name} className="user-avatar" />
//                                         )}
//                                         <span>{user.name}</span>
//                                     </div>
//                                 </td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     <span className={`role-badge ${user.role}`}>
//                                         {user.role}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
//                                         {user.isActive ? 'Active' : 'Inactive'}
//                                     </span>
//                                 </td>
//                                 <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                                 <td className="actions">
//                                     <select
//                                         value={user.role}
//                                         onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                                         className="role-select"
//                                     >
//                                         <option value="user">User</option>
//                                         <option value="admin">Admin</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="pagination">
//                 <button
//                     onClick={() => fetchUsers(page - 1)}
//                     disabled={page === 1}
//                     className="pagination-btn"
//                 >
//                     Previous
//                 </button>
//                 <span className="page-info">Page {page} of {totalPages}</span>
//                 <button
//                     onClick={() => fetchUsers(page + 1)}
//                     disabled={page === totalPages}
//                     className="pagination-btn"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminUsers;