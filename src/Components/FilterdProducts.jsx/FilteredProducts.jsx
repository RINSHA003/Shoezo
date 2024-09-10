import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ItemAPI } from '../../API/API'
import {  useParams } from 'react-router-dom'
import { Mycontext } from '../../App'
import { AddToCart } from '../../Functions/CartFunction'

const FilteredProducts = () => {

    const [products,setProducts]=useState([])
    const [selectedProducts,setSelectedProducts]=useState(null)
    const [isModalOpen,setIsModalOpen]=useState(false)
    const {setAddtocart} = useContext(Mycontext)
    const {id} = useParams()

    useEffect(()=>{
       async function filter() {
        try{
            const res= await axios.get(ItemAPI)
            setProducts(res.data.filter((e)=>e.category===id))
        }
        catch(error){
            console.log(error)
        }
        }
        filter()
        
    },[id])

   const handleAddtocart=(item)=>{
    AddToCart(item)
  
   }
  const HandleProductsClick=(product)=>{
         setSelectedProducts(product)
         setIsModalOpen(true)
  }
  console.log(selectedProducts)

  function closeModal(){
    setIsModalOpen(false)
    setSelectedProducts(null)
  }

  return (
    <div className='grid grid-cols-3 gap-4 justify-center items-center m-auto place-items-center p-8 bg-gray-50'>
         {products.map((product)=>{
               return(
                <div className='bg-white rounded-lg flex flex-col justify-center items-center p-3 w-[300px] h-[400px] border' key={product.id}>
                    <div className='overflow-hidden'>
                        <img src={product.image_url} alt={`${product.name}`} onClick={()=>HandleProductsClick(product)} className='w-[250px] h-[250px] object-fill rounded-lg hover:scale-110 transition-transform transform duration-300 ease-in-out shadow-sm'/></div>
                    <div className='flex flex-col items-center justify-center mt-2' >
                        <div className='font-semibold' onClick={()=>HandleProductsClick(product)}>{product.name}</div>
                        <div className='border bg-gray-50 '>
                            <button onClick={()=>handleAddtocart(product)} className='w-[250px] hover:bg-gray-200 transition duration-200'>Add to cart</button>
                        </div>
                        <div className='border bg-gray-50 mt-1 '>
                            <button className='w-[250px] hover:bg-gray-200 transition duration-200'>buy now</button>
                        </div>  
                    </div>
                </div>
               )
         })}


         {isModalOpen&&selectedProducts&&(
            <div className='flex items-center justify-center z-50 bg-black bg-opacity-50 fixed inset-0'>
                <div className='max-w-3xl mx-auto bg-white relative rounded-lg shadow-lg p-6'>
                    <h1 className='text-4xl text-grey-600 font-semibold'>{selectedProducts.name}</h1>
                    <div className='flex flex-col md:flex-row over mt-2'>
                        <img src={selectedProducts.image_url} alt="" className='w-[250px] h-[250px] object-cover rounded-lg' />
                        <div className='ml-3 mt-5'>
                            <p className='text-lg text-gray-700 mb-4 font-serif'>{selectedProducts.description}</p>
                            <p className='text-lg text-gray-700 font-serif'>Price: ${selectedProducts.price}</p>
                        </div>
                        <button onClick={closeModal} className='absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg'>close</button>
                    </div>
                </div>
            </div>
         )}
    </div>
  )
}

export default FilteredProducts