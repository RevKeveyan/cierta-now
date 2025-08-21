import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "./style.scss";
import ContactButton from "../../buttnos";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormSelection } from "../../../context/formContext";
import { api } from "../../../helpers";


const services = [
  {
    title: 'Full Truckload',
    type: 'Truckload',
    description: 'We provide dedicated truckload solutions tailored to your specific needs, offering both contracted rates for consistent availability and spot rates for dynamic flexibility. With our extensive network and commitment to service, we ensure your freight moves efficiently and reliably, no matter the distance.',
    image: `${api}/public/service/1.jpg`,
  },

  {
    title: 'Less-Than-Truckload',
    type: 'LTL',
    description: 'We link your LTL and partial shipments—no matter the size or weight—to our reliable network of providers across the country. Whether you require affordable solutions for smaller loads or dependable service for urgent needs, we guarantee that your cargo is managed with care and reaches its destination on schedule.',
    image: `${api}/public/service/2.jpg`,
  },

  {
    title: 'Boats',
    type: 'Boats',
    description: "We facilitate the transportation of boats, ensuring your valuable watercraft is handled with the utmost care. Whether you're shipping a small vessel or a larger yacht, we connect you with experienced carriers who specialize in marine logistics.",
    image: `${api}/public/service/3.jpg`,
  },

  {
    title: 'Cars',
    type: 'Vehicles: Cars',
    description: 'We streamline the transportation of cars, guaranteeing that your valuable vehicles are treated with the highest level of care. Whether you’re shipping a compact car or an entire fleet of trucks, we’ve got you covered.',
    image: `${api}/public/service/4.jpg`,
  },

  {
    title: 'Motorcycles',
    type: 'Vehicles: Motorcycles',
    description: 'We specialize in the careful transport of motorcycles, providing peace of mind for owners of these treasured machines. Our experienced team ensures each motorcycle is securely packed and handled with precision.',
    image: `${api}/public/service/7.jpg`,
  },

  {
    title: 'RVs',
    type: 'Vehicles: RVs',
    description: 'We facilitate the transportation of RVs, ensuring your home on wheels is handled with exceptional care. Our knowledgeable team is well-versed in the specific needs of RV shipping and offers customized solutions to suit your requirements.',
    image: `${api}/public/service/5.jpg`,
  },

  {
    title: 'Warehousing and Storage',
    type: 'Warehousing',
    description: 'Gain seamless access to storage, transload, and cross-dock solutions—strategically positioned to keep your cargo moving with precision and ease.',
    image: `${api}/public/service/6.jpg`,
  },
];


const MobileServicesAccordion = ({onSelect, title, description, image, type }) => {
  const navigate = useNavigate();
  const { setSelectedService } = useFormSelection();

  const handleLearnMore = () => {
    setSelectedService(type);
    navigate('/services', { state: { scrollTo: 'service-slider' } });
  };

 

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="mobile-services">
      <h2 className="mobile-services__title">Our Services</h2>
      {services.map((service, index) => (
        <div className="accordion" key={index}>
          <div
            className={`accordion__header ${
              openIndex === index ? "active" : ""
            }`}
            onClick={() => {
              toggle(index)
               onSelect(index)}}
          >
            <span>{service.title}</span>
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openIndex === index && (
            <div className="accordion__content">
              <p>{service.description}</p>
              {service.image && <img src={service.image} alt={service.title} />}
              <ContactButton text="Learn More" btnclass={"more-btn"} onSubmit={handleLearnMore}  />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileServicesAccordion;
