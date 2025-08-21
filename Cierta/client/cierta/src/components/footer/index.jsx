import React, { useEffect, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import Logo from "../../asstets/logo/Sietra.png";
import "./style.scss";
import { useFormSelection } from "../../context/formContext";
import useContentService from "../../service/getContent";

const Footer = () => {
   const location = useLocation();
  const navigate = useNavigate();
  const { getContacts } = useContentService();
  const [contact, setContact] = useState();

  useEffect(()=>{
    getContacts(setContact)
  },[])

  const [businessOpen, setBusinessOpen] = useState(false);
  const [individualOpen, setIndividualOpen] = useState(false);
  const { setSelectedService, setCustomerType } = useFormSelection();
  
  const handleNavigate = (hash) => {

    navigate(`/about#${hash}`);
  };
  const handleRedirectToForm = (type, service) => {
    setCustomerType(type);
    setSelectedService(service);
  
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "quote-form" } });
    } else {
      setTimeout(() => {
        document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  

  };


  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-column">
          <div className="footer-logo">
            <img src={Logo} alt="Cierta Logo" />
          </div>
          <p>
            <span className="icon_location">
              <MdLocationPin className="icon" />
            </span>
             {contact ? contact.address: "710 East Main Street Suite 201, Lexington, Kentucky 40502, United States"}
          </p>
          <p>
            <FiPhone className="icon" /> { contact ? contact.phone : "(606) 660-6618"}
          </p>
          <p>
            <FaRegEnvelope className="icon" />{ contact ? contact.email : "support@ciertacorp.com"}
          </p>
        </div>

        {/* For Businesses */}
        <div className="footer-column">
          <h4>For Businesses</h4>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("business", "Truckload")}>
            Truckload
           </div>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("business", "LTL")}>
            LTL
           </div>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("business", "Last Mile")}>
            Last Mile
           </div>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("business", "Boats")}>
            Boast
           </div>
          <div className="footer-dropdown">
            <div
              onClick={() => setBusinessOpen(!businessOpen)}
              className="footer-dropdown__toggle"
            >
              Vehicles <FaChevronDown />
            </div>
            {businessOpen && (
              <div className="footer-dropdown__menu">
                 <div className="footer-column__link"  
                  onClick={() =>
                    handleRedirectToForm("business", "Vehicles: Cars")
                  }
                >
                  Cars
                 </div>
                 <div className="footer-column__link"  
                  onClick={() =>
                    handleRedirectToForm("business", "Vehicles: Motorcycles")
                  }
                >
                  Motorcycles
                 </div>
                 <div className="footer-column__link"  
                  onClick={() =>
                    handleRedirectToForm("business", "Vehicles: RVs")
                  }
                >
                  RVs
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* For Individuals */}
        <div className="footer-column">
          <h4>For Individuals</h4>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("individual", "Truckload")}>
            Truckload (Full)
           </div>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("individual", "LTL")}>
            LTL
           </div>
           <div className="footer-column__link"  
            onClick={() => handleRedirectToForm("individual", "Door to Door")}
          >
            Door to Door
           </div>
           <div className="footer-column__link"   onClick={() => handleRedirectToForm("individual", "Boats")}>
            Boast
           </div>
          <div className="footer-dropdown">
            <div
              onClick={() => setIndividualOpen(!individualOpen)}
              className="footer-dropdown__toggle"
            >
              Vehicles <FaChevronDown />
            </div>
            {individualOpen && (
              <div className="footer-dropdown__menu">
                 <div className="footer-column__link"  
                  onClick={() =>
                    handleRedirectToForm("individual", "Vehicles: Cars")
                  }
                >
                  Cars
                 </div>
                 <div className="footer-column__link"  
                  onClick={() =>
                    handleRedirectToForm("individual", "Vehicles: Motorcycles")
                  }
                >
                  Motorcycles
                 </div>
                 <div className="footer-column__link"  
                  onClick={() =>
                    handleRedirectToForm("individual", "Vehicles: RVs")
                  }
                >
                  RVs
                 </div>
              </div>
            )}
          </div>
        </div>

        <div className="footer-column">
          <h4>Carriers</h4>
          {/*  <div className="footer-column__link" to="/carriers/overview">Overview </div> */}
           <a className="footer-column__link" href="https://highway.com/go/cierta-corporation" target="_blank" rel="noopener noreferrer">Become a Carrier </a>
        </div>

        <div className="footer-column">
          <h4>Why Cierta</h4>
           <div className="footer-column__link" onClick={() => handleNavigate("about-title")}>About Us </div>
           <div className="footer-column__link" onClick={() => handleNavigate("our-mission-and-vision")}>Mission and Vision </div>
           <div className="footer-column__link" onClick={() => handleNavigate("tracking-and-visibility")}>Tracking and Visibility </div>
        </div>
      </div>

      <div className="footer-bottom">
         <Link className="footer-column__link" to="/terms" state={{ scrollTo: "terms" }}>
          Terms & Conditions
         </Link>
         <Link className="footer-column__link" to="/privacy" state={{ scrollTo: "privacy" }}>
          Privacy Policy
         </Link>
        <div className="footer-copyright">
      © 2025 Cierta Corporation. All Rights Reserved.
</div>
      </div>
  
    </footer>
  );
};

export default Footer;
