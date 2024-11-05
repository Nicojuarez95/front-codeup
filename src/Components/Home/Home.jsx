import React from 'react';
import { Link as Anchor } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

import pizza from '../../Img/images.jfif';

export default function Home() {
  return (
    <section className="bg-light py-5 mt-12" style={{ minHeight: '50vh' }}>
    <Container>
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-left">
          <h1 className="display-4 font-weight-bold">¡Bienvenido a Nuestros Eventos!</h1>
          <p className="lead">Descubre los mejores eventos cerca de ti y únete a la diversión.</p>
          <Button
            variant="primary"
            size="lg"
            as={RouterLink} // Usamos RouterLink para la navegación
            to="/events"
            className="mt-4"
          >
            Ver Eventos
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <img 
            src={pizza} 
            alt="Eventos" 
            className="img-fluid rounded shadow" // Agregué shadow para un efecto visual
          />
        </Col>
      </Row>
    </Container>
  </section>
  );
}
