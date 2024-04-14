import { Button, Descriptions, Modal } from "antd";
import InfoIcon from "../../../assets/Info.svg";
import EditUser from "./EditUser";
import { useState } from "react";

const DetailUser = ({ open, setOpen, userData, fetchData }) => {
  const [openEditUser, setOpenEditUser] = useState(false);
  const handleClose = () => {
    setOpen(false); // Tutup modal DetailUser
  };

  const handleEdit = () => {
    // Fungsi untuk menangani klik tombol Edit Data
    setOpen(false); // Tutup modal DetailUser
    setOpenEditUser(true); // Buka modal EditUser
  };

  const formatUpdatedAt = (updatedAt) => {
    const date = new Date(updatedAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const items = [
    {
      key: "user_id",
      label: "User ID",
      children: userData?.user_id,
      span: 3,
      labelStyle: { background: "#F8F8F8" },
      contentStyle: { background: "#F8F8F8", textAlign: "right" },
    },
    {
      key: "name",
      label: "Name",
      children: userData?.name,
      span: 3,
      labelStyle: { background: "#ffffff" },
      contentStyle: { background: "#ffffff", textAlign: "right" },
    },
    {
      key: "username",
      label: "Username",
      children: userData?.username,
      span: 3,
      labelStyle: { background: "#F8F8F8" },
      contentStyle: { background: "#F8F8F8", textAlign: "right" },
    },
    {
      key: "email",
      label: "Email",
      children: userData?.email,
      span: 3,
      labelStyle: { background: "#ffffff" },
      contentStyle: { background: "#ffffff", textAlign: "right" },
    },
    {
      key: "updated_at",
      label: "Updated at",
      children: formatUpdatedAt(userData?.updated_at),
      span: 3,
      labelStyle: { background: "#F8F8F8" },
      contentStyle: { background: "#F8F8F8", textAlign: "right" },
    },
  ];

  return (
    <>
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
        centered={true}
        open={open}
        onCancel={handleClose}
        footer={
          <div className="mt-7" style={{ textAlign: "center" }}>
            <Button className="mr-3" onClick={handleEdit}>
              Edit Data
            </Button>
            <Button type="primary" onClick={handleClose}>
              Back
            </Button>
          </div>
        }
      >
        {/* Garis horizontal di bawah ikon dan teks */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <hr style={{ flex: 1, borderColor: "lightgray", margin: 0 }} />
        </div>
        {/* Tampilkan detail pengguna jika userData tidak null */}
        {userData && <Descriptions bordered items={items} size="middle" />}
      </Modal>
      <EditUser
        open={openEditUser}
        setOpen={setOpenEditUser}
        userData={userData}
        fetchData={fetchData}
      />
    </>
  );
};

export default DetailUser;
