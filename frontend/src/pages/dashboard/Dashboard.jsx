import DashboardLayout from "../../layouts/Dashboard.layout";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, message } from "antd";
const { Content } = Layout;
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (queryParams.has("loginSuccess")) {
      queryParams.delete("loginSuccess");
      messageApi.open({
        type: "success",
        content: "Login Success",
      });
      console.log(queryParams.toString());
      navigate({
        search: queryParams.toString(),
      });
    }
  }, []);

  return (
    <DashboardLayout>
      {contextHolder}
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
