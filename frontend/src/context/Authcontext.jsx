// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const { isAuthenticated, user, getAccessTokenSilently, isLoading } = useAuth0();
//     const [token, setToken] = useState(null);
//     const [userProfile, setUserProfile] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [authLoading, setAuthLoading] = useState(true);

//     useEffect(() => {
//         const initializeAuth = async () => {
//             try {
//                 if (isAuthenticated && user) {
//                     console.log('Initializing auth for user:', user.email);

//                     // Get token
//                     const accessToken = await getAccessTokenSilently();
//                     setToken(accessToken);
//                     console.log('Token obtained');

//                     // Sync user with backend
//                     try {
//                         await axios.post(
//                             'http://localhost:5001/api/v1/user/sync',
//                             {
//                                 auth0Id: user.sub,
//                                 email: user.email,
//                                 name: user.name,
//                                 picture: user.picture
//                             }
//                         );
//                         console.log('User synced with backend');
//                     } catch (syncError) {
//                         console.warn('User sync error (non-fatal):', syncError.message);
//                     }

//                     // Get user profile with role
//                     try {
//                         const response = await axios.get(
//                             'http://localhost:5001/api/v1/user/profile',
//                             {
//                                 headers: {
//                                     Authorization: `Bearer ${accessToken}`
//                                 }
//                             }
//                         );

//                         if (response.data && response.data.data) {
//                             setUserProfile(response.data.data);
//                             setIsAdmin(response.data.data.role === 'admin');
//                             console.log('User profile loaded, is admin:', response.data.data.role === 'admin');
//                         }
//                     } catch (profileError) {
//                         console.warn('Profile fetch error (non-fatal):', profileError.message);
//                         // Set basic user profile even if API fails
//                         setUserProfile({
//                             name: user.name,
//                             email: user.email,
//                             picture: user.picture,
//                             role: 'user'
//                         });
//                     }
//                 }
//                 setAuthLoading(false);
//             } catch (error) {
//                 console.error('Auth initialization error:', error);
//                 setAuthLoading(false);
//             }
//         };

//         if (!isLoading) {
//             initializeAuth();
//         }
//     }, [isAuthenticated, user, isLoading, getAccessTokenSilently]);

//     return (
//         <AuthContext.Provider value={{
//             token,
//             userProfile,
//             isAdmin,
//             isAuthenticated,
//             user,
//             isLoading: isLoading || authLoading,
//             setUserProfile,
//             setIsAdmin
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuthContext must be used within AuthProvider');
//     }
//     return context;
// };