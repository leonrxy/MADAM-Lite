import DashboardLayout from "../../layouts/Dashboard.layout";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UserList from "../../components/system-administrator/user-management/UserList";

const UserManagement = () => {
  return (
    <HelmetProvider>
      <DashboardLayout>
        <Helmet>
          <title>User Management - MADAM Lite</title>
          <meta name="description" content="MADAM Lite" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/star.svg" />
        </Helmet>
        <UserList />
      </DashboardLayout>
    </HelmetProvider>
  );
};

export default UserManagement;
