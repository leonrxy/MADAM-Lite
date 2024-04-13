import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import PlusIcon from "../assets/Plus.svg"; // Import gambar SVG PlusIcon

const AddUser = ({ open, setOpen, onSave }) => {
  const [form] = Form.useForm(); // Inisialisasi form

  const handleCancel = () => {
    setOpen(false); // Menutup modal saat tombol Cancel ditekan
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // Teruskan data yang divalidasi ke fungsi onSave
        form.resetFields(); // Mengosongkan form setelah disimpan
        setOpen(false); // Menutup modal
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
            <img src={PlusIcon} alt="Plus" className="menu-icon" style={{ marginRight: 8 }} />
            <span>Add User</span>
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <hr style={{ flex: 1, borderColor: "lightgray", margin: 0 }} />
        </div>

        {/* Form untuk memasukkan data pengguna */}
        <Form form={form} layout="vertical">
          {/* Field Name */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          {/* Field Username */}
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          {/* Field Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          {/* Field Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          {/* Tombol untuk membatalkan atau menyimpan data */}
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
    </>
  );
};

export default AddUser;
