import { Button, Descriptions, Modal } from "antd";
import InfoIcon from "../../../assets/Info.svg";

const DetailUser = ({ open, setOpen, userData }) => {
  const handleClose = () => {
    setOpen(false); // Tutup modal DetailUser
  };

  const handleEdit = () => {
    // Fungsi untuk menangani klik tombol Edit Data
    if (userData) {
      console.log("Edit data:", userData);
      // Implementasi logika untuk membuka modal pengeditan atau menuju halaman pengeditan data pengguna
    }
  };

  const items = [
    {
      key: "1",
      label: "User ID",
      children: userData?.user_id,
      span: 3,
    },
    {
      key: "2",
      label: "Name",
      children: userData?.name,
      span: 3,
    },
    {
      key: "3",
      label: "Username",
      children: userData?.username,
      span: 3,
    },
    {
      key: "4",
      label: "Email",
      children: userData?.email,
      span: 3,
    },
    {
      key: "5",
      label: "Updated at",
      children: userData?.updated_at,
      span: 3,
    },
  ];

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={InfoIcon}
            alt="Plus"
            className="menu-icon"
            style={{ marginRight: 10, height: 40, width: 40 }}
          />
          <span>Detail User</span>
        </div>
      }
      centered
      visible={open}
      onCancel={handleClose}
      footer={[
        <>
          <div className="mt-7" style={{ textAlign: "center" }}>
            <Button className="mr-3" key="edit" onClick={handleEdit}>
              Edit Data
            </Button>
            <Button key="back" type="primary" onClick={handleClose}>
              Back
            </Button>
          </div>
        </>,
      ]}
    >
      {/* Garis horizontal di bawah ikon dan teks */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <hr style={{ flex: 1, borderColor: "lightgray", margin: 0 }} />
      </div>
      {/* Tampilkan detail pengguna jika userData tidak null */}
      {userData && <Descriptions bordered items={items} size="middle" />}
    </Modal>
  );
};

export default DetailUser;
