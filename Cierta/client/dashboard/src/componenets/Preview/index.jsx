// src/components/Preview.js
import { Card } from "react-bootstrap";
import { API_URL } from "../../helpers";

const Preview = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="mt-5">
      {data.image && (
        <Card.Img
          variant="top"
          src={typeof data.image === "string" ? `${API_URL}/${data.image}` : URL.createObjectURL(data.image)}
          alt="preview"
        />
      )}
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{data.subtitle}</Card.Subtitle>
        <Card.Text>{data.text || data.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Preview;
