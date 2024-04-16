import { useState } from "react"; // Import useState from React
import { Form, Typography, Select, Radio, Space, Input, Button } from "antd";
import CompanyIcon from "../../../assets/Company.svg";

const { Text } = Typography;
const { Option } = Select;

const CompanyInformation = () => {
  const [value, setValue] = useState(1);
  const [form] = Form.useForm();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center ">
        <img
          src={CompanyIcon}
          alt="Company"
          className="menu-icon"
          style={{ marginBottom: 8, height: 40, width: 40 }}
        />
        <Text className="text-2xl font-bold mb-4">Company Information</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="type"
          label="Choose Company"
          style={{ marginBottom: 10 }}
          rules={[{ required: true, message: "Please choose parameter name" }]}
        >
          <Select
            placeholder="Enter Company Name"
            style={{ height: 40, width: "45%" }}
          >
            <Option value="Activity">Activity</Option>
            <Option value="Interest">Interest</Option>
          </Select>
        </Form.Item>

        <Radio.Group
          onChange={onChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Space direction="vertical">
            <Radio value={1}>Select existing company profile</Radio>
            <Radio value={2}>Add new company profile</Radio>
          </Space>
        </Radio.Group>

        <div className="flex">
          <Form.Item
            name="company_name"
            label="Company Name"
            style={{ marginBottom: 10, flex: "1 1 50%" }}
            rules={[
              {
                message: "Please enter company name",
              },
            ]}
          >
            <Input
              style={{ height: 40, width: "90%" }}
              placeholder="Enter Company Name"
            />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Industry"
            style={{ marginBottom: 10, flex: "1 1 50%" }}
            rules={[
              {
                message: "Please enter industry",
              },
            ]}
          >
            <Input
              style={{ height: 40, width: "100%" }}
              placeholder="Enter Industry"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          label="Address"
          style={{ marginBottom: 10 }}
          rules={[
            {
              message: "Please enter address",
            },
          ]}
        >
          <Input
            style={{ height: 40, width: "45%" }}
            placeholder="Enter Company Address"
          />
        </Form.Item>

        <Text className="text-1xl font-bold mb-4">Contact Person</Text>
        <div className="flex">
          <Form.Item
            name="full_name"
            label="Full Name"
            style={{ marginBottom: 10, flex: "1 1 50%" }}
            rules={[
              {
                message: "Please enter Full name",
              },
            ]}
          >
            <Input
              style={{ height: 40, width: "90%" }}
              placeholder="Enter Full Name"
            />
          </Form.Item>

          <Form.Item
            name="email_address"
            label="Email Address"
            style={{ marginBottom: 10, flex: "1 1 50%" }}
            rules={[
              {
                message: "Please enter email address",
              },
            ]}
          >
            <Input
              style={{ height: 40, width: "100%" }}
              placeholder="Enter Email Address"
            />
          </Form.Item>
        </div>

        <div className="flex">
          <Form.Item
            name="position_title"
            label="Position/Title"
            style={{ marginBottom: 10, flex: "1 1 50%" }}
            rules={[
              {
                message: "Please enter position/title",
              },
            ]}
          >
            <Input
              style={{ height: 40, width: "90%" }}
              placeholder="Enter Position/Title"
            />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
            style={{ marginBottom: 10, flex: "1 1 50%" }}
            rules={[
              {
                message: "Please enter phone number",
              },
            ]}
          >
            <Input
              style={{ height: 40, width: "100%" }}
              placeholder="Enter Phone Number"
            />
          </Form.Item>
        </div>
      </Form>

      <div className="item-right" style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        type="primary"
        className="rounded-xl"
        onClick={() => add()}
        style={{ width: 120, height: 37 }}
      >
        Next
      </Button>
    </div>
    </div>
  );
};

export default CompanyInformation;
