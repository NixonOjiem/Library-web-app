import React, { useState, useEffect } from 'react';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';
import banner4 from '../assets/images/banner4.jpg';
import banner5 from '../assets/images/banner5.jpg';
import banner6 from '../assets/images/banner6.jpg';
import banner7 from '../assets/images/banner7.jpg';
import banner8 from '../assets/images/banner8.jpg';

const images = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='banner-container'>
      <img src={images[currentIndex]} alt={`banner${currentIndex + 1}`} className='banner-image' />
    </div>
  );
}

export default Banner;