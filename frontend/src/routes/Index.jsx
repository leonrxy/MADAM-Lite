import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/Login.jsx';
import Dashboard from "../pages/dashboard/Dashboard.jsx";


function RoutesIndex() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default RoutesIndex