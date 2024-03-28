/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {FaPhone , FaLocationArrow} from 'react-icons/fa'
import {MdEmail } from 'react-icons/md'

const Footer = () => {
    
  return (
    <div>
      <footer className="container">
        <hr />
        <div className="content">
          <div>
            <img src="/logo.png" alt="logo" className="logo-img" />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
                <Link to={"/"}>Home</Link>
                <Link to={"/appointment"}>Appointment</Link>
                <Link to={"/about"}>About Us</Link>
            </ul>
          </div>
          <div>
            <h4>Availablity</h4>
            <p>24 x 7</p>
          </div>
          <div>
            <h4>Contact</h4>
            <div><FaPhone/><span>8989788999</span></div>
            <div><MdEmail/><span>apollo@gmail.com</span></div>
            <div><FaLocationArrow/><span> Ahmedabad , Gujarat</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
