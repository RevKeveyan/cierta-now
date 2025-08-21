import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FileUploader from "..";

const DamageReport = ({ 
  formData, 
  handleChange, 
  uploading, 
  handleFileUpload, 
  removeFile 
}) => {
  return (
    <>
      <h5 className="mt-4 border-bottom pb-2">Damage Report</h5>
      <div className="border rounded p-3 bg-light">
        <Row>
          <Col md={6}>
            <Form.Check 
              type="checkbox"
              label="Exterior damage present"
              id="exterior-damage"
              name="damageReport.exteriorDamage"
              checked={formData.damageReport.exteriorDamage}
              onChange={handleChange}
            />
            <Form.Check 
              type="checkbox"
              label="Interior damage present"
              id="interior-damage"
              name="damageReport.interiorDamage"
              checked={formData.damageReport.interiorDamage}
              onChange={handleChange}
            />
            <Form.Check 
              type="checkbox"
              label="Mechanical issues"
              id="mechanical-issues"
              name="damageReport.mechanicalIssues"
              checked={formData.damageReport.mechanicalIssues}
              onChange={handleChange}
            />
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Damage Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="damageReport.notes"
                value={formData.damageReport.notes}
                onChange={handleChange}
                placeholder="Describe any existing damage"
              />
            </Form.Group>
            
            <FileUploader
              type="image"
              label="Damage Photos"
              previewUrls={formData.damageReport.photos}
              onUpload={(e) => handleFileUpload(e, "damage")}
              onRemove={(index) => removeFile(index, "damage")}
              uploading={uploading}
              accept="image/*"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DamageReport;