import { useState } from "react";
import { Form, Button, Card, CloseButton } from "react-bootstrap";

const PolicyContentForm = ({ onAdd, onCancel }) => {
  const [type, setType] = useState("paragraph");
  const [text, setText] = useState("");
  const [firstSentence, setFirstSentence] = useState("");
  const [listItems, setListItems] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "paragraph") {
      if (!text.trim()) {
        alert("Paragraph text is required!");
        return;
      }
      
      onAdd({
        type: "paragraph",
        text: text.trim(),
        firstSentence: firstSentence.trim() || undefined
      });
    }

    if (type === "list") {
      const filteredItems = listItems.filter(item => item.trim());
      if (filteredItems.length === 0) {
        alert("At least one list item is required!");
        return;
      }
      
      onAdd({ 
        type: "list", 
        items: filteredItems 
      });
    }

    // Сброс полей
    setText("");
    setFirstSentence("");
    setListItems([""]);
    setType("paragraph");
  };

  const handleListChange = (index, value) => {
    const updated = [...listItems];
    updated[index] = value;
    setListItems(updated);
  };

  const addListItem = () => setListItems([...listItems, ""]);

  const removeListItem = (index) => {
    const updated = [...listItems];
    updated.splice(index, 1);
    setListItems(updated);
  };

  return (
    <Card className="p-3 mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Content Type</Form.Label>
          <Form.Select 
            value={type} 
            onChange={(e) => {
              setType(e.target.value);
              setText("");
              setFirstSentence("");
              setListItems([""]);
            }}
          >
            <option value="paragraph">Paragraph</option>
            <option value="list">List</option>
          </Form.Select>
        </Form.Group>

        {type === "paragraph" && (
          <>
            <Form.Group className="mb-2">
              <Form.Label>First Sentence (Optional)</Form.Label>
              <Form.Control
                value={firstSentence}
                onChange={(e) => setFirstSentence(e.target.value)}
                placeholder="Highlighted sentence (optional)"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Paragraph Text*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter paragraph content..."
                required
              />
            </Form.Group>
          </>
        )}

        {type === "list" && (
          <>
            <Form.Label>List Items*</Form.Label>
            {listItems.map((item, index) => (
              <div className="d-flex align-items-center mb-2" key={index}>
                <Form.Control
                  value={item}
                  onChange={(e) => handleListChange(index, e.target.value)}
                  placeholder={`Item ${index + 1}`}
                  required={index === 0}
                />
                {listItems.length > 1 && (
                  <CloseButton
                    className="ms-2"
                    onClick={() => removeListItem(index)}
                  />
                )}
              </div>
            ))}
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={addListItem}
              className="mt-2"
            >
              ➕ Add Item
            </Button>
          </>
        )}

        <div className="mt-3 d-flex gap-2">
          <Button type="submit" variant="primary">
            Save Content
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default PolicyContentForm; 