import React from 'react';
import Navbar from './Navbar';
import  BannerBackground from "../components/assets/bannerbackground.png"
import  BannerImage from "../components/assets/bannerimage.png";
import {FiArrowRight} from "react-icons/fi";
import '../src/Home.css'
import { Link } from 'react-router-dom';

const Home = () =>{
  return (
    <div className="home-container">
        <Navbar />
        <div className="home-banner-container" >
          <div className="home-bannerImage-container" >
            <img src={BannerBackground} alt="primary-" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading" >
              allyfind: Your Matchmaker for Academic Success
            </h1>
            <p className="primary-text">
              allyfind is your go-to platform for connecting with like-minded peers 
              who are to team up,support each other, and excel academically together. 
              Find your ideal partner and embark on a journey of 
              collaborative learning and achievement
            </p>
            <Link to ='/auth'>
            <button className="secondary-button">
              Let's get Accountable <FiArrowRight />
            </button></Link>
          </div>
          <div className="home-image-container">
            <img src={BannerImage} alt="primary-" />
          </div>
        </div>
    </div>
  );
};

export default Home;
