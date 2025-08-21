import { ButtonGroup, Button } from "react-bootstrap";

const PolicySelector = ({ pageType, setPageType }) => {
  const options = [
    { name: "Terms & Conditions", value: "terms" },
    { name: "Privacy Policy", value: "privacy" },
  ];

  return (
    <ButtonGroup className="mb-4">
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant={pageType === option.value ? "primary" : "outline-primary"}
          onClick={() => setPageType(option.value)}
        >
          {option.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default PolicySelector;