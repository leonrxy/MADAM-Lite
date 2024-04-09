import { Button, Modal, Typography } from "antd";
import ConfirmDelete from "../assets/ConfirmDelete.svg";

const { Text } = Typography;

const DeleteUser = ({ open, setOpen }) => {
  const handleOk = () => {
    setOpen(false);
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
            <Button key="back" className="mr-3" size="large" onClick={handleCancel}>
              No, cancel
            </Button>
            <Button key="submit" type="primary" size="large" onClick={handleOk}>
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
            Are you sure to delete user {"'EXAMPLE" + "'?"}
          </Text>
        </div>
        <div className="flex justify-center mb-7">
          <Text className="text-gray-400 text-base">
            This user has been permanently removed.
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUser;
