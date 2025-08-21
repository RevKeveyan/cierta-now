import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";

const PolicySectionForm = ({ pageType, onSubmit, editData, cancelEdit }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setSubtitle(editData.subtitle || "");
      setEffectiveDate(editData.effectiveDate || "");
    } else {
      setTitle("");
      setSubtitle("");
      setEffectiveDate("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ 
      title, 
      subtitle,
      effectiveDate,
      pageType 
    });
  };

  return (
    <Card className="p-4">
      <h5>{editData ? "Edit Section" : "Add new section"}</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Main Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Main section title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Optional subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Effective Date</Form.Label>
          <Form.Control
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            {editData ? "Update" : "Create"}
          </Button>
          {editData && (
            <Button variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default PolicySectionForm;