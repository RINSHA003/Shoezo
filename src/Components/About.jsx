import React from 'react';
import AboutImage from '../Assets/Aboutshoezo.png'; 

const About = () => {
  return (
    <div className="flex flex-col items-center py-16 px-4 md:px-8 bg-gray-100">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        {/* Image Section - aligned to the left */}
        <div className="flex-1 text-left md:text-left md:pl-0">
          <img
            src={AboutImage}
            alt="About Shoezo"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left md:pl-8">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">About Shoezo</h3>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem tempora laudantium nihil iste mollitia dolores, doloribus temporibus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

