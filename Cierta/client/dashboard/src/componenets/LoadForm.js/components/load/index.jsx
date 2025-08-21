import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const LoadDetails = ({ formData, handleChange }) => {
  return (
    <>
      <h5 className="mt-4 border-bottom pb-2">Load Details</h5>
      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Weight (kg) *</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="1"
            />
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Value ($)</Form.Label>
            <Form.Control
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              min="0"
            />
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Insurance</Form.Label>
            <div className="mt-2">
              <Form.Check
                type="switch"
                id="insurance-switch"
                label="Insured"
                name="insurance"
                checked={formData.insurance}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Dimensions (m)</Form.Label>
            <div className="d-flex gap-1">
              <Form.Control
                placeholder="L"
                name="dimensions.length"
                value={formData.dimensions.length}
                onChange={handleChange}
              />
              <Form.Control
                placeholder="W"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleChange}
              />
              <Form.Control
                placeholder="H"
                name="dimensions.height"
                value={formData.dimensions.height}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Pickup Date *</Form.Label>
            <Form.Control
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Delivery Date *</Form.Label>
            <Form.Control
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Special Requirements</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          placeholder="Special handling, temperature control, etc."
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Detailed description of the load"
        />
      </Form.Group>
    </>
  );
};

export default LoadDetails;