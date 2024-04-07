import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout } from 'antd';

const { Content } = Layout;

const Psychograph = () => {
  return (
    <DashboardLayout>
        <Content className="p-6"
        >
            Psychograph Content
        </Content>
    </DashboardLayout>
  );
};

export default Psychograph;
