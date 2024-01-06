import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Tile from '../../components/card/Tile';
import { useAPIClient } from '../../api';

// const data = [
//   { bloodGroup: 'A+', units: 10 },
//   { bloodGroup: 'B+', units: 15 },
//   { bloodGroup: 'AB+', units: 20 },
//   { bloodGroup: 'O+', units: 12 },
//   { bloodGroup: 'A-', units: 8 },
//   { bloodGroup: 'B-', units: 5 },
//   { bloodGroup: 'AB-', units: 9 },
//   { bloodGroup: 'O-', units: 7 },
// ];

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AF19FF',
  '#FF4040',
  '#33FF33',
  '#33CCCC',
];

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { makeRequest } = useAPIClient();

  const fetchBloodInventory = async () => {
    try {
      const res = await makeRequest('/blood-inventory/');
      setData(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchBloodInventory();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div style={{ backgroundColor: '#fff', padding: '20px' }}>
              <BarChart width={600} height={400} data={data}>
                <CartesianGrid stroke="#ccc" strokeWidth={1} />
                <XAxis dataKey="bloodGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="units" fill="#8884d8" />
              </BarChart>
            </div>
          </Col>
          <Col>
            <div style={{ backgroundColor: '#fff', padding: '20px' }}>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  dataKey="units"
                  nameKey="bloodGroup"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 g-3">
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
              title="Search a donar"
              description="Seeking blood donors nearby. Find donors quickly for urgent needs. Save lives together"
              path="images/search.jpg"
              url="/search-donar"
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Tile
              title="Manage user"
              description="You can add, update, and delete users"
              path="images/user.jpg"
              url="/users"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
