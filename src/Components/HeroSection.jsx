import React from 'react';
import background from '../Assets/background.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
    
      <h1 className="text-white text-4xl font-semibold flex items-center justify-start pl-12 py-20">Style Your Each Steps</h1>
      <Link to='/brands'><button className='bg-red-600 p-6 ml-10 rounded-lg text-white'>Shop Now</button></Link>
    </div>
  );
}

export default HeroSection;




