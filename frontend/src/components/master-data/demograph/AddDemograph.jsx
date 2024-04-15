import { Button, Form, Input, Modal, Space } from "antd";
import PlusIcon from "../../../assets/Plus.svg";
import { useState } from "react";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const AddDemograph = ({ open, setOpen }) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const requestData = {
          ...values,
          options: options.map((opt) => ({
            optionValue: opt.optionValue,
            customResultValue: opt.customResultValue,
          })),
        };
        http.post("demograph", requestData).then((res) => {
          const { message, status } = res;
          setModalMessage(message);
          setModalStatus(status === "success" ? "success" : "failed");
          form.resetFields();
          setOpen(false);
          setOpenStatusModal(true);
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleAddOption = () => {
    setOptions([...options, { optionValue: "", customResultValue: "" }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  return (
    <>
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={PlusIcon}
              alt="Plus"
              className="menu-icon"
              style={{ marginRight: 10, height: 40, width: 40 }}
            />
            <span>Add Demograph</span>
          </div>
        }
        centered
        visible={open}
        onCancel={handleCancel}
        width={600}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="parametername"
            label="Parameter Name"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter parameter name" }]}
          >
            <Input style={{ height: 40 }} placeholder="Enter Parameter Name" />
          </Form.Item>

          <Form.Item
            name="customresultparameter"
            label="Custom Result Parameter"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please enter Custom Result parameter",
              },
            ]}
          >
            <Input
              style={{ height: 40 }}
              placeholder="Please enter Custom Result Parameter"
            />
          </Form.Item>

          <Space
            style={{ marginBottom: 10, justifyContent: "flex-end" }}
            align="baseline"
          >
            <Form.Item
              name="listoptionvalue"
              label="List Option Value"
              style={{ marginBottom: 0 }}
            ></Form.Item>
            <Button
              type="primary"
              onClick={handleAddOption}
              style={{ color: "white", marginLeft: 310 }}
            >
              + Add Option
            </Button>
          </Space>

          {options.map((option, index) => (
            <Space key={index} style={{ display: "flex", marginBottom: 10 }}>
              <Form.Item
                name={`optionValue${index}`}
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: "Please enter Option Value" },
                ]}
              >
                <Input
                  placeholder="Enter Option Value"
                  value={option.optionValue}
                  onChange={(e) =>
                    handleOptionValueChange(e.target.value, index)
                  }
                />
              </Form.Item>
              <Form.Item
                name={`customResultValue${index}`}
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Custom Result Value",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Custom Result Value"
                  value={option.customResultValue}
                  onChange={(e) =>
                    handleCustomResultValueChange(e.target.value, index)
                  }
                />
              </Form.Item>
              <Button type="danger" onClick={() => handleRemoveOption(index)}>
                X
              </Button>
            </Space>
          ))}

          <div style={{ textAlign: "center" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
      <StatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        message={modalMessage}
        status={modalStatus}
      />
    </>
  );
};

export default AddDemograph;
