import React from 'react'
import { LineChart } from '../../components/shared/LineChart'
import { Container, Row, Col } from 'react-bootstrap'

export const AdminHome = () => {
  return (
    <Container className="p-5" style={{ minHeight: 400 }}>
      <Row>
        <Col xs={12} sm={6} >
          <LineChart />
        </Col>
        <Col xs={12} sm={6}>
          <LineChart />
        </Col>
      </Row>
    </Container>
  );
}
