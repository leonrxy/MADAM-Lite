import DashboardLayout from "../../layouts/Dashboard.layout";
import { Layout } from "antd";
import { Helmet } from "react-helmet";

const { Content } = Layout;

const AioAnalysis = () => {
  return (
    <>
      <Helmet>
        <title>AIO Analysis - MADAM Lite</title>
        <meta name="description" content="MADAM Lite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/star.svg" />
      </Helmet>
      <DashboardLayout>
        <Content className="p-6">AIO Analysis Content</Content>
      </DashboardLayout>
    </>
  );
};

export default AioAnalysis;
