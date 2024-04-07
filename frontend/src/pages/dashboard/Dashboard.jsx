import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout, Button } from 'antd';
const { Header, Content } = Layout;

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Content className="p-6">DASHBOARD</Content>
    </DashboardLayout>
  );
};

export default Dashboard;
