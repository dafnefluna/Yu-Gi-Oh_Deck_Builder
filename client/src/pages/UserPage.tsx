import { Button, Avatar, Row, Col, Card, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AvatarPic from '../assets/Avatar_Bananas.png';

const { Content } = Layout;

const UserPage = () => {
  useEffect(() => {
    document.body.classList.add('noScroll');

    return () => {
      document.body.classList.remove('noScroll');
    };
  }, []);

  return (
    <>
      <div className="backgroundStyle"></div>
      <div className="containerPage">
          <Content>
            <Row justify="center" gutter={[0, 16]} style={{ marginTop: '20px' }}>
              <Col xs={24} md={12} lg={10}>
                <Card className="text-center" bordered style={{ boxShadow: '0 4px 12px' }}>
                  <Avatar
                    size={{ xs: 180, sm: 250, md: 300, lg: 350, xl: 400, xxl: 500 }}
                    src={AvatarPic}
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                  <Card.Meta
                    title="Sergio Torres"
                    description={
                      <>
                        <p className = 'userBio'>This is my Bio!</p>
                        <p className = 'extraText'>Let's Battle!</p>
                      </>
                    }
                    style={{ textAlign: 'center', marginTop: '16px' }}
                  />
                  <div style={{ marginTop: '20px' }}>
                    <Link to="/Search">
                      <Button type="primary" block size="large" className = 'customButton'>
                        Search for Cards
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row justify="center" style={{ marginTop: '30px' }}>
              <Col xs={24} md={16}>
                <Row gutter={[16, 16]} justify="space-around">
                  <Col xs={12}>
                    <Link to="/MyCollection">
                      <Button type="default" block size="large" className = 'customButton'>
                        Card Collection
                      </Button>
                    </Link>
                  </Col>

                  <Col xs={12}>
                    <Link to="/DeckCreator">
                    <Button type="default" block size="large" className = 'customButton'>
                    Deck Creator
                      </Button>
                    </Link>
                  </Col>

                  <Col xs={12}>
                    <Link to="/MyDecks">
                    <Button type="default" block size="large" className = 'customButton'>
                    My Decks
                      </Button>
                    </Link>
                  </Col>

                  <Col xs={12}>
                    <Link to="/Settings">
                    <Button type="default" block size="large" className = 'customButton'>
                    Settings
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
      </div>
    </>
  );
};

export default UserPage;
