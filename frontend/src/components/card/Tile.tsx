import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './tile.scss';

const Tile = ({ title, description, path, url }: any) => {
  const navigate = useNavigate();

  return (
    <Card className="tile" onClick={() => navigate(url)}>
      <Card.Img style={{ height: '50%' }} variant="top" src={path} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Tile;
