import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import UserManagement from "../pages/system-administrator/user-management.jsx";
import AioAnalysis from "../pages/data-analysis/aio-analysis.jsx";
import History from "../pages/data-analysis/history.jsx";
import Demograph from "../pages/master-data/demograph.jsx";
import Psychograph from "../pages/master-data/psychograph.jsx";

function checkAuthorization(roleRequired, userRole) {
  return roleRequired.includes(userRole);
}

function ProtectedRoute({ requiredRole }) {
  const isAuthenticated = !!sessionStorage.getItem("token");
  const userRole = JSON.parse(sessionStorage.getItem("userData")).role;

  if (isAuthenticated && !checkAuthorization(requiredRole, userRole)) {
    return <Navigate to="/dashboard" />;
  } else if (!isAuthenticated && !checkAuthorization(requiredRole, userRole)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

function RoutesIndex() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route element={<ProtectedRoute requiredRole={["user", "superadmin"]} />}>
        <Route path="/aio-analysis" element={<AioAnalysis />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route element={<ProtectedRoute requiredRole={["superadmin"]} />}>
        <Route path="/demograph" element={<Demograph />} />
        <Route path="/psychograph" element={<Psychograph />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Route>

      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default RoutesIndex;
