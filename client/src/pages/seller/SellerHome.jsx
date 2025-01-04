import React from "react";
import { BarChart } from "../../components/shared/BarChart";
import { Container, Row, Col } from "react-bootstrap";
import { DoughnutChart } from "../../components/shared/DoughnutChart";

export const SellerHome = () => {
  return (
    <Container className="p-5" style={{ minHeight: 450 }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} sm={6}>
          <BarChart role="seller" />
        </Col>
        <Col xs={12} sm={6}>
          <DoughnutChart role="seller" />
        </Col>
      </Row>
    </Container>
  );
};
