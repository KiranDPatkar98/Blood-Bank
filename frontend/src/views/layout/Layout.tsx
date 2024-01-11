import React, { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { updatedLoginState } from '../../redux/slices/authSlice';
import { LoginStates } from '../../types/LoginState';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sessionExpired } = useSelector((s: any) => s.app);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updatedLoginState(LoginStates.LOGGED_OUT));
  };
  return (
    <>
      <Header />
      <Modal show={sessionExpired} onHide={handleClose}>
        <Modal.Header closeButton> Session Expired</Modal.Header>
        <Modal.Body className="text-center">Please login again !!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mt-5 mb-5 pt-3" style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
