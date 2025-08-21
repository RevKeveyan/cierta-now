// components/ContactForm.jsx
import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import useContactService from '../../../services/contactService';

const ContactForm = ({ editId, editData, cancelEdit, refresh }) => {
  const { createContact, updateContact } = useContactService();
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setFormData({
        address: editData.address || '',
        phone: editData.phone || '',
        email: editData.email || ''
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateContact(editId, formData);
      } else {
        await createContact(formData);
      }
      refresh();
      cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-5">
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          {editId ? 'Update' : 'Add'}
        </Button>
        {editId && (
          <Button variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ContactForm;