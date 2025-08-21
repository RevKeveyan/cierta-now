import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FileUploader from "..";

const DocumentsSection = ({ 
  formData, 
  uploading, 
  handleFileUpload, 
  removeFile 
}) => {
  return (
    <>
      <h5 className="mt-4 border-bottom pb-2">Documents</h5>
      <div className="border rounded p-3 bg-light">
        <Row>
          <Col md={6}>
            <Form.Check 
              type="checkbox"
              label="Bill of Lading"
              id="bill-of-lading"
              checked={formData.documents.some(doc => doc.includes('bill-of-lading'))}
              disabled
            />
            <Form.Check 
              type="checkbox"
              label="Title"
              id="title"
              checked={formData.documents.some(doc => doc.includes('title'))}
              disabled
            />
            <Form.Check 
              type="checkbox"
              label="Insurance Certificate"
              id="insurance-cert"
              checked={formData.documents.some(doc => doc.includes('insurance-cert'))}
              disabled
            />
          </Col>
          
          <Col md={6}>
            <FileUploader
              type="document"
              label="Upload Documents"
              previewUrls={formData.documents}
              onUpload={(e) => handleFileUpload(e, "document")}
              onRemove={(index) => removeFile(index, "document")}
              uploading={uploading}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              description="PDF, DOC, JPG, PNG files"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DocumentsSection;