import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import JobPage from "../pages/JobPage.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>    
                <Route path="/all-jobs" element={<HomePage />} />
                <Route path="/jobs" element={<JobPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
