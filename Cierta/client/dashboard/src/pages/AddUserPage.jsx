import { useState, useEffect } from 'react';
import { 
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
  Spinner,
  ListGroup,
  Modal,
  Badge
} from 'react-bootstrap';
import useUserService from '../services/userService';

const AddUserPage = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    role: 'assistent',
    password: ''
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { 
    registerUser,
    getAllUsers,
    deleteUser,
    updateUser 
  } = useUserService();

  // Загрузка пользователей
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Создание пользователя
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      await fetchUsers();
      alert('User successfully created!');
      setForm({ name: '', email: '', role: 'assistent', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Удаление пользователя
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      try {
        await deleteUser(userId);
        await fetchUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Редактирование пользователя
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(selectedUser._id, selectedUser);
      await fetchUsers();
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
              Creating a new user
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company Name"
                    value={form.companyName}
                    onChange={(e) => setForm({...form, companyName: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={form.role}
                    onChange={(e) => setForm({...form, role: e.target.value})}
                  >
                    <option value="assistent">Assistant</option>
                    <option value="admin">Administrator</option>
                    <option value="partner">Partner</option>
                  </Form.Select>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'Add User'
                  )}
                </Button>

                {error && (
                  <Alert variant="danger" className="mt-3 mb-0">
                    {error}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">List of users</Card.Title>
              
              {error && <Alert variant="danger">{error}</Alert>}

              <ListGroup>
                {users.map(user => (
                  <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">{user.name}</h5>
                      <small className="text-muted">{user.email}</small>
                      <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'} className="ms-2">
                        {user.role}
                      </Badge>
                    </div>
                    <div>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEdit(user)}
                      >
                        ✎
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        ✕
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Модальное окно редактирования */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />

                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company Name"
                    value={selectedUser.companyName}
                    onChange={(e) => setSelectedUser({...selectedUser, companyName: e.target.value})}
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                <option value="assistent">Assistant</option>
                <option value="admin">Administrator</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddUserPage;