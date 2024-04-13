import { Button, Modal, Typography } from "antd";
import SuccessIcon from "../assets/Success.svg";
import FailedIcon from "../assets/Failed.svg";

const { Text } = Typography;

const StatusModal = ({ open, setOpen, status, message }) => {
  const handleOkay = () => {
    setOpen(false);
  };

  // Tentukan ikon berdasarkan status
  const icon = status === "success" ? SuccessIcon : FailedIcon;
  // Tentukan teks berdasarkan status
  const text = status === "success" ? "Success!" : "Failed!";

  return (
    <>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={350}
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
          {/* Tampilkan ikon berdasarkan status */}
          <img src={icon} alt={status === "success" ? "Success" : "Failed"} />
        </div>
        <div className="flex justify-center mb-3">
          {/* Tampilkan teks berdasarkan status */}
          <Text className="text-xl font-semibold text-center">{text}</Text>
        </div>
        <div className="flex justify-center mb-7">
          <Text className="text-gray-400 text-base">{message}</Text>
        </div>
      </Modal>
    </>
  );
};

export default StatusModal;
