import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Preview from "../Preview";
import useBlogService from "../../services/blogService";
const BlogForm = ({ editId, editData, cancelEdit, refresh }) => {
  const { createBlog, updateBlog } = useBlogService();
  const [fileError, setFileError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        content: editData.content || "",
        tags: editData.tags?.join(", ") || "",
        image: editData.image || null,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if(name === "image" && files?.[0]) setFileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.image) {
      setFileError("Image is required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("tags", formData.tags.split(",").map(tag => tag.trim()).join(","));
    formDataToSend.append("image", formData.image);

    try {
      if (editId) {
        await updateBlog(editId, formDataToSend);
      } else {
        await createBlog(formDataToSend);
      }
      
      refresh();
      setFormData({ title: "", content: "", tags: "", image: null });
      cancelEdit?.();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image *</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            isInvalid={!!fileError}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fileError}
          </Form.Control.Feedback>
        </Form.Group>

        <Button 
          type="submit" 
          className="me-2"
          disabled={!formData.image} // Блокировка кнопки если нет изображения
        >
          {editId ? "Update" : "Add"} Blog
        </Button>
        {editId && (
          <Button variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
      </Form>

  
    </>
  );
};

export default BlogForm;