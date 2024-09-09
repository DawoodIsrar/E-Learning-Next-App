import Modal from "@mui/material/Modal";

const ContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "unset",
  bottom: "unset",
  border: "none",
  transform: "translate(-50%, -50%)",
  backgroundColor: "transparent",
  overflow: "auto",
  WebkitOverflowScrolling: "touch",
  borderRadius: "4px",
  outline: "none",
  padding: "20px",
};

const ReactModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div style={ContentStyle}>{children}</div>
    </Modal>
  );
};
export default ReactModal;
