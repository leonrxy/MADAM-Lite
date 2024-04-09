import {  Modal } from "antd";

const DeleteUser = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        title="Delete User"
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

export default DeleteUser;
