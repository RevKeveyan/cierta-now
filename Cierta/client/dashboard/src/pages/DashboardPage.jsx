import { Container } from "react-bootstrap";
import { useForm } from "../context/FormContext";

import FormSelector from "../componenets/FormSelector";
import ContentForm from "../componenets/ContentForm";
import ContentList from "../componenets/ContentList";
import BlogForm from "../componenets/BlogForm";
import TermsForm from "../componenets/terms&else/PolicySectionForm";
import { useFormEdit } from "../componenets/FormEdit";
import PolicyEditorPage from "../componenets/terms&else/PolicyEditor";
import BlogPage from "../componenets/BlogForm/BlogWrapper";
import ContactPage from "../componenets/ContactWrapper";
import ScrollToTop from "../componenets/totop";
import ManageLoadsPage from "./ManageLoad";
import PartnerLoadsView from "./LoadInfo";

const DashboardPage = () => {
  const { selectedForm } = useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  const contentEdit = useFormEdit();

  const refresh = () => {
    // Можно Updateглобально, если будет контекст или useState выше
  };

  return (
    <Container className="py-5">
   {user && user.role !=="partner" ? <>
        <h1 className="mb-4">Dashboard</h1>
        <FormSelector />
        <ScrollToTop />
        {["slider", "service"].includes(selectedForm) && (
          <>
            <ContentForm
              type={selectedForm}
              editId={contentEdit.editId}
              editData={contentEdit.editData}
              cancelEdit={contentEdit.cancelEdit}
              refresh={refresh}
            />
            <ContentList type={selectedForm} onEdit={contentEdit.startEdit} />
          </>
        )}
        {selectedForm === "contacts" && <ContactPage />}
        {selectedForm === "blog" && <BlogPage />}
        {selectedForm === "terms" && <PolicyEditorPage />}
        {selectedForm === "loads" && <ManageLoadsPage />}
      </>: <PartnerLoadsView />
      }
    </Container>
  );
};

export default DashboardPage;
