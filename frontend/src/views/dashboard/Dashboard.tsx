import './dashboard.scss';
import Tile from '../../components/card/Tile';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5">
          <Col xs={12} md={6} lg={3}>
            <Tile
              title="Become a donar"
              description="Offering life by donating blood, a compassionate act fostering hope and saving lives"
              path="images/blood_donar.jpg"
              url="/donar"
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Tile
              title="Request blood"
              description="Offering life by donating blood, a compassionate act fostering hope and saving lives"
              path="images/blood_request.jpg"
              url="/blood-request"
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Tile
              title="Serach a donar"
              description="Seeking blood donors nearby. Find donors quickly for urgent needs. Save lives together"
              path="images/search.jpg"
              url="search-donar"
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Tile
              title="Manage user"
              description="You can add, update, and delete users"
              path="images/user.jpg"
              url="/manage-user"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;