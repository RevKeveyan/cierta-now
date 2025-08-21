import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Badge,
  Modal,
  Card,
  Table,
} from "react-bootstrap";
import {
  FaSearch,
  FaExternalLinkAlt,
  FaTruckLoading,
  FaTruck,
  FaUserClock,
} from "react-icons/fa";
import useLoadService from "../services/loadService";
import "../style.scss";
import { API_URL } from "../helpers";
import GalleryModal from "../componenets/galerrymodal";
import ReactPaginate from "react-paginate";

const PartnerLoadsView = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loads, setLoads] = useState([]);
  const itemsPerPage = 10;
  const user = JSON.parse(localStorage.getItem("user"));
  const { searchLoads, getAllLoads } = useLoadService();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLoad, setCurrentLoad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVehicleGallery, setShowVehicleGallery] = useState(false);
  const [showDriverGallery, setShowDriverGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const results = await searchLoads(searchTerm);
      if (results.length > 0) {
        setCurrentLoad(results[0]);
      } else {
        setError("No loads found with this VIN");
        setCurrentLoad(null);
      }
    } catch (err) {
      setError(err.message);
      setCurrentLoad(null);
    } finally {
      setLoading(false);
    }
  };
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
  useEffect(() => {
    fetchLoads(0);
  }, []);
  const handlePageClick = (event) => {
    fetchLoads(event.selected);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in process":
        return "warning";
      case "picked up":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const openVehicleGallery = (index) => {
    setSelectedImageIndex(index);
    setShowVehicleGallery(true);
  };

  const openDriverGallery = (index) => {
    setSelectedImageIndex(index);
    setShowDriverGallery(true);
  };

  useEffect(() => {
    const searchInput = document.getElementById("vin-search");
    searchInput?.focus();
  }, []);

  return (
    <Container className="py-5 partner-loads-view">
      <h1 className="mb-4 text-center">Load Information</h1>

      <Row className="mb-4 justify-content-center">
        <Col md={8} lg={6}>
          <div className="input-group">
            <input
              id="vin-search"
              type="text"
              className="form-control"
              placeholder="Enter VIN number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Searching...
                </>
              ) : (
                <>
                  <FaSearch className="me-1" /> Search
                </>
              )}
            </button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Alert variant="danger" className="mb-4 text-center">
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {currentLoad && !loading && (
        <div className="border rounded p-3 bg-white shadow-sm mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Unit Information</h4>
            <div className="text-muted small">
              Created: {formatDate(currentLoad.createdAt)}
            </div>
             <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setCurrentLoad(null)}
        >
          × Close
        </Button>
          </div>

          <Row className="mb-4 g-3">
            <Col xs={6} md={4} lg={2}>
              <div className="text-muted small">Assigned Date</div>
              <div className="fw-bold">{formatDate(currentLoad.createdAt)}</div>
            </Col>

            {currentLoad.aging != null && (
              <Col xs={6} md={4} lg={2}>
                <div className="text-muted small">Aging</div>
                <div className="fw-bold">{currentLoad.aging} days</div>
              </Col>
            )}

            <Col xs={6} md={4} lg={4}>
              <div className="text-muted small">VIN</div>
              <div className="fw-bold text-truncate">{currentLoad.Vin}</div>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <div className="text-muted small">Type</div>
              <div className="fw-bold">
                <Badge bg="info">{currentLoad.type}</Badge>
              </div>
            </Col>

            {currentLoad.pickUpLocation?.city &&
              currentLoad.pickUpLocation?.state && (
                <Col xs={6} md={4} lg={2}>
                  <div className="text-muted small">Pickup</div>
                  <div className="fw-bold">
                    {currentLoad.pickUpLocation.city},{" "}
                    {currentLoad.pickUpLocation.state}
                  </div>
                </Col>
              )}

            {currentLoad.deliveryLocation?.city &&
              currentLoad.deliveryLocation?.state && (
                <Col xs={6} md={4} lg={2}>
                  <div className="text-muted small">Delivery</div>
                  <div className="fw-bold">
                    {currentLoad.deliveryLocation.city},{" "}
                    {currentLoad.deliveryLocation.state}
                  </div>
                </Col>
              )}
          </Row>

          {currentLoad.carrier.carrierImageFile?.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Driver Photos</h5>
                <span className="text-muted small">
                  {currentLoad.carrier.carrierImageFile?.length} photos
                </span>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-2">
                  {currentLoad.carrier.carrierImageFile?.map((img, index) => (
                    <div
                      key={index}
                      className="thumbnail-container"
                      onClick={() => openDriverGallery(index)}
                    >
                      <img
                        src={`${API_URL}/${img}`}
                        alt={`Driver ${index + 1}`}
                        className="thumbnail-img"
                      />
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}

          <div className="border-top pt-3">
            <h5 className="mb-3 fw-bold">Shipment Details</h5>
            <Row className="g-3">
              <Col xs={4}>
                <div className="text-muted small">Status</div>
                <div>
                  <Badge
                    bg={getStatusColor(currentLoad.status)}
                    className="fs-6 p-2"
                  >
                    {currentLoad.status.toUpperCase()}
                  </Badge>
                </div>

                {currentLoad.tracing && (
                  <>
                    <div className="text-muted small mt-2">Tracking</div>
                    <div>
                      <a
                        href={currentLoad.tracing}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <FaExternalLinkAlt className="me-1" /> Track
                      </a>
                    </div>
                  </>
                )}
              </Col>

              {currentLoad.specialRequirements && (
                <Col xs={4}>
                  <div className="text-muted small">Special Requirements</div>
                  <div>
                    <p>{currentLoad.specialRequirements}</p>
                  </div>
                </Col>
              )}

              {(currentLoad.pickUpDate || currentLoad.deliveryDate) && (
                <Col xs={2}>
                  <div className="text-muted small">ETAs</div>
                  <div className="d-flex flex-wrap gap-2">
                    {currentLoad.pickUpDate && (
                      <Button variant="outline-info" size="sm">
                        <FaTruckLoading className="me-1" />
                        {formatDate(currentLoad.pickUpDate)}
                      </Button>
                    )}
                    {currentLoad.deliveryDate && (
                      <Button variant="outline-success" size="sm">
                        <FaTruck className="me-1" />
                        {formatDate(currentLoad.deliveryDate)}
                      </Button>
                    )}
                  </div>
                </Col>
              )}

              {currentLoad.value && (
                <Col xs={4}>
                  <div className="text-muted small">Value</div>
                  <div>
                    <p>${currentLoad.value}</p>
                  </div>
                </Col>
              )}

              {currentLoad.vehicleDetails?.make && (
                <Col xs={4}>
                  <div className="text-muted small">Make</div>
                  <div>
                    <p>{currentLoad.vehicleDetails.make}</p>
                  </div>
                </Col>
              )}

              {currentLoad.vehicleDetails?.model && (
                <Col xs={4}>
                  <div className="text-muted small">Model</div>
                  <div>
                    <p>{currentLoad.vehicleDetails.model}</p>
                  </div>
                </Col>
              )}

              {currentLoad.vehicleDetails?.year && (
                <Col xs={4}>
                  <div className="text-muted small">Year</div>
                  <div>
                    <p>{currentLoad.vehicleDetails.year}</p>
                  </div>
                </Col>
              )}

              {currentLoad.vehicleDetails?.color && (
                <Col xs={4}>
                  <div className="text-muted small">Color</div>
                  <div>
                    <p>{currentLoad.vehicleDetails.color}</p>
                  </div>
                </Col>
              )}

              {currentLoad.vehicleDetails?.mileage && (
                <Col xs={4}>
                  <div className="text-muted small">Mileage</div>
                  <div>
                    <p>{currentLoad.vehicleDetails.mileage} miles</p>
                  </div>
                </Col>
              )}

              {currentLoad.carrier?.name && (
                <Col xs={4}>
                  <div className="text-muted small">Carrier</div>
                  <div>
                    <p>{currentLoad.carrier.name}</p>
                  </div>
                </Col>
              )}

              {currentLoad.carrier?.contact && (
                <Col xs={4}>
                  <div className="text-muted small">Carrier Contact</div>
                  <div>
                    <p>{currentLoad.carrier.contact}</p>
                  </div>
                </Col>
              )}

              {currentLoad.carrier?.email && (
                <Col xs={4}>
                  <div className="text-muted small">Carrier Email</div>
                  <div>
                    <p>{currentLoad.carrier.email}</p>
                  </div>
                </Col>
              )}
            </Row>
          </div>

          {currentLoad.images?.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Vehicle Photos</h5>
                <span className="text-muted small">
                  {currentLoad.images.length} photos
                </span>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-2">
                  {currentLoad.images.map((img, index) => (
                    <div
                      key={index}
                      className="thumbnail-container"
                      onClick={() => openVehicleGallery(index)}
                    >
                      <img
                        src={`${API_URL}/${img}`}
                        alt={`Vehicle ${index + 1}`}
                        className="thumbnail-img"
                      />
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
          
        </div>
      )}

      <GalleryModal
        show={showVehicleGallery}
        onHide={() => setShowVehicleGallery(false)}
        images={currentLoad?.images || []}
        title="Vehicle Photos"
        apiUrl={API_URL}
        startIndex={selectedImageIndex}
      />

      <GalleryModal
        show={showDriverGallery}
        onHide={() => setShowDriverGallery(false)}
        images={currentLoad?.carrier?.carrierImageFile || []}
        title="Driver Photos"
        apiUrl={API_URL}
        startIndex={selectedImageIndex}
      />

      {!currentLoad && !loading && !error && (
        <div className="text-center py-5 border rounded bg-light shadow-sm">
          <div className="mb-4">
            <FaSearch className="fs-1 text-muted" />
          </div>
          <h4>Search for a Load</h4>
          <p className="text-muted">
            Enter a VIN number to view shipment details
          </p>
        </div>
      )}
      {loads.length > 0 ? (
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
              {loads.map((load) => (
                <tr key={load.id}>
                  <td>{load.Vin}</td>
                  <td>{load.carrier?.name || "N/A"}</td>
                  <td>
                    {load.pickUpLocation?.city || "N/A"},{" "}
                    {load.pickUpLocation?.state || "N/A"}
                  </td>
                  <td>
                    {load.deliveryLocation?.city || "N/A"},{" "}
                    {load.deliveryLocation?.state || "N/A"}
                  </td>
                  <td>{load.type || "N/A"}</td>
                  <td>
                    <Badge bg={getStatusColor(load.status)}>
                      {load.status || "unknown"}
                    </Badge>
                  </td>
                  <td></td>
                  <td>
                    {" "}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // чтобы не срабатывал onClick у <tr>
                        setCurrentLoad(load);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={"< Previous"}
              nextLabel={"Next >"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              forcePage={currentPage}
              disableInitialCallback={true}
            />
          )}
        </>
      ) : (
        !showForm &&
        !loading && (
          <div className="text-center py-5 border rounded bg-light shadow-sm">
            <div className="mb-4">
              <FaSearch className="fs-1 text-muted" />
            </div>
            <h4>Search for a Load</h4>
            <p className="text-muted">
              Enter a VIN number to view shipment details
            </p>
          </div>
        )
      )}
    </Container>
  );
};

export default PartnerLoadsView;
