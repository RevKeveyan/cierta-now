import React from 'react';
import './style.scss';

import Brand1 from '../../asstets/brand/1.png';
import Brand2 from '../../asstets/brand/2.png';
import Brand3 from '../../asstets/brand/3.png';
import Brand4 from '../../asstets/brand/4.png';
import Brand5 from '../../asstets/brand/5.png';
import Brand6 from '../../asstets/brand/6.png';
// import Brand7 from '../../asstets/brand/7.png';

const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6,Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, ];
const PartnersSection = () => {
  return (
    <section className="partners-section">
      <h2 className="partners-section__heading">Trusted and Certified by</h2>

      <div className="partners-section__inner">
        <div className="partners-section__fade partners-section__fade--left" />
        <div className="partners-section__fade partners-section__fade--right" />

        <div className="partners-section__track">
          {[...brands, ...brands].map((logo, index) => (
            <div className="partners-section__item" key={index}>
              <img src={logo} alt={`Brand ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
