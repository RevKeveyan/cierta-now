import React from 'react';
import { useNavigate } from "react-router-dom";

const AboutCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const id = item.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/about#${id}`);
  };
  return (
    <div className="about-card" style={{ backgroundImage: `url(${item.background})` }} onClick={handleClick}>
      <div className="about-card__overlay">
        {/* <h4>{item.title}</h4> */}
        <h3>{item.subtitle}</h3>
        <div className="about-card__line" />
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default AboutCard;
