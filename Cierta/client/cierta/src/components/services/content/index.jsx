import React from 'react';
import './style.scss';
import ContactButton from '../../buttnos';
import { useNavigate } from 'react-router-dom';
import { useFormSelection } from '../../../context/formContext';
import { api } from '../../../helpers';

const ServiceContent = ({ title, description, image, type }) => {
  const navigate = useNavigate();
  const { setSelectedService } = useFormSelection();

  const handleLearnMore = () => {
    setSelectedService(type);
    navigate('/services', { state: { scrollTo: 'service-slider' } });
  };
  

  return (
    <div className="service-content">
      <div className="service-content__text">
        <h3>{title}</h3>
        <p>{description}</p>
        <ContactButton text="Learn More" btnclass="more-btn" onSubmit={handleLearnMore} />
      </div>
      <div className="service-content__image">
        <img src={`${api}/${image}`} alt={title} />
      </div>
    </div>
  );
};

export default ServiceContent;
