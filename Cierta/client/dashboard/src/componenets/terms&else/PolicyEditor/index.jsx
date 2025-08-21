// src/pages/PolicyEditorPage.js
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useHttp } from "../../../http-hook/http.hook";
import {
  getPolicySections,
  createPolicySection,
  updatePolicySection,
  deletePolicySection,
  addContentItem,
  removeContentItem,
} from "../../../services/termsService";
import PolicySelector from "../PolicySelector";
import PolicySectionForm from "../PolicySectionForm";
import PolicySectionList from "../PolicySectionList";

const PolicyEditorPage = () => {
  const { request, loadingStatus } = useHttp();
  const [pageType, setPageType] = useState("terms");
  const [sections, setSections] = useState([]);
  const [editSection, setEditSection] = useState(null);

  // Загрузка разделов по типу страницы
  const fetchSections = () => {
    getPolicySections(request, pageType).then((data) => setSections(data || []));
  };

  useEffect(() => {
    fetchSections();
    setEditSection(null);
  }, [pageType]);

  const handleCreateOrUpdate = (data) => {
    const action = editSection
      ? updatePolicySection(request, editSection._id, data)
      : createPolicySection(request, data);

    action.then(() => {
      fetchSections();
      setEditSection(null);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this section?")) {
      deletePolicySection(request, id).then(fetchSections);
    }
  };

  const handleAddContent = (sectionId, contentItem) => {
    addContentItem(request, sectionId, contentItem).then(fetchSections);
  };

  const handleRemoveContent = (sectionId, index) => {
    if (window.confirm("Delete this content?")) {
      removeContentItem(request, sectionId, index).then(fetchSections);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Policy Editor</h1>

      <PolicySelector pageType={pageType} setPageType={setPageType} />

      <Row className="my-4">
        <Col md={8}>
          <PolicySectionForm
            pageType={pageType}
            onSubmit={handleCreateOrUpdate}
            editData={editSection}
            cancelEdit={() => setEditSection(null)}
          />
        </Col>
      </Row>

      {/* {loadingStatus === "loading" ? (
        <Spinner animation="border" />
      ) : ( */}
        <PolicySectionList
          sections={sections}
          onEdit={setEditSection}
          onDelete={handleDelete}
          onAddContent={handleAddContent}
          onRemoveContent={handleRemoveContent}
        />
      {/* )} */}
    </Container>
  );
};

export default PolicyEditorPage;
