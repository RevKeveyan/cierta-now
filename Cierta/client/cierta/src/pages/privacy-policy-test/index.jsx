import { useEffect, useState } from "react";
import { Spinner, Alert, Container } from "react-bootstrap";
import "./style.scss";
import useContentService from "../../service/getContent";

const PolicyPage = ({ pageType }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPolicySections } = useContentService();

  useEffect(() => {

    getPolicySections(pageType, setSections, setLoading);
  }, [pageType]);


  const renderContent = (content) => {
    return content.map((item, index) => {
      if (item.type === "paragraph") {
        return (
          <div key={index} className="content-paragraph">
        
            <p>{item.firstSentence && (<strong>{item.firstSentence}</strong> )}{item.text}</p>
          </div>
        );
      }
      if (item.type === "list") {
        return (
          <ul key={index} className="content-list">
            {item.items.map((listItem, idx) => (
              <li key={idx} className="list-item">
                {listItem}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  if (loading) return <div className="loading-spinner"><Spinner animation="border" /></div>;

  if (error) return <Alert variant="danger" className="error-alert">Error: {error}</Alert>;

  return (
    <Container className="policy-page-container">
      {sections.map((section) => (
        <section key={section._id} className="policy-section">
          <div className="section-header">
            <h1 className="main-title">{section.title}</h1>
            {section.subtitle && <h2 className="subtitle">{section.subtitle}</h2>}
            {section.effectiveDate && (
              <div className="effective-date">
                Effective Date: {new Date(section.effectiveDate).toLocaleDateString('en-US')}
              </div>
            )}
          </div>
          <div className="section-content">
            {section.content && renderContent(section.content)}
          </div>
        </section>
      ))}
    </Container>
  );
};
export default PolicyPage;
