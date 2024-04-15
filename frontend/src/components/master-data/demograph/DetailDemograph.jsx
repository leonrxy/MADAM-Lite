import { Button, Descriptions, Modal } from "antd";
import InfoIcon from "../../../assets/Info.svg";
import EditDemograph from "./EditDemograph";
import { useState } from "react";

const DetailDemograph = ({ open, setOpen, demographData, fetchData }) => {
  const [openEditDemograph, setOpenEditDemograph] = useState(false);
  const handleClose = () => {
    setOpen(false); 
  };

  const handleEdit = () => {
    setOpen(false);
    setOpenEditDemograph(true); 
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
      key: "1",
      label: "Demograph ID",
      children: demographData?.demograph_id,
      span: 3,
      labelStyle: { background: "#F8F8F8" },
      contentStyle: { background: "#F8F8F8", textAlign: "right" },
    },
    {
      key: "2",
      label: "Parameter Name",
      children: demographData?.parameter_name,
      span: 3,
      labelStyle: { background: "#ffffff" },
      contentStyle: { background: "#ffffff", textAlign: "right" },
    },
    {
      key: "3",
      label: "Number of Options",
      children: demographData?.option_value,
      span: 3,
      labelStyle: { background: "#F8F8F8" },
      contentStyle: { background: "#F8F8F8", textAlign: "right" },
    },
    {
      key: "4",
      label: "Last Update",
      children: formatUpdatedAt(demographData?.updated_at),
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
            <span>Detail Demograph</span>
          </div>
        }
        centered={true}
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
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <hr style={{ flex: 1, borderColor: "lightgray", margin: 0 }} />
        </div>
        {demographData && <Descriptions bordered items={items} size="middle" />}
      </Modal>
      <EditDemograph open={openEditDemograph} setOpen={setOpenEditDemograph} demographData={demographData} fetchData={fetchData}/>
    </>
  );
};

export default DetailDemograph;
