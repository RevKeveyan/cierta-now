import React from 'react';
import contactVideo from '../../../asstets/contact/NEW PROJECT.mp4'; // ✅ Укажи правильный путь

const ContactMap = () => {
  return (
    <div className="contact-section__map">
      <video
        className="contact-section__map__video"
        src={contactVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default ContactMap;
