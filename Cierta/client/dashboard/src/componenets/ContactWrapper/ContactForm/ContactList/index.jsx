// components/ContactList.jsx
import { useEffect, useState } from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import useContactService from '../../../../services/contactService';

const ContactList = ({ onEdit }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getContacts, deleteContact } = useContactService();

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete Contact?')) {
      await deleteContact(id);
      await fetchContacts();
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <ListGroup>
      {/* {contacts.map(contact => ( */}
        <ListGroup.Item key={contacts._id} className="d-flex justify-content-between align-items-center">
          <div>
            <div>{contacts.address}</div>
            <small className="text-muted">{contacts.phone}</small>
            <small className="text-muted d-block">{contacts.email}</small>
          </div>
          <div>
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="me-2"
              onClick={() => onEdit(contacts._id, contacts)}
            >
              ✎
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => handleDelete(contacts._id)}
            >
              ✕
            </Button>
          </div>
        </ListGroup.Item>
      {/* ))} */}
    </ListGroup>
  );
};

export default ContactList;