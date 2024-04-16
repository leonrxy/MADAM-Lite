import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import ConfirmDelete from "../../../assets/ConfirmDelete.svg";
import http from "../../../utils/http";
import StatusModal from "../../StatusModal";

const { Text } = Typography;

const DeletePsychograph = ({ open, setOpen, psychographData }) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");

  const handleDelete = () => {
    http.delete(`psychograph/${psychographData.psychograph_id}`).then((res) => {
      const { message, status } = res;
      console.log(message);
      setModalMessage(message);
      setModalStatus(status === "success" ? "success" : "failed");
      setOpen(false);
      setOpenStatusModal(true);
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={400}
        maskClosable={false}
        footer={
          <>
            <div className="flex justify-center">
              <Button className="mr-3" onClick={handleCancel}>
                No, cancel
              </Button>
              <Button type="primary" onClick={handleDelete}>
                Yes, delete
              </Button>
            </div>
          </>
        }
      >
        <div className="flex justify-center mb-3">
          <img src={ConfirmDelete} alt="Confirm Delete" />
        </div>
        <div className="flex justify-center mb-3">
          <Text className="text-xl font-semibold text-center">
            Are you sure to delete psychograph
            {"'" + psychographData?.option_value + "'?"}
          </Text>
        </div>
        <div className="flex justify-center mb-7 text-center">
          <Text className="text-gray-400 text-base">
            This item has been permanently removed. You can add it back later.
          </Text>
        </div>
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

export default DeletePsychograph;
