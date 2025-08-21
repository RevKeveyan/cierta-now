// src/components/PolicySectionList.js
import { Card, Button, ListGroup, Badge, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import PolicyContentForm from "../PolicyContentForm";

const PolicySectionList = ({
  sections,
  onEdit,
  onDelete,
  onAddContent,
  onRemoveContent,
}) => {
  const [activeContentFormId, setActiveContentFormId] = useState(null);

  if(sections)
  return (
    <>
      {sections.length > 0 && sections.map((section) => (
        <Card className="mb-4" key={section._id}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h5 className="mb-0">{section.title}</h5>
                {section.subtitle && (
                  <h6 className="text-muted mb-0">{section.subtitle}</h6>
                )}
                {section.effectiveDate && (
                  <small className="text-muted">
                    Effective: {new Date(section.effectiveDate).toLocaleDateString()}
                  </small>
                )}
              </div>
              <div>
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(section)}>
                  ✏️
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(section._id)}
                  className="ms-2"
                >
                  🗑
                </Button>
              </div>
            </div>

            {section.content.length > 0 && section.content.map((item, index) => (
              <ListGroup.Item key={index} className="mb-3">
                <Row>
                  <Col>
                    <Badge bg="secondary" className="me-2">
                      {item.type}
                    </Badge>
                    {item.type === "paragraph" && (
                      <>
                        {item.firstSentence && (
                          <div className="fw-bold text-primary mb-2">
                            {item.firstSentence}
                          </div>
                        )}
                        <div>{item.text}</div>
                      </>
                    )}
                    {item.type === "list" && (
                      <ul className="mb-0 ps-4">
                        {item.items.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onRemoveContent(section._id, index)}
                    >
                      ❌
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            {activeContentFormId === section._id ? (
              <PolicyContentForm
                onAdd={(contentItem) => {
                  onAddContent(section._id, contentItem);
                  setActiveContentFormId(null);
                }}
                onCancel={() => setActiveContentFormId(null)}
              />
            ) : (
              <Button
                variant="outline-success"
                onClick={() => setActiveContentFormId(section._id)}
              >
                ➕ Add paragraph / list
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PolicySectionList;
