import {  Modal } from "antd";

const AddUser = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        title="Add User"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={400}
        maskClosable={false}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default AddUser;
