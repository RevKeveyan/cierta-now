// src/components/FormSelector.js
import { ButtonGroup, Button } from "react-bootstrap";
import { useForm } from "../../context/FormContext";
import { useEffect } from "react";

const FormSelector = () => {
  const { selectedForm, setSelectedForm } = useForm();
    const user = JSON.parse(localStorage.getItem("user"));

  const forms = [
    { key: "slider", label: "Add Slide" },
    { key: "service", label: "Add Service" },
    { key: "blog", label: "Add Blog" },
    { key: "terms", label: "Update Terms" },
    { key: "contacts", label: "Contact-info" },
    { key: "loads", label: "Manage Loads" },
  ];



  return (
    <ButtonGroup className="mb-4">
      {forms.map((form) => (
        <Button
          key={form.key}
          variant={selectedForm === form.key ? "primary" : "outline-primary"}
          onClick={() => setSelectedForm(form.key)}
        >
          {form.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FormSelector;
