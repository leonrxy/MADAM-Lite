import DashboardLayout from '../../layouts/Dashboard.layout';
import { Layout } from 'antd';

const { Content } = Layout;

const AioAnalysis = () => {
  return (
    <DashboardLayout>
        <Content className="p-6"
        >
            AIO Analysis Content
        </Content>
    </DashboardLayout>
  );
};

export default AioAnalysis;
