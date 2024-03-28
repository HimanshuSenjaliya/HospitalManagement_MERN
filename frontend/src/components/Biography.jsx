/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          tenetur deserunt magni cum quo quos tempore nostrum nihil distinctio
          labore consequuntur eligendi quae animi inventore dolores
          reprehenderit debitis minus eaque officia, pariatur modi possimus
          accusantium quaerat perspiciatis! Eum perferendis, iure ducimus veniam
          accusantium neque vero!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id quaerat
          cupiditate minus porro nam! Voluptatem vel eius, soluta quam quidem,
          adipisci, ab est tenetur aspernatur sapiente sed impedit corrupti
          libero accusamus atque ratione a quis.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, odit.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
};

export default Biography;
