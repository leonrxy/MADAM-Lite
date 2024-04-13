import DashboardLayout from "../../layouts/Dashboard.layout";
import { Helmet } from "react-helmet";
import UserList from "../../components/system-administrator/user-management/UserList";

const UserManagement = () => {
  return (
    <>
      <Helmet>
        <title>User Management - MADAM Lite</title>
        <meta name="description" content="MADAM Lite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/star.svg" />
      </Helmet>
      <DashboardLayout>
        <UserList />
      </DashboardLayout>
    </>
  );
};

export default UserManagement;
