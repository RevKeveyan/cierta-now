import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';

const VehicleDetails = ({ formData, handleChange }) => {
  return (
    <Card className="p-3 h-100">
      <h5>Vehicle Details</h5>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              name="vehicleDetails.make"
              value={formData.vehicleDetails.make}
              onChange={handleChange}
              placeholder="Brand"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="vehicleDetails.model"
              value={formData.vehicleDetails.model}
              onChange={handleChange}
              placeholder="Model"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-2">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="vehicleDetails.year"
              value={formData.vehicleDetails.year}
              onChange={handleChange}
              placeholder="Manufacture year"
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="vehicleDetails.color"
              value={formData.vehicleDetails.color}
              onChange={handleChange}
              placeholder="Vehicle color"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mileage (miles)</Form.Label>
            <Form.Control
              type="number"
              name="vehicleDetails.mileage"
              value={formData.vehicleDetails.mileage}
              onChange={handleChange}
              placeholder="Current mileage"
              min="0"
            />
          </Form.Group>
        </Col>
      </Row>
    </Card>
  );
};

export default VehicleDetails;