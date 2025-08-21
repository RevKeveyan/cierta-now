// components/EmailModal.jsx
import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './style.scss';
import useRequestService from '../../../service/requestService';

const EmailModal = ({ show, onHide }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {getHelp} = useRequestService()

  const onSubmit = (data) => {
    getHelp(data)
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Contact Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="What's this about?"
              {...register('subject', { required: 'Subject is required' })}
              isInvalid={!!errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              placeholder="How can we help you?"
              {...register('message', { 
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message should be at least 10 characters'
                }
              })}
              isInvalid={!!errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Send Message
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmailModal;