import { Button, Form, Input, Modal } from "antd";
import PlusIcon from "../../../assets/Plus.svg"; // Import gambar SVG PlusIcon
import { useState } from "react";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const AddDemograph = ({ open, setOpen }) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [form] = Form.useForm(); // Inisialisasi form

  const handleCancel = () => {
    setOpen(false); // Menutup modal saat tombol Cancel ditekan
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        http.post("users", values).then((res) => {
          const { message, status } = res;
          setModalMessage(message);
          setModalStatus(status === "success" ? "success" : "failed");
          form.resetFields(); // Mengosongkan form setelah disimpan
          setOpen(false); // Menutup modal setelah disimpan
          setOpenStatusModal(true); // Membuka modal status
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
            <span>Add Demograph</span>
          </div>
        }
        centered
        visible={open}
        onCancel={handleCancel}
        width={400}
        maskClosable={false}
        destroyOnClose={true} // Hapus konten modal setelah ditutup
        footer={null} // Menghilangkan footer bawaan (OK dan Cancel) dari modal
      >
        {/* Garis horizontal di bawah ikon dan teks */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <hr style={{ flex: 1, borderColor: "lightgray", margin: 0 }} />
        </div>

        {/* Form untuk memasukkan data pengguna */}
        <Form form={form} layout="vertical" requiredMark={false}>
          {/* Field Name */}
          <Form.Item
            name="parametername"
            label="Parameter Name"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter parameter name" }]}
          >
            <Input style={{ height: 40 }} placeholder="Enter Parameter Name" />
          </Form.Item>

          {/* Field Email */}
          <Form.Item
            name="customresultparameter"
            label="Custom Result Parameter"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter custom result parameter" }]}
          >
            <Input style={{ height: 40 }} placeholder="Enter Custom Result Parameter" />
          </Form.Item>

          {/* Field Password */}
          <Form.Item
            name="password"
            label="Password"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              style={{ height: 40 }}
              placeholder="Enter Password"
            />
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

export default AddDemograph;