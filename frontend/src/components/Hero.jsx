/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Apollo Hospital mission is to bring healthcare of International standards within
          the reach of every individual. We are committed to the achievement and
          maintenance of excellence in education, research and healthcare for
          the benefit of humanity
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
            <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
