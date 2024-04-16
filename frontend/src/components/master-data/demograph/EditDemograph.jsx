import { Button, Form, Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import EditIcon from "../../../assets/Edit.svg"; // Import gambar SVG PlusIcon
import { useEffect, useState } from "react";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const EditDemograph = ({ open, setOpen, demographData, fetchData }) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [form] = Form.useForm(); // Inisialisasi form

  const handleCancel = () => {
    form.resetFields();
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

  useEffect(() => {
    if (demographData) {
      form.setFieldsValue({
        parameter_name: demographData?.parameter_name,
        custom_result_parameter: demographData?.custom_result_parameter,
      });
      if (demographData.list_of_options) {
        const options = demographData.list_of_options.map((option) => ({
          option_value: option?.option_value,
          result_value: option?.result_value,
        }));
        form.setFieldsValue({
          list_of_options: options,
        });
      }
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
        width={600}
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
            list_of_options: [demographData?.list_of_options],
          }}
        >
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
                message: "Please enter custom result parameter",
              },
            ]}
          >
            <Input
              style={{ height: 40 }}
              placeholder="Enter Custom Result Parameter"
            />
          </Form.Item>

          {/* Nest Form.List */}
          <Form.List name="list_of_options">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 10,
                }}
              >
                <div className="flex items-center justify-between">
                  <span>List Option Value</span>
                  <Button
                    type="primary"
                    className="rounded-xl"
                    onClick={() => add()}
                    block
                    style={{ width: 120, height: 37 }}
                  >
                    + Add Option
                  </Button>
                </div>

                {fields.map((field) => (
                  <div key={field.key} className="flex items-center">
                    <Form.Item noStyle name={[field.name, "option_value"]}>
                      <Input
                        style={{ height: 40 }}
                        placeholder="Enter Option Value"
                        className="mr-2"
                      />
                    </Form.Item>
                    <Form.Item noStyle name={[field.name, "result_value"]}>
                      <Input
                        style={{ height: 40 }}
                        placeholder="Enter Custom Result Value"
                        className="mr-2"
                      />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </Form.List>

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
