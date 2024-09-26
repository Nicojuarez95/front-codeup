import React from 'react';
import { Link as Anchor } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import pizza from '../../Img/pizza.jpg';

export default function Home() {
  return (
    <section className="bg-light py-5" style={{ minHeight: '100vh' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-left">
            <h1 className="display-4 font-weight-bold">¡Bienvenido a Nuestros Eventos!</h1>
            <p className="lead">Descubre los mejores eventos cerca de ti y únete a la diversión.</p>
            <Button variant="primary" size="lg" as={Anchor} to="/events" className="mt-3">
              Ver Eventos
            </Button>
          </Col>
          <Col md={6}>
            <img 
              src={pizza} 
              alt="Eventos" 
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
