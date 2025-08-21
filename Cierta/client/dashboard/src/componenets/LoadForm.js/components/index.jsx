import React from "react";
import { Button, Image } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";

const FileUploader = ({ 
  type, 
  previewUrls, 
  onUpload, 
  onRemove, 
  uploading,
  accept,
  label,
  description
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      
      {previewUrls.length > 0 && (
        <div className="d-flex flex-wrap gap-3 mb-3">
          {previewUrls.map((url, index) => (
            <div key={index} className="position-relative" style={{ width: "150px" }}>
              {type === "image" ? (
                <Image 
                  src={url} 
                  thumbnail 
                  className="img-fluid"
                  style={{ height: "100px", objectFit: "cover" }}
                />
              ) : (
                <div className="border p-2 text-center">
                  <i className="bi bi-file-earmark-text fs-1"></i>
                  <p className="mb-0 text-truncate" style={{ maxWidth: "140px" }}>
                    Document {index + 1}
                  </p>
                </div>
              )}
              <Button 
                variant="danger" 
                size="sm" 
                className="position-absolute top-0 end-0"
                onClick={() => onRemove(index)}
                style={{ transform: "translate(50%, -50%)" }}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="d-flex align-items-center">
        <input
          type="file"
          id={`file-upload-${type}`}
          accept={accept}
          onChange={onUpload}
          multiple
          disabled={uploading}
          style={{ display: "none" }}
        />
        <Button 
          variant="outline-primary"
          disabled={uploading}
          onClick={() => document.getElementById(`file-upload-${type}`).click()}
        >
          <FaPlus className="me-1" /> Add
        </Button>
        <span className="ms-2">
          {uploading ? "Uploading..." : `Select ${type === "image" ? "images" : "files"}`}
        </span>
      </div>
      
      {description && (
        <div className="form-text">{description}</div>
      )}
    </div>
  );
};

export default FileUploader;