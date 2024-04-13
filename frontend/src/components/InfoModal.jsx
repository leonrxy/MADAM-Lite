import { Button, Modal, Typography } from "antd";
import Success from "../../../assets/Success.svg";

const { Text } = Typography;

const DeleteUser = ({ open, setOpen, message }) => {
  const handleOkay = () => {
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
              <Button key="submit" type="primary" onClick={handleOkay}>
                Okay
              </Button>
            </div>
          </>
        }
      >
        <div className="flex justify-center mb-3">
          <img src={Success} alt="Confirm Delete" />
        </div>
        <div className="flex justify-center mb-3">
          <Text className="text-xl font-semibold text-center">Success!</Text>
        </div>
        <div className="flex justify-center mb-7">
          <Text className="text-gray-400 text-base">{message}</Text>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUser;
