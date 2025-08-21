// AdminChoicePage.jsx
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
const AdminChoicePage = () => (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <Card.Title className="mb-4">Admin Panel</Card.Title>
              <Row className="g-4">
                <Col md={6}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>Users</Card.Title>
                      <Card.Text>
                      Managing Employee Accounts
                      </Card.Text>
                      <Button 
                        as={Link}
                        to="/admin/add-user"
                        variant="outline-primary"
                        className="w-100"
                      >
                        Add user
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>Content</Card.Title>
                      <Card.Text>
                      Website Content Management
                      </Card.Text>
                      <Button 
                        as={Link}
                        to="/dashboard"
                        variant="outline-success"
                        className="w-100"
                      >
                        Content Management
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
  export default AdminChoicePage;
