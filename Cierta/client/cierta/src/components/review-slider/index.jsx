import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CiStar from "../../asstets/icons/Icon.png";
import 'swiper/css';
import 'swiper/css/navigation';
import './style.scss';
import googleIcon from '../../asstets/icons/google.png';

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([
    {
    author_name: `MARIEA OVERTON`,
    rating: 5,
    text: `Superior Service! Gia was amazing and our driver showed up & kept us informed of his ETA. He arrived ahead of schedule we are grateful & welcome our new family member! My children woke up with smile! Thank you!
`,
    time: Math.floor(Date.now() / 1000) - 20 * 86400, // -i дней назад
  },
  {
    author_name: `Yohannes Altaye`,
    rating: 5,
    text: `I was looking to transport my car from VA to OH. I went to Google and did a search and start reading thru review. But the key is you can not really rely on review only and no way to reach the reviewer to chat/speak to get the real info.
`,
    time: Math.floor(Date.now() / 1000) - 34 * 86400, // -i дней назад
  },
  {
    author_name: `Travis Lonigan`,
    rating: 5,
    text: `Gia has been a pleasure to work with. She’s responsive, polite, and timely. I recommend her transport service to anyone moving a prized automobile.
`,
    time: Math.floor(Date.now() / 1000) - 47 * 86400, // -i дней назад
  },
  {
    author_name: `nico harrison`,
    rating: 5,
    text: `Always a Fantastic and Easygoing Experience when working with this company. Great communication, On Time Payments, Professional and Respectful staff. Definitely look forward to continuing working with this company.
`,
    time: Math.floor(Date.now() / 1000) - 49 * 86400, // -i дней назад
  },
  {
    author_name: `
Dominate`,
    rating: 5,
    text: `Worked with Gia on hauling a bmw motorcycle for them, everything went great she was great to work with plus Very friendly! everything was on time and didn’t have any problems!
`,
    time: Math.floor(Date.now() / 1000) - 57 * 86400, // -i дней назад
  },{
    author_name: `Wisely Trucking LLC`,
    rating: 5,
    text: `Exceptional service from Gia at Cierta Corporation! Seamless logistics from booking to delivery, ensuring the load arrived safely and on time. Highly recommend! 🚛✨
`,
    time: Math.floor(Date.now() / 1000) - 69 * 86400, // -i дней назад
  },
  {
    author_name: `
USA golden roads`,
    rating: 5,
    text: `It's very pleasure to have business with Cierta Corporation. The broker communicated and responded almost 24/7. Easy load. Thankful and flexible customers. Quick load, quick payment. Absolutely recommend them to everyone. and looking for further cooperation.
`,
    time: Math.floor(Date.now() / 1000) - 72 * 86400, // -i дней назад
  },
{
    author_name: `
YSD TRUCKING`,
    rating: 5,
    text: `Great Communication and Customer Services.
Was a nice experience to work with this company. Thank you
`,
    time: Math.floor(Date.now() / 1000) - 100 * 86400, // -i дней назад
  },
  {
    author_name: `
sandra Alms`,
    rating: 5,
    text: `What a great company!! Very organized with above average communication skills. Gia did a fabulous job. I look forward to working with them in the near future.
Owned “Daniel Scott Alms transportation”
Scotty Alms
`,
    time: Math.floor(Date.now() / 1000) - 134 * 86400, // -i дней назад
  },
  {
    author_name: `
Nam Move`,
    rating: 5,
    text: `Great service, easy communication, thank you for your good job. Will work again
`,
    time: Math.floor(Date.now() / 1000) - 169 * 86400, // -i дней назад
  },
  {
    author_name: `AHMET EMRAH SIYAVUS`,
    rating: 5,
    text: `Perfect communication for a carrier! Definetely recommending them!`,
    time: Math.floor(Date.now() / 1000) - 180 * 86400, // -i дней назад
  },
  {
    author_name: `Kristen Mahone`,
    rating: 5,
    text: `Loved working with this company. The process was quick, easy, and hassle free.`,
    time: Math.floor(Date.now() / 1000) - 200 * 86400, // -i дней назад
  },
  {
    author_name: `Cephas Ben Israel`,
    rating: 5,
    text: `Was very prompt and helpful in getting me the best rates possible. Informed me early enough. For pickup and delivery. Would recommend to family and friends.`,
    time: Math.floor(Date.now() / 1000) - 210 * 86400, // -i дней назад
  },
  {
    author_name: `Eugeniu Tomuz`,
    rating: 5,
    text: `Great company and highly professional. Worked with Gia G, wonderful cooperation and attitude.`,
    time: Math.floor(Date.now() / 1000) - 223 * 86400, // -i дней назад
  },
  {
    author_name: `Ronnie Patterson`,
    rating: 5,
    text: `I greatly appreciate the team at Cierra there very communicative good loads and very up front and answer all my questions fast with good pay.Thanks again Mark and your Cierta team.`,
    time: Math.floor(Date.now() / 1000) - 245 * 86400, // -i дней назад
  },
  {
    author_name: `Rodney Robinson`,
    rating: 5,
    text: `This company should be named certified corporation!!!
The reviews does not compare how much I love working with them. Hope to continue business with them for a long time!!!!`,
    time: Math.floor(Date.now() / 1000) - 269 * 86400, // -i дней назад
  },
  {
    author_name: `Chesney Smith`,
    rating: 5,
    text: `I used these guys to transport my two Trike’s 1800 miles from Iowa to CA, great job, thank you`,
    time: Math.floor(Date.now() / 1000) - 286 * 86400, // -i дней назад
  },
  {
    author_name: `Milly nevarez`,
    rating: 5,
    text: `We have worked with this company for a while and very responsive and loads are on time. Great work`,
    time: Math.floor(Date.now() / 1000) - 300 * 86400, // -i дней назад
  },
  {
    author_name: `Martricia Minor`,
    rating: 5,
    text: `Great company to work with look forward to a great relationship with them! -Dispatcher for CCA Logistics LLC.`,
    time: Math.floor(Date.now() / 1000) - 320 * 86400, // -i дней назад
  },
  {
    author_name: `Nick Anderson`,
    rating: 5,
    text: `They got the crate delivered at a great price within a reasonable timeframe.`,
    time: Math.floor(Date.now() / 1000) - 340 * 86400, // -i дней назад
  },
  {
    author_name: `Oleg Kryvdyuk`,
    rating: 5,
    text: `Great service! Excellent communication!`,
    time: Math.floor(Date.now() / 1000) - 364 * 86400, // -i дней назад
  },
  {
    author_name: `craig montgomery`,
    rating: 5,
    text: `GREAT COMPANY I WOULD DRIVE FOR THEM ANYTIME.`,
    time: Math.floor(Date.now() / 1000) - 382 * 86400, // -i дней назад
  },
  {
    author_name: `TULUM LOGISTICS`,
    rating: 5,
    text: `Proffesionals , easy and smooth shipments all the time , sofie knows how to do this business perfectly!`,
    time: Math.floor(Date.now() / 1000) - 403 * 86400, // -i дней назад
  },
  {
    author_name: `Milan Lewis`,
    rating: 5,
    text: `I was referred to the company by a friend. Reasonably priced, Tamerlan took great care of our vehicles during transit. Gia was extremely helpful throughout the whole process!! Would highly recommend to others`,
    time: Math.floor(Date.now() / 1000) - 417 * 86400, // -i дней назад
  },
  {
    author_name: `Evolution24LLC`,
    rating: 5,
    text: `Gia has consistently demonstrated exceptional performance in her role at Cierta Corporation. She has shown a strong commitment to her duties, ensuring that all tasks are completed efficiently and on time. Her attention to detail and ability to manage multiple responsibilities have been crucial in maintaining our high standards of service. Thank you!!!`,
    time: Math.floor(Date.now() / 1000) - 431 * 86400, // -i дней назад
  },
  {
    author_name: `Elmer Carranco`,
    rating: 5,
    text: `Had a little trouble at first trying to figure out what was happening, after a day or so I was able to pick a shipper after that everything went well. The car I was shipping got to California fine in a timely manner. I would use them again. Elmer Denver Colo.`,
    time: Math.floor(Date.now() / 1000) - 452 * 86400, // -i дней назад
  },
  {
    author_name: `247 Accounting`,
    rating: 5,
    text: `Been doing a couple of loads with them, they are one of the best reps I've worked with. Great communication,
really helpful with any problem. Only the best service from them.`,
    time: Math.floor(Date.now() / 1000) - 469 * 86400, // -i дней назад
  },
  {
    author_name: `Perfect Way Logistics Inc`,
    rating: 5,
    text: `Great company, nice people, fast support! I recommend it, thank you very much!`,
    time: Math.floor(Date.now() / 1000) - 482 * 86400, // -i дней назад
  },
  {
    author_name: `Jem`,
    rating: 5,
    text: `Excellent service, great communication and good payment options. I recommend this 100%.`,
    time: Math.floor(Date.now() / 1000) - 500 * 86400, // -i дней назад
  },
  {
    author_name: `Ramil Iskandirov`,
    rating: 5,
    text: `Gia did great job at communicating and everything Delivered the freight same day.`,
    time: Math.floor(Date.now() / 1000) - 512 * 86400, // -i дней назад
  },
  {
    author_name: `Cris Manole`,
    rating: 5,
    text: `Great Communication and Customer Services. Was a nice experience to work with this company. Thank you!`,
    time: Math.floor(Date.now() / 1000) - 529 * 86400, // -i дней назад
  },
]);
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/reviews')
  //     .then(res => setReviews(res.data))
  //     .catch(err => console.error('Failed to fetch reviews:', err));
  // }, []);

  // useEffect(() => {
  //   // Пример фейковых отзывов
  //   const dummyReviews = Array.from({ length: 15 }, (_, i) => ({
  //     author_name: `Happy Client #${i + 1}`,
  //     rating: 5,
  //     text: `Amazing service! Delivery was smooth and fast. Highly recommend Cierta! (${i + 1})`,
  //     time: Math.floor(Date.now() / 1000) - i * 86400, // -i дней назад
  //   }));
  
  //   setReviews(dummyReviews);
  // }, []);
  

  return (
    <section className="reviews">
      <h2 className="reviews__title">Reviews</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-card">
              <div className="review-card__top">
                <span className="review-card__name">{review.author_name}</span>
                <div className="review-card__stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <img src={CiStar} alt='Star' key={i}  />
                  ))}
                  <span className="review-card__score">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="review-card__text">{review.text}</p>
              <div className="review-card__bottom">
                <span className="review-card__date">
                  {new Date(review.time * 1000).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <img src={googleIcon} alt="Google" className="review-card__google-icon" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewSlider;
