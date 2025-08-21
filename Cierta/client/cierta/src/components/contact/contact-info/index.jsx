import React, { useEffect, useState } from 'react';
import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import AboutHours from '../hours';
import { DEFAULT_CONTACT } from '../../../helpers';
import useContentService from '../../../service/getContent';

const ContactInfo = () => {
  const { getContacts } = useContentService();
  const [contact, setContact] = useState(DEFAULT_CONTACT);

  useEffect(()=>{
    getContacts(setContact)
  },[])




  return (
 <>
    {contact && <div className="contact-section__info">
      
      <p className="contact-section__sub">Better yet, see us in person!</p>
      <p className="contact-section__text" style={{ color: '#1D75BF' }}>
        We love our customers, so feel free to visit during normal business hours.
      </p>
      
      <ul className="contact-section__block">
        <li className="contact-section__sub">{contact?.name}</li>
        
        <li className='contact-section__icon__wrapper'>
          <div className='contact-section__icon__location'>
            <MdLocationPin className="icon" />
          </div>
          {contact?.address}
        </li>
        
        <li>
          <FaPhoneAlt className="contact-section__icon" /> 
          {contact?.phone}
        </li>
        
        <li>
          <FaEnvelope className="contact-section__icon" />
          {contact?.email}
        </li>
      </ul>
      
      <AboutHours />
    </div>}</>
  );
};

export default ContactInfo;
