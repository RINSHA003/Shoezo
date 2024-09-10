import React from 'react'
import shopKids from '../../Assets/shopKids.jpg'
import shopMen from '../../Assets/shopMen.jpg'
import { Link } from 'react-router-dom'

const CategorySec = () => {
  return (
    <div> 
      <h2 className='text-center font-bold text-red-500 text-3xl'>Catogories</h2>
        <div className='grid grid-cols-2 justify-center items-center bg-gray-100 h-[600px]'>
      {/* Kids Section */}
      <div className='flex flex-col justify-center items-center h-[500px] w-[400px] bg-white mx-auto rounded-lg'>
        <img src={shopKids} alt="Shop for kids" className='w-[300px] h-[400px] object-cover rounded-lg' />
       <Link to={`/category/${'Kids'}`}><button className='mt-4 text-lg font-normal text-white bg-red-500 px-10 rounded-lg'>Shop for Kids</button></Link>
      </div>

      {/* Men Section */}
      <div className='flex flex-col justify-center items-center h-[500px] w-[400px] bg-white mx-auto rounded-lg'>
        <img src={shopMen} alt="Shop for men" className='w-[300px] h-[400px] object-cover rounded-lg' />
       <Link to={`/category/${"Men"}`}><button className='mt-4 text-lg font-normal text-white bg-red-500 rounded-lg px-5'>Shop for Men</button></Link> 
       <Link to={`/category/${'Women'}`}><button className='mt-1 text-lg font-normal text-white bg-red-500 rounded-lg px-5'>Shop for women</button></Link> 
      </div>
    </div>
    </div>
    
  )
}

export default CategorySec

