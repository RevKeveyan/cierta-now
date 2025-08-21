import React from "react";

import "./style.scss";
import ServiceSlider from "../../components/services/service-slider";
import CentralQuoteForm from "../../components/form";
import ContactSectionV2 from "../../components/contact/contact-v2";
import ContactSection from "../../components/contact";

const ServicesPage = () => {
  return (
    <>
      <section id="service-slider" className="services-page">
        <div className="services-page__slider">
          <ServiceSlider />
        </div>

        <CentralQuoteForm />
      </section>
      <ContactSection/>
    </>
  );
};

export default ServicesPage;
