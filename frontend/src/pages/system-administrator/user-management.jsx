import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout, Button } from 'antd';

const { Header, Content } = Layout;

const UserManagement = () => {
  return (
    <DashboardLayout>
        <Header>
            <Button type="primary">Primary Button</Button>
        </Header>
        <Content className="p-6"
        >
            adsadsasdsddsddsd
        </Content>
    </DashboardLayout>
  );
};

export default UserManagement;
