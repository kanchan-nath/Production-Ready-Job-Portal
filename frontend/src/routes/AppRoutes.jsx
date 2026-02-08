import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import JobPage from "../pages/JobPage.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import JobDetails from "../pages/JobDetails.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>    
                <Route path="/" element={<UserDashboard />} />
                <Route path="/" element={<UserDashboard />} />
                <Route path="/all-jobs" element={<HomePage />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/job/:jobId" element={<JobDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
