import React from 'react';
import Loc from "../../../asstets/icons/Vector.png"
import { FaRegEnvelope } from 'react-icons/fa';
import { FiPhone } from "react-icons/fi";
import './style.scss';
import AboutHours from '../hours';

const ContactSectionV2 = () => {
  return (
    <section id="contact" className="contact-v2">
      <h2 className="contact-v2__title">Contact Us</h2>

      <div className="contact-v2__box">
        <div className="contact-v2__content">
          <h3>Better yet, see us in person!</h3>
          <p className="contact-v2__sub">
            We love our customers, so feel free to visit during working business hours.
          </p>

          <h4 className="contact-v2__company">Cierta Corporation</h4>

          <div className="contact-v2__item">
            <img src={Loc}  alt="Location" className="icon" />
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">
              710 East Main Street, Lexington, Kentucky 40502, United States
            </a>
          </div>
          <div className="contact-v2__item">
            <FiPhone className="icon" />
            <span>(606) 660-6618</span>
          </div>
          <div className="contact-v2__item">
            <FaRegEnvelope className="icon" />
            <span>Management@ciertacorp.com</span>
          </div>

          <AboutHours/>
        </div>

        <div className="contact-v2__bg-shape" />
      </div>
    </section>
  );
};

export default ContactSectionV2;
