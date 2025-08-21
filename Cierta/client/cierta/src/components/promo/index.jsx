import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./style.scss";
import { api } from "../../helpers";
import useContentService from "../../service/getContent";

const slides = [
  {
    title: "Driven by Precision, Defined by Trust",
    subtitle: "At Cierta, we don’t just move freight—we move with purpose. Every shipment is a promise, every mile a commitment to excellence.",
    background: `${api}/public/promo/2.png`,
  },
  {
    title: "From First Mile to Final Destination",
    subtitle: "Whether it’s freight, vehicles, boats, or heavy hauls, we handle every load with expertise, delivering certainty at every turn.",
    background: `${api}/public/promo/3.png`,
  },
  {
    title: "Beyond Logistics, Into Possibility",
    subtitle: "We’re more than a freight forwarder—we’re the bridge between where you are and where you’re going, ensuring every move is smooth, secure, and effortless.",
    background: `${api}/public/promo/4.jpg`,
  },
  {
    title: "Seamless Logistics, Unmatched Visibility",
    subtitle: "With cutting-edge tracking and real-time updates, we bring clarity to movement, ensuring you’re always in control of your cargo’s journey.",
    background: `${api}/public/promo/5.png`,
  },
  {
    title: "Empowering Your Journey, Every Mile",
    subtitle: "At Cierta, we don’t just move goods—we move your success. With each shipment, we’re powering your growth, delivering reliability at every step.",
    background: `${api}/public/promo/6.png`,
  },
];

const FullSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {getContentByType} = useContentService()
  const [slide, setSlide] = useState(slides)

  useEffect(()=>{
    getContentByType("slider", setSlide)
  },[])

  const isSlideActiveOrNeighbor = (index) => {
    const totalSlides = slides.length;
    const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (activeIndex + 1) % totalSlides;
    return index === activeIndex || index === prevIndex || index === nextIndex;
  };

  return (
    <div className="full-slider">
      <h1 className="main-title" style={{ display: "none" }}>
        Cierta Corporation - Freight Forwarding & Logistics Solutions
      </h1>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 5000 }}
        simulateTouch={true}
        allowTouchMove={true}
        mousewheel={false}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="slider"
      >
        {slide && slide.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{
                backgroundImage: isSlideActiveOrNeighbor(index)
                  ? `url(${api}/${slide.image})`
                  : "none",
              }}
            >
              <div className="slide__overlay" />
              <div className="slide__content">
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullSlider;
