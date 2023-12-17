import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
  isOpen: boolean;
  heading: string;
  body: string;
  handleClose: () => void;
  handleSubmit: () => void;
};

const CustomModal = ({
  isOpen,
  heading,
  body,
  handleClose,
  handleSubmit,
}: Props) => {
  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
