import { Button } from 'antd';
import { Avatar } from 'antd';

import {
    Container,
    Row,
    Col,
    Card,
    
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserPage = () => {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center shadow-sm">
              <Avatar 
                size = {{xs: 180, sm: 250, md: 300, lg: 350, xl: 400, xxl: 500}}
                src = {"https://preview.redd.it/would-this-make-exodia-viable-v0-0w9xrx32vw4c1.jpeg?width=640&crop=smart&auto=webp&s=99a27fa972b8f02aa1778367371a004e08a8b989"}
                style = {{marginLeft: "auto", marginRight: "auto"}}
              />
              <Card.Body>
                <Card.Title>Sergio Torres</Card.Title>
                <Card.Text>
                  This is my Bio!
                  Let's Battle!
                </Card.Text>

                <Link to="/Search">
                  <Button >
                    Search for Cards
                  </Button>
                </Link>

              </Card.Body>
            </Card>
          </Col>
        </Row>
  
        <Row className = 'justify-content-center'>
          <Col xs={12} sm={10} md={8} lg={6}>
            <Row className="gy-3">
              <Col xs={6}>
                <Link to="/MyCollection">
                  <Button variant="secondary" className="w-100" size = "large">
                    Card Collection
                  </Button>
                </Link>
              </Col>

              <Col xs={6}>
                <Link to="/DeckCreator">
                  <Button variant="secondary" className="w-100" size = "large">
                    Deck Creator
                  </Button>
                </Link>
              </Col>

              <Col xs={6}>
                <Link to="/MyDecks">
                  <Button variant="secondary" className="w-100" size = "large">
                    My Decks
                  </Button>
                </Link>
              </Col>

              <Col xs={6}>
                <Link to="/Settings">
                  <Button variant="secondary" className="w-100" size = "large">
                    Settings
                  </Button>
                </Link>
              </Col>
              
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default UserPage;