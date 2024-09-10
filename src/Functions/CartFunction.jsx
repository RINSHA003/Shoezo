import axios from "axios"
import { userAPI } from "../API/API"
import { toast } from "react-toastify"


export async function AddToCart(item, setCartfetch) {
    const userid = localStorage.getItem('id') 

    if (userid) {
        try {
            const res = await axios.get(`${userAPI}/${userid}`)
            const cart = res.data.cart
            const updateCart = {
                ...cart,
                [item.id]: item
            }
            await axios.patch(`${userAPI}/${userid}`, { cart: updateCart })
            toast.success('Item Added successfully')
            setCartfetch(Object.values(updateCart))
           

        } catch (err) {
            console.log(err)
            
           
        }
    } else {
        alert("Please log in")
        toast.warning('please login')
    }
}


