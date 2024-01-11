import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatedLoginState } from '../../redux/slices/authSlice';
import { LoginStates } from '../../types/LoginState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
            <Nav.Link as={Link} to="/donor">
              Become a donor
            </Nav.Link>
            <Nav.Link as={Link} to="/blood-request">
              Request blood
            </Nav.Link>
            <Nav.Link as={Link} to="/search-donor">
              Search donor
            </Nav.Link>
          </Nav>
          <Nav className="me-lg">
            <Nav.Link onClick={handleLogout}>
              <FontAwesomeIcon className="action-icon mx-2" icon={faPowerOff} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
