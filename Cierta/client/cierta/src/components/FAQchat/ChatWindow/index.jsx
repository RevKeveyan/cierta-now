import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.scss';
import EmailModal from '../../modals/FAQmodal';

const ChatWindow = ({ show, onHide, questions }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <>
      <Modal 
        show={show} 
        onHide={onHide} 
        className="cierta-chat-window"
      >
        <Modal.Header closeButton className="cierta-chat-header">
          <Modal.Title>Cierta Support</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cierta-chat-body">
          <div className="cierta-welcome-message">
            <p>How can we help you today?</p>
          </div>
          
          <div className="cierta-questions-list">
            {questions.map((item, index) => (
              <div key={index} className="cierta-question-item">
                <button
                  className={`cierta-question-button ${activeQuestion === index ? 'active' : ''}`}
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                >
                  {item.question}
                  <span className="cierta-chevron">
                    {activeQuestion === index ? '−' : '+'}
                  </span>
                </button>
                {activeQuestion === index && (
                  <div className="cierta-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="cierta-fallback">
          <p className="cierta-prompt-text">
              Didn't find your answer? 
              <br />
              Send us a message directly!
            </p>
            <Button 
              variant="primary" 
              onClick={() => setShowEmailModal(true)}
              className="cierta-email-button"
            >
              Contact Support Team
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      
      <EmailModal
        show={showEmailModal} 
        onHide={() => setShowEmailModal(false)} 
      />
    </>
  );
};

export default ChatWindow;