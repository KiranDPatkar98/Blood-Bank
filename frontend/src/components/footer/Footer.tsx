import { Container, Navbar } from 'react-bootstrap';
const Footer = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="bottom">
      <Container>
        <Navbar.Brand>
          &copy; {new Date().getFullYear()} Blood bank
        </Navbar.Brand>
        <Navbar.Text className="ms-auto">
          Made with ❤️ by Kiran D Patkar
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
