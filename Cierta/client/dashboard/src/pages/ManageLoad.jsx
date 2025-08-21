import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Table, Button, Badge } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { useHttp } from "../http-hook/http.hook";
import useLoadService from "../services/loadService.jsx";
import LoadForm from "../componenets/LoadForm.js/components/LoadForm/index.jsx";

const ManageLoadsPage = () => {
  const { request } = useHttp();
  const { searchLoads, createLoad, updateLoad, deleteLoad, getAllLoads } = useLoadService();
  const [searchTerm, setSearchTerm] = useState("");
  const [loads, setLoads] = useState([]);
  const [currentLoad, setCurrentLoad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const user = JSON.parse(localStorage.getItem("user"));

  // Initialize with first page of data
  useEffect(() => {
    fetchLoads(0);
  }, []);

  // Fetch loads with pagination
  const fetchLoads = async (page = 0) => {
    setLoading(true);
    setError(null);
    try {
      const results = await getAllLoads(page + 1, itemsPerPage);
      setLoads(results.loads);
      setTotalPages(results.totalPages);
      setCurrentPage(page);
      if (results.loads.length === 0) {
        setError("No loads found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAll = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    fetchLoads(0);
    setSearchTerm("");
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchLoads(searchTerm);
      setLoads(results);
      setTotalPages(0);
      setCurrentPage(0);
      if (results.length === 0) {
        setError("No loads found with this VIN");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (loadData) => {
    try {
      const newLoad = await createLoad(loadData, images);
      setLoads([newLoad, ...loads]);
      setShowForm(false);
      setCurrentLoad(null);
      setImages([]);
      fetchLoads(0);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateLoad(updates, images, deletedImages);
      setLoads(loads.map(l => l.id === id ? updated : l));
      setCurrentLoad(null);
      setShowForm(false);
      setImages([]);
      setDeletedImages([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this load?")) {
      try {
        await deleteLoad(id);
        setLoads(loads.filter(l => l.id !== id));
        if (loads.length === 1 && currentPage > 0) {
          fetchLoads(currentPage - 1);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle page change
  const handlePageClick = (event) => {
    fetchLoads(event.selected);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Reset image states when opening/closing form
  const resetImageStates = () => {
    setImages([]);
    setDeletedImages([]);
  };

  // Normalize load data to ensure arrays exist
  const normalizeLoad = (load) => {
    if (!load) {
      return {
        images: [],
        features: [],
        damages: [],
        // Add other array properties here
      };
    }
    return {
      ...load,
      images: Array.isArray(load.images) ? load.images : [],
      features: Array.isArray(load.features) ? load.features : [],
      damages: Array.isArray(load.damages) ? load.damages : [],
      // Ensure other array properties are arrays
    };
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Manage Loads</h1>
      
      {/* Search Section */}
      <Row className="mb-4">
        <Col md={8}>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search by VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              variant="primary" 
              onClick={handleSearch} 
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : 'Search'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleGetAll} 
              disabled={loading}
              className="ms-2"
            >
              {loading ? <Spinner size="sm" animation="border" /> : 'Get All'}
            </Button>
          </div>
        </Col>
        
        <Col md={4} className="text-end">
          {user && user.role !== "partner" && (
            <Button 
              variant="success" 
              onClick={(e) => {
                e.preventDefault()
                console.log(currentLoad);
                
                setCurrentLoad(null);
                resetImageStates();
                setShowForm(true);
              }}
            >
              Add New Load
            </Button>
          )}
        </Col>
      </Row>

      {/* Error Messages */}
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      {/* Load Form */}
      {showForm && (
        <LoadForm
          initialData={currentLoad}  // Fixed: Use normalized data
          images={images}
          setImages={setImages}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
          onSubmit={currentLoad ? 
            (data) => handleUpdate(currentLoad._id, data) : 
            handleCreate
          }
          onCancel={() => {
            setShowForm(false);
            setCurrentLoad(null);
            resetImageStates();
          }}
        />
      )}

      {/* Results Section */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading loads...</p>
        </div>
      ) : loads.length > 0 ? (
        <>
          <Table striped bordered hover responsive className="mb-4">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Carrier</th>
                <th>Pickup</th>
                <th>Delivery</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loads.map(load => (
                <tr key={load.id}>
                  <td>{load.Vin}</td>
                  <td>{load.carrier?.name || 'N/A'}</td>
                  <td>
                    {load.pickUpLocation?.city || 'N/A'}, {load.pickUpLocation?.state || 'N/A'}
                  </td>
                  <td>
                    {load.deliveryLocation?.city || 'N/A'}, {load.deliveryLocation?.state || 'N/A'}
                  </td>
                  <td>{load.type || 'N/A'}</td>
                  <td>
                    <Badge bg={getStatusColor(load.status)}>
                      {load.status || 'unknown'}
                    </Badge>
                  </td>
                  <td>
                    {user && user.role !== "partner" && (
                      <>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => {
                            setCurrentLoad(load);
                            resetImageStates();
                            setShowForm(true);
                          }}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(load._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={'< Previous'}
              nextLabel={'Next >'}
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
              forcePage={currentPage}
              disableInitialCallback={true}
            />
          )}
        </>
      ) : (
        !showForm && !loading && (
          <Alert variant="info" className="text-center">
            No loads found. Try searching or add a new load.
          </Alert>
        )
      )}
    </Container>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "in process": return "warning";
    case "picked up": return "primary";
    case "delivered": return "success";
    case "cancelled": return "danger";
    default: return "secondary";
  }
};

export default ManageLoadsPage;