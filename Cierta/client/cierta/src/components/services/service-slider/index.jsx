import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


import "./style.scss";

import { useFormSelection } from "../../../context/formContext";
import { api } from "../../../helpers";
import useContentService from "../../../service/getContent";


const serviceSlides = [
  {
    serviceType: "Truckload",
    title: "Full Truckload Shipping",
    text: "At Cierta, we connect you with customized full truckload capacity to meet your unique needs. Choose the reliability of contract rates for guaranteed availability or the flexibility of spot rates to adapt to your demands.",
    image: `${api}/public/service/1.jpg`
  },
  {
    serviceType: "LTL",
    title: "Less-Than-Truckload Shipping",
    text: "At Cierta, we connect you with customized full truckload capacity to meet your unique needs. Choose the reliability of contract rates for guaranteed availability or the flexibility of spot rates to adapt to your demands.",
    image:  `${api}/public/service/2.jpg`
  },
  {
    serviceType: "Boats",
    title: "Boats Transport",
    text: "Moving a boat is more than just transport—it’s about precision, care, and expertise. At Cierta, we coordinate seamless shipping for boats of all sizes, ensuring they travel safely over land to reach the water again. Whether it’s a small craft or a large yacht, we handle every detail so your boat arrives ready for its next journey.",
    image:  `${api}/public/service/3.jpg`
  },
  {
    serviceType: "Warehousing",
    title: "Warehousing and Storage",
    text: "From on-demand warehousing to fast and efficient transloading, we provide adaptable storage solutions for both short- and long-term needs. Whether you need extra space for seasonal inventory or a streamlined distribution point, our network ensures your freight stays on course without delays..",
    image:  `${api}/public/service/6.jpg`
  },
  {
    serviceType: "Vehicles: Cars",
    title: "Car",
    text: "Transporting a car is more than simply moving it from point A to point B—it’s about trust, precision, and care. At Cierta, we specialize in seamless vehicle shipping, managing every detail to ensure your car is handled safely and delivered on time. Whether you’re transporting a single vehicle or an entire fleet, our experienced team is dedicated to making the process smooth and worry-free. With our committed service, you can trust that your vehicles will arrive safely and punctually, ready to hit the road again.",
    image:  `${api}/public/service/4.jpg`
  },
  {
    serviceType: "Vehicles: RVs",
    title: "RVs",
    text: "We simplify the transport of RVs, ensuring your mobile home is treated with the utmost care and attention. Our team understands the unique requirements of RV shipping and provides tailored logistics solutions to meet your needs. Whether you’re moving your RV across the country or just a short distance away, you can trust us to handle every detail, ensuring your vehicle arrives safely and ready for your next adventure.",
    image:  `${api}/public/service/5.jpg`
  },
  {
    serviceType: "Vehicles: Motorcycles",
    title: "Motorcycle Shipping",
    text: "Transporting a motorcycle requires a unique level of care and expertise. At Cierta, we specialize in the safe and efficient transportation of motorcycles, ensuring your prized possession is handled with the utmost attention. Whether you’re shipping a cruiser, sportbike, or classic motorcycle, we connect you with experienced carriers who understand the intricacies of motorcycle logistics. With our dedicated service, you can trust that your bike will arrive safely and on time, ready for your next ride.",
    image:  `${api}/public/service/7.jpg`
  },

];
const ServiceSlider = () => {
  const {getContentByType} = useContentService()
  // const [serviceSlides, setServiceSlides] = useState([])
  useEffect(()=>{
    // getContentByType("service", setServiceSlides)
  },[])
  const { selectedService, setSelectedService } = useFormSelection();
  const swiperRef = useRef(null);

  // Sync slider -> selectedService
  const handleSlideChange = (swiper) => {
    const newService = serviceSlides[swiper.realIndex]?.serviceType;
    if (newService && newService !== selectedService) {
      setSelectedService(newService);
    }
  };

  // Sync selectedService -> slider
  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    const targetIndex = serviceSlides.findIndex(
      (slide) => slide.serviceType === selectedService
    );

    if (targetIndex !== -1 && swiper.realIndex !== targetIndex) {
      swiper.slideToLoop(targetIndex); // slideToLoop for correct looping index
    }
  }, [selectedService]);

  return (
    <section className="service-slider">
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        slidesPerView={1}
      >
        {serviceSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="service-slide">
              <div className="service-slide__text">
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
              </div>
              <div className="service-slide__image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ServiceSlider;