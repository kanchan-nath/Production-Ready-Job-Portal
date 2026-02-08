import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";
import JobPage from "../pages/JobPage.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import JobDetails from "../pages/JobDetails.jsx";
// import AdminApplicat ions from "../pages/admin/AdminApplications.jsx";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>    
                <Route path="/" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashBoard />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/job/:jobId" element={<JobDetails />} />
                

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
