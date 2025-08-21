import React, { useEffect, useState } from 'react';
import ContactInfo from './contact-info';
import ContactMap from './map';
import './style.scss';
import useContentService from '../../service/getContent';

const ContactSection = () => {



  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-section__heading">Contact Us</h2>

      <div className="contact-section__container">
        <ContactInfo/>
        <ContactMap />
      </div>
    </section>
  );
};

export default ContactSection;
