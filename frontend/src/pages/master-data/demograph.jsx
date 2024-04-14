import DashboardLayout from "../../layouts/Dashboard.layout";
import { Layout } from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";

const { Content } = Layout;

const Demograph = () => {
  return (
    <HelmetProvider>
      <DashboardLayout>
        <Helmet>
          <title>Demograph - MADAM Lite</title>
          <meta name="description" content="MADAM Lite" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/star.svg" />
        </Helmet>
        <Content className="p-6">Demograph Content</Content>
      </DashboardLayout>
    </HelmetProvider>
  );
};

export default Demograph;
