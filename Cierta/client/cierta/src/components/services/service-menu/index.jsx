import React from 'react';
import './style.scss';

const ServiceMenu = ({ services, selected, onSelect }) => {
  return (
    <aside className="service-menu">
      {services.map((service, index) => (
        <div
          key={index}
          className={`service-menu__item ${selected === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          {service.title}
        </div>
      ))}
    </aside>
  );
};

export default ServiceMenu;
