import React, { useEffect, useState } from 'react';
import ServiceMenu from './service-menu';
import { useLocation } from 'react-router-dom';
import ServiceContent from './content';
import MobileServicesAccordion from './mobile-about';
import { api } from '../../helpers';

import './style.scss';
import useContentService from '../../service/getContent';


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

const ServiceSection = () => {
  const [service, setService] = useState(services)
  const {getContentByType} = useContentService()
  
const location = useLocation();

  useEffect(()=>{
    getContentByType("service", setService)
  },[])

useEffect(() => {
  if (location.state?.scrollTo) {
    const element = document.getElementById(location.state.scrollTo);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}, [location]);

  const [selected, setSelected] = useState(0);
  const current = service[selected];

  return (
   <>
    <MobileServicesAccordion services={service} selected={selected} onSelect={setSelected}  type={current.type}/>

<section className="service-section">
  <div className="service-section__container">
    <h2 className="service-section__heading">Our Services</h2>

    <div className="service-section__content">
      <ServiceMenu services={service} selected={selected} onSelect={setSelected} />
      <ServiceContent title={current.title} description={current.text} image={current.image}   type={current.type}/>
    </div>
  </div>
</section>
</>
  );
};

export default ServiceSection;
