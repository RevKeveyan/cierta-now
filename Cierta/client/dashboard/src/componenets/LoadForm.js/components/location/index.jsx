import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';


const LocationInfo = ({ title, prefix, formData, handleChange }) => {
  return (
    <Card className="p-3 h-100">
      <h5>{title}</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              name={`${prefix}.city`}
              value={formData[prefix].city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>State *</Form.Label>
            <Form.Control
              type="text"
              name={`${prefix}.state`}
              value={formData[prefix].state}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Location Details</Form.Label>
        <Form.Control
          type="text"
          name={`${prefix}.loc`}
          value={formData[prefix].loc}
          onChange={handleChange}
          placeholder="Coordinates or address details"
        />
      </Form.Group>
    </Card>
  );
};

export default LocationInfo;