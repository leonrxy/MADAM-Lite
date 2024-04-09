import { Modal } from "antd";

const DetailUser = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        title="Detail User"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={400}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default DetailUser;
