import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatedLoginState } from '../../redux/slices/authSlice';
import { LoginStates } from '../../types/LoginState';
const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(updatedLoginState(LoginStates.LOGGED_OUT));
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Blood bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/donar">
              Become a donar
            </Nav.Link>
            <Nav.Link as={Link} to="/blood-request">
              Request blood
            </Nav.Link>
            <Nav.Link as={Link} to="/search-donar">
              Search donar
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
