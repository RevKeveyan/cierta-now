import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import useBlogService from "../../../services/blogService";
import { API_URL } from "../../../helpers";


const BlogList = ({ onEdit }) => {
  const { getAllBlogs, deleteBlog } = useBlogService();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getAllBlogs();
    setBlogs(data.blogs || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete blog post?")) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Row className="mt-5">
      {blogs.map((blog) => (
        <Col md={6} lg={4} key={blog._id} className="mb-4">
          <Card>
            {blog.image && <Card.Img variant="top" src={`${API_URL}/${blog.image}`} />}
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
              <div className="mb-2">
                {blog.tags?.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="outline-primary" className="me-2" onClick={() => onEdit(blog._id, blog)}>
                Edit
              </Button>
              <Button variant="outline-danger" onClick={() => handleDelete(blog._id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;