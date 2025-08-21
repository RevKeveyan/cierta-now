import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryModal = ({ 
  show, 
  onHide, 
  images, 
  title,
  apiUrl = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!images || images.length === 0) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      size="lg"
      centered
      onExited={() => setCurrentIndex(0)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center position-relative">
        <Button 
          variant="light" 
          className="position-absolute start-0 top-50 translate-middle-y rounded-circle p-2"
          onClick={handlePrev}
          style={{ zIndex: 1 }}
        >
          <FaChevronLeft />
        </Button>
        
        <div className="d-flex justify-content-center">
          <img
            src={`${apiUrl}/${images[currentIndex]}`}
            alt={`${title} ${currentIndex + 1}`}
            className="img-fluid"
            style={{ maxHeight: "70vh" }}
          />
        </div>
        
        <Button 
          variant="light" 
          className="position-absolute end-0 top-50 translate-middle-y rounded-circle p-2"
          onClick={handleNext}
          style={{ zIndex: 1 }}
        >
          <FaChevronRight />
        </Button>
        
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2">
          <span className="badge bg-dark">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GalleryModal;