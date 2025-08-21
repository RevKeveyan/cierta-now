import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './style.scss';

const ContactButton = ({ text, btnclass, onSubmit, loading }) => {
  return (
    <Button
      onClick={onSubmit}
      className={btnclass}
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
        text
      )}
    </Button>
  );
};

export default ContactButton;
