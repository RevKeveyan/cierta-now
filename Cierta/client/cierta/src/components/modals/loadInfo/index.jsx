// components/SearchModal.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form, Spinner, Alert, Table, Badge } from 'react-bootstrap';
import styles from './style.scss';
import useContentService from '../../../service/getContent';

const SearchModal = ({ show, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { searchLoads } = useContentService();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSearchResults([]);
      setExpandedRow(null);
      
      const results = await searchLoads(data.vin);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || 'Failed to search loads');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSearchResults([]);
    setError(null);
    setExpandedRow(null);
    onHide();
  };

  const toggleRowExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="secondary">Pending</Badge>;
      case 'in-transit':
        return <Badge bg="primary">In Transit</Badge>;
      case 'delivered':
        return <Badge bg="success">Delivered</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="warning">{status}</Badge>;
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      size="lg"
      className={styles.modalOverrides}
    >
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Find Load by VIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Vehicle Identification Number (VIN)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 1HGCM82633A123456"
              {...register('vin', { 
                required: 'VIN is required',
              })}
              isInvalid={!!errors.vin}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.vin?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2 mb-3">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Searching...
                </>
              ) : 'Search Loads'}
            </Button>
          </div>
        </Form>

        {/* Results Section */}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h5 className="mb-3">Found Loads</h5>
            <div className="table-responsive">
              <Table striped bordered hover className={styles.searchResultsTable}>
                <thead>
                  <tr>
                    <th>VIN</th>
                    <th>Transport Type</th>
                    <th>Pickup Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((load, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{load.vin}</td>
                        <td>{load.transportType}</td>
                        <td>{formatDate(load.pickupDate)}</td>
                        <td>{getStatusBadge(load.status)}</td>
                        <td>
                          <Button 
                            variant="link"
                            size="sm"
                            onClick={() => toggleRowExpand(index)}
                          >
                            {expandedRow === index ? 'Hide Details' : 'View Details'}
                          </Button>
                        </td>
                      </tr>
                      
                      {expandedRow === index && (
                        <tr>
                          <td colSpan="5">
                            <div className="p-3">
                              <h6>Load Details</h6>
                              <div className="row">
                                <div className="col-md-6">
                                  <p><strong>Description:</strong> {load.description || 'N/A'}</p>
                                  <p><strong>Special Requirements:</strong> {load.specialRequirements || 'None'}</p>
                                  <p><strong>Dimensions:</strong> 
                                    {load.dimensions ? 
                                      ` L: ${load.dimensions.length}, W: ${load.dimensions.width}, H: ${load.dimensions.height}` : 
                                      ' N/A'
                                    }
                                  </p>
                                  <p><strong>Weight:</strong> {load.weight || 'N/A'}</p>
                                  <p><strong>Value:</strong> {load.value ? `$${load.value}` : 'N/A'}</p>
                                  <p><strong>Insurance:</strong> {load.insurance ? 'Yes' : 'No'}</p>
                                </div>
                                
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h6>Sender Information</h6>
                                    <p><strong>Name:</strong> {load.sender?.name || 'N/A'}</p>
                                    <p><strong>Address:</strong> {load.sender?.address || 'N/A'}</p>
                                    <p><strong>Contact:</strong> {load.sender?.contact || 'N/A'}</p>
                                    <p><strong>Email:</strong> {load.sender?.email || 'N/A'}</p>
                                  </div>
                                  
                                  <div>
                                    <h6>Receiver Information</h6>
                                    <p><strong>Name:</strong> {load.receiver?.name || 'N/A'}</p>
                                    <p><strong>Address:</strong> {load.receiver?.address || 'N/A'}</p>
                                    <p><strong>Contact:</strong> {load.receiver?.contact || 'N/A'}</p>
                                    <p><strong>Email:</strong> {load.receiver?.email || 'N/A'}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <p><strong>Delivery Date:</strong> {formatDate(load.deliveryDate)}</p>
                                <p><strong>Created At:</strong> {formatDate(load.createdAt)}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {!loading && searchResults.length === 0 && !error && (
          <div className="text-center py-4 text-muted">
            No loads found. Enter a VIN to search.
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;