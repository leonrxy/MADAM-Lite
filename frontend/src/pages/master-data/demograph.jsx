import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout } from 'antd';

const { Content } = Layout;

const Demograph = () => {
  return (
    <DashboardLayout>
        <Content className="p-6"
        >
            Demograph Content
        </Content>
    </DashboardLayout>
  );
};

export default Demograph;
