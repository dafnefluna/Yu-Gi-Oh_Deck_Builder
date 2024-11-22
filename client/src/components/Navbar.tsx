import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!event.target.closest('.navbar') && expanded) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [expanded]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} onToggle={(isExpanded) => setExpanded(isExpanded)}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Yu-Gi-Oh Deck Builder
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="navbar" 
            onClick={() => setExpanded((prev) => !prev)} 
          />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse"
          onTransitionEnd={() => {
            if (!expanded) setExpanded(false);
          }}>
            <Nav className="ml-auto d-flex">
              <Nav.Link 
                as={Link} 
                to="/Search" 
                onClick={() => setExpanded(false)}
              >
                Search For Cards
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/Profile" 
                    onClick={() => setExpanded(false)}
                  >
                    My Profile
                  </Nav.Link>
                  <Nav.Link 
                    onClick={() => { Auth.logout(); setExpanded(false); }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link 
                  onClick={() => { setShowModal(true); setExpanded(false); }}
                >
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
