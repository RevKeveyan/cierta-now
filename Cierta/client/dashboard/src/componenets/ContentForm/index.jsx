import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHttp } from "../../http-hook/http.hook"

import Preview from "../Preview";
import useContentService from "../../services/contentService";
const SERVICE_TYPES = [
  'Truckload',
  'LTL',
  'Boats',
  'Warehousing',
  'Vehicles: Cars',
  'Vehicles: RVs',
  'Vehicles: Motorcycles'
];
const ContentForm = ({ type, editId, editData, cancelEdit, refresh }) => {
  const { updateContent, addContent } = useContentService();
  const [formData, setFormData] = useState({
    type, // Используем вычисленный тип
    title: "",
    subtitle: "",
    text: "",
    image: null,
    serviceType: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type, // Берем актуальный тип из данных
        title: editData.title || "",
        subtitle: editData.subtitle || "",
        text: editData.text || "",
        image: editData.image || null,
        serviceType: editData.serviceType || ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId ? updateContent : addContent;
    
    // Формируем данные на основе текущего типа в форме
    const requestData = formData.type === 'service' 
      ? formData 
      : { ...formData, serviceType: undefined };

    const call = editId 
      ? action(editId, requestData) 
      : action(requestData);
    call.then(() => {
      refresh();
      setFormData({ 
        type, 
        title: "", 
        subtitle: "", 
        text: "", 
        image: null,
        serviceType: "" 
      });
      cancelEdit();
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* поля */}
        {type === 'service' && (
          <Form.Group className="mb-3">
            <Form.Label>Service Type</Form.Label>
            <Form.Select 
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required={type === 'service'}
            >
              <option value="">Select service type</option>
              {SERVICE_TYPES.map((serviceType) => (
                <option key={serviceType} value={serviceType}>
                  {serviceType}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control name="subtitle" value={formData.subtitle} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" name="text" value={formData.text} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
        </Form.Group>

        <Button type="submit" className="me-2">
          {editId ? "Обновить" : "Add"} {type}
        </Button>
        {editId && (
          <Button variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
      </Form>

      <Preview data={formData} />
    </>
  );
};

export default ContentForm;
