import { Modal, Button } from "antd";
import InfoIcon from "../assets/Info.svg"; 

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

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={InfoIcon}
            alt="Plus"
            className="menu-icon"
            style={{ marginRight: 8 }}
          />
          <span>Detail User</span>
        </div>
      }
      centered
      visible={open}
      onCancel={handleClose}
      footer={[
        <div style={{ textAlign: "center" }}>
          <Button key="edit" type="primary" onClick={handleEdit}>
            Edit Data
          </Button>
          ,
          <Button key="back" onClick={handleClose}>
            Back
          </Button>
          ,
        </div>,
      ]}
    >
      {/* Tampilkan detail pengguna jika userData tidak null */}
      {userData && (
        <div>
          <p>ID User: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Updated At: {userData.updated_at}</p>
          {/* Tambahkan informasi lainnya sesuai kebutuhan */}
        </div>
      )}
    </Modal>
  );
};

export default DetailUser;
