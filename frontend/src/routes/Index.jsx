import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/Login.jsx';
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import UserManagement from "../pages/system-administrator/user-management.jsx";


function RoutesIndex() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/" element={<Login />} />
        </Routes>
    )
}

export default RoutesIndex