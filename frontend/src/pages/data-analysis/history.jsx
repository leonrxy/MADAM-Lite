import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout } from 'antd';

const { Content } = Layout;

const History = () => {
  return (
    <DashboardLayout>
        <Content className="p-6"
        >
            History Content
        </Content>
    </DashboardLayout>
  );
};

export default History;
