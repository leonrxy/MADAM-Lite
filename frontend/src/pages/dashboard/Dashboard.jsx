import DashboardLayout from "../../layouts/Dashboard.layout";
import { Layout } from "antd";
const { Content } = Layout;
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard - MADAM Lite</title>
        <meta name="description" content="MADAM Lite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/star.svg" />
      </Helmet>
      <Content className="p-6">DASHBOARD</Content>
    </DashboardLayout>
  );
};

export default Dashboard;
