import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout } from 'antd';

const { Content } = Layout;

const UserManagement = () => {
  return (
    <DashboardLayout>
        <Content className="p-6"
        >
            User Management Content
        </Content>
    </DashboardLayout>
  );
};

export default UserManagement;
