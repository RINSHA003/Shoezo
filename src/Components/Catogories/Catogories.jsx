import axios from "axios";
import React, { useEffect, useState } from "react";
import { ItemAPI } from "../../API/API";

const Catogories = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function abc() {
      try {
        const res = await axios.get(`${ItemAPI}?_limit=8`);
        setItems(res.data)

        console.log(items);
        
      } catch (err) {
        console.log(err);
      }
    }

    abc();
  }, []);
  return(
    <div>
      <h2 className='text-center font-bold text-blue-500 text-3xl'>Best Sellers</h2>
      <div className="grid bg-gray-100 p-8 grid-cols-4 m-auto place-items-center gap-4  justify-center items-center">
    {items.map((item)=>{
        return (
            <div key={item.id} className="flex relative bg-white flex-col justify-center items-center w-[250px] h-[300px] p-3  shadow-md">
                <div className="  w-[100%]">{item.special_offer !== "None" && 
                    <div className=" bg-red-500 z-10 text-white  p-1  rounded-lg  absolute top-0  ">{item.special_offer}</div>
                    }</div>
                <div className=" overflow-hidden" ><img src={item.image_url} alt="" className="w-[250px] h-[250px]  object-fill  hover:scale-110 transition-transform transform duration-300 shadow-sm"/></div>
                <div className="flex justify-between items-center w-[100%] mt-3">
                    <div className="font-semibold text-gray-700"> {item.name}</div>
                   
                   
                        <div className="text-blue-500"> ${item.price}</div>
                   

                </div>
               
            </div>
        )
    })}
  </div>
    </div>


  )
};

export default Catogories;
