import { Button, Form, Input, Modal, Select } from "antd";
import PlusIcon from "../../../assets/Plus.svg";
import { useState } from "react";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const AddPsychograph = ({ open, setOpen, fetchData }) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        http.post(`psychograph/`, values).then((res) => {
          console.log(values);
          const { message, status } = res;
          setModalMessage(message);
          setModalStatus(status === "success" ? "success" : "failed");
          form.resetFields();
          setOpen(false);
          fetchData(values.type);
          setOpenStatusModal(true);
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
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
            <span>Add Option Psychograph</span>
          </div>
        }
        centered
        visible={open}
        onCancel={handleCancel}
        width={400}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
      >
        {/* Garis horizontal di bawah ikon dan teks */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <hr style={{ flex: 1, borderColor: "lightgray", margin: 0 }} />
        </div>
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="type"
            label="Type"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please choose type" }]}
          >
            <Select
              placeholder="Choose Type"
              style={{ height: 40, width: "100%" }}
            >
              <Select.Option value="activity">Activity</Select.Option>
              <Select.Option value="interest">Interest</Select.Option>
              <Select.Option value="opinion">Opinion</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="option_value"
            label="Option Name"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter option name" }]}
          >
            <Input style={{ height: 40 }} placeholder="Enter Option Name" />
          </Form.Item>

          {/* Tombol untuk membatalkan atau menyimpan data */}
          <div className="mt-7" style={{ textAlign: "center" }}>
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

export default AddPsychograph;
