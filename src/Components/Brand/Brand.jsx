import React from 'react';
import { Link } from 'react-router-dom';
import addidas from '../../Assets/addidas.jpg'
import puma from '../../Assets/puma.jpg'
import nb from '../../Assets/nb.jpg'
import reebok from '../../Assets/reebok.png'
import Nike from '../../Assets/Nike.jpg'
const Brand = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Select a Brand</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        <div className="flex justify-center">
          <Link to={`/brands/${'Adidas'}`}>
            <div className="w-[200px] h-[250px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                src={addidas} 
                alt="Adidas"
                className="w-full h-[150px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">Adidas</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to={`/brands/${'Puma'}`}>
            <div className="w-[200px] h-[250px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                src={puma}
                alt="Puma"
                className="w-full h-[150px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">Puma</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to={`/brands/${'New Balance'}`}>
            <div className="w-[200px] h-[250px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                src={nb}
                alt="New Balance"
                className="w-full h-[150px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">New Balance</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to={`/brands/${'Reebok'}`}>
            <div className="w-[200px] h-[250px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                src={reebok}
                alt="Reebok"
                className="w-full h-[150px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">Reebok</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to={`/brands/${'Nike'}`}>
            <div className="w-[200px] h-[250px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                src={Nike}
                alt="Nike"
                className="w-full h-[150px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">Nike</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Brand;
