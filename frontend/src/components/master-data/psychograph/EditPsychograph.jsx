import { Button, Form, Input, Modal, Select } from "antd";
import EditIcon from "../../../assets/Edit.svg"; // Import gambar SVG PlusIcon
import { useEffect, useState } from "react";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const EditPsychograph = ({ open, setOpen, psychographData, fetchData }) => {
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
        if (!values.password) {
          delete values.password;
        }
        http
          .patch(`psychograph/${psychographData.psychograph_id}`, values)
          .then((res) => {
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

  useEffect(() => {
    if (psychographData) {
      form.setFieldsValue({
        type: psychographData.type,
        option_value: psychographData.option_value,
      });
    }
  }, [psychographData]);

  useEffect(() => {
    if (open === false) {
      fetchData(); // Memuat ulang data setelah modal ditutup
    }
  }, [open]);

  return (
    <>
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={EditIcon}
              className="menu-icon"
              style={{ marginRight: 10, height: 40, width: 40 }}
            />
            <span>Edit Option Psychograph</span>
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
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            list_options: [{}],
          }}
        >
          <Form.Item
            name="type"
            label="Type"
            style={{ marginBottom: 10 }}
            rules={[
              { required: true, message: "Please choose type" },
            ]}
          >
            <Select
              placeholder="Choose Parameter Name"
              style={{ height: 40, width: "100%" }}
            >
              <Select.Option value="activity">Activity</Select.Option>
              <Select.Option value="interest">Interest</Select.Option>
              <Select.Option value="opinion">Opinion</Select.Option>
            </Select>
          </Form.Item>

          {/* Field Username */}
          <Form.Item
            name="option_value"
            label="Option Name"
            style={{ marginBottom: 10 }}
            rules={[{ message: "Please enter option name" }]}
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

export default EditPsychograph;
