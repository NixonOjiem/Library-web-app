import React, { useState, useEffect } from 'react';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';

const images = [banner1, banner2, banner3];

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