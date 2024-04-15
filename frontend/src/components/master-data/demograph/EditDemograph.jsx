import { Button, Form, Input, Modal, Space } from "antd";
import EditIcon from "../../../assets/Edit.svg"; // Import gambar SVG PlusIcon
import { useEffect, useState } from "react";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const EditDemograph = ({ open, setOpen, demographData, fetchData }) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [form] = Form.useForm(); // Inisialisasi form
  const [options, setOptions] = useState([]);

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
          .patch(`demograph/${demographData.demograph_id}`, values)
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

  const handleAddOption = () => {
    setOptions([...options, { optionValue: "", customResultValue: "" }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  useEffect(() => {
    if (demographData) {
      form.setFieldsValue({
        parameter_name: demographData.parameter_name,
        custom_result_option: demographData.result_value,
        list_option_value: demographData.option_value,
      });
    }
  }, [demographData]);

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
            <span>Edit Demograph</span>
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
            name="parameter_name"
            label="Parameter Name"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter parameter name" }]}
          >
            <Input style={{ height: 40 }} placeholder="Enter Parameter Name" />
          </Form.Item>

          {/* Field Username */}
          <Form.Item
            name="custom_result_parameter"
            label="Custom Result Parameter"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please enter custom result parameter",
              },
            ]}
          >
            <Input
              style={{ height: 40 }}
              placeholder="Enter Custom Result Parameter"
            />
          </Form.Item>

          <Space
            style={{
              marginBottom: 10,
              justifyContent: "space-between",
              width: "100%",
            }}
            align="baseline"
          >
            <Form.Item
              name="listoptionvalue"
              label="List Option Value"
              style={{ marginBottom: 0, flex: 1 }}
            ></Form.Item>
            <Button
              type="primary"
              onClick={handleAddOption}
              style={{ color: "white" }}
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

export default EditDemograph;
