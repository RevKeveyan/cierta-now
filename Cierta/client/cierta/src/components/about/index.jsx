import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import AboutCard from './about-card';

import 'swiper/css';
import 'swiper/css/pagination';
import './style.scss';

import bg1 from '../../asstets/about/1.png';
import bg2 from '../../asstets/about/2.png';
import bg3 from '../../asstets/about/3.png';

const aboutItems = [
  {
    title: "Our Story",
    subtitle: 'Our Story',
    text: "Every Journey Has a Story—This Is Ours.",
    background: bg3,
  },
  {
    title: "Our Mission and Vision",
    subtitle: 'Our Mission and Vision.',
    text: "Every Dream Paints a Horizon—This Is Our Canvas.",
    background: bg1,
  },
  {
    title: "Tracking and Visibility",
    subtitle: 'Tracking and Visibility',
    text: "Every Mile Holds Insight—This Is How We See It.",
    background: bg2,
  },
];

const AboutSection = () => {
  return (
    <section className="about-section">
      <h2 className="about-section__heading" >About Cierta Corporation</h2>

      <div className="about-section__slider mobile-only">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {aboutItems.map((item, index) => (
            <SwiperSlide key={index}>
              <AboutCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="about-section__grid desktop-only">
        {aboutItems.map((item, index) => (
          <AboutCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
