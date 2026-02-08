import { Routes, Route } from "react-router-dom";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";
import JobPage from "../pages/JobPage.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import JobDetails from "../pages/JobDetails.jsx";
// import AdminApplications from "../pages/admin/AdminApplications.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/job/:jobId" element={<JobDetails />} />
            <Route path="/job" element={<JobPage />} />
            {/* <Route path="/admin/applications" element={<AdminApplications />} /> */}
        </Routes>
    );
};

export default AppRoutes;
