import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleFormType = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      
    </Container>
  );
};

export default LandingPage;
