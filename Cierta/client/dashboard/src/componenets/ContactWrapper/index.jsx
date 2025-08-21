// components/ContactPage.jsx
import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactForm/ContactList";

const ContactPage = () => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleEdit = (id, data) => {
    setEditId(id);
    setEditData(data);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData(null);
  };

  return (
    <div>
      <h2>Contact Management</h2>
      <ContactForm
        editId={editId}
        editData={editData}
        cancelEdit={handleCancelEdit}
        refresh={() => setRefreshCounter(prev => prev + 1)}
      />
      <ContactList 
        onEdit={handleEdit}
        key={refreshCounter}
      />
    </div>
  );
};

export default ContactPage;