// src/components/ContentList.js
import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useHttp } from "../../http-hook/http.hook"
import useContentService from "../../services/contentService";
import { API_URL } from "../../helpers";


const ContentList = ({ type, onEdit }) => {
  const { getContentByType, deleteContent } = useContentService();

  const { request, loadingStatus } = useHttp();
  const [content, setContent] = useState([]);

  const fetchContent = () => {
    getContentByType(type, setContent);
  };

  useEffect(fetchContent, [type]);

  const handleDelete = (id) => {
    if (window.confirm("Delete item?")) {
      deleteContent(id).then(fetchContent);
    }
  };

  // if (loadingStatus === "loading") return <Spinner animation="border" />;

  return (
    <Row className="mt-5">
      {content.map((item) => (
        <Col md={6} lg={4} key={item._id} className="mb-4">
          <Card>
            {item.image && <Card.Img variant="top" src={`${API_URL}/${item.image}`} />}
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle>{item.subtitle}</Card.Subtitle>
              <Card.Text>{item.text}</Card.Text>
              <Button variant="outline-primary" className="me-2" onClick={() => onEdit(item._id, item)}>
                🖊 Edit
              </Button>
              <Button variant="outline-danger" onClick={() => handleDelete(item._id)}>
                🗑 Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ContentList;
