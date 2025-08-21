import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SenderInfo = ({ formData, handleChange }) => {
  return (
    <>
      <h5 className="mt-4 border-bottom pb-2">Sender Information</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="sender.name"
              value={formData.sender.name}
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
              name="sender.contact"
              value={formData.sender.contact}
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
              name="sender.email"
              value={formData.sender.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              type="text"
              name="sender.address"
              value={formData.sender.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default SenderInfo;