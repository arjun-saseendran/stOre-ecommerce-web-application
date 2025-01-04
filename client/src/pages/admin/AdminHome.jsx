import React from "react";
import { BarChart } from "../../components/shared/BarChart";
import { Container, Row, Col } from "react-bootstrap";
import { DoughnutChart } from "../../components/shared/DoughnutChart";

export const AdminHome = () => {
  return (
    <Container className="p-5" style={{ minHeight: 400 }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} sm={6}>
          <BarChart role="admin" />
        </Col>
        <Col xs={12} sm={6}>
          <DoughnutChart role="admin" />
        </Col>
      </Row>
    </Container>
  );
};
