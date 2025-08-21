import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const ReceiverInfo = ({ formData, handleChange }) => {
  return (
    <>
      <h5 className="mt-4 border-bottom pb-2">Receiver Information</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="receiver.name"
              value={formData.receiver.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Contact *</Form.Label>
            <Form.Control
              type="text"
              name="receiver.contact"
              value={formData.receiver.contact}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="receiver.email"
              value={formData.receiver.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              type="text"
              name="receiver.address"
              value={formData.receiver.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default ReceiverInfo;