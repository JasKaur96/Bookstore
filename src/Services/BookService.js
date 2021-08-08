import AxiosService from "./AxiosService";
import baseUrl from '../Constants/constants'
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
const axios = new AxiosService();

export default class BookService{
    
    getAllBooks = () => {
        console.log("Book Service");
        return axios.getMethod(baseUrl+"bookstore_user/get/book");
    }
 
    addToCartBook = (data, product_id,token) => {
        console.log("book service",data, product_id)
        return axios.postMethod(`${baseUrl}bookstore_user/add_cart_item/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('Token')
            }
        })
    }
  
    cartQuantity = (data, product_id) => {
        return axios.putMethod(`${baseUrl}"bookstore_user/cart_item_quantity/${product_id}`,data,{
            headers: {
                'x-access-token': localStorage.getItem('Token')
            }
        })
    }


    getCartItems = () => {
        return axios.getMethod(`${baseUrl}bookstore_user/get_cart_items`,{
            headers: {
                'x-access-token': localStorage.getItem('Token')
            }
        })
    }

    cartIncrementDecrement=(data,cartItem_id)=>{
        return axios.putMethod(`${baseUrl}bookstore_user/cart_item_quantity/${cartItem_id}`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('Token'),
            } 
        })     
    }
    userDetails=(data)=>{
        return axios.putMethod(`${baseUrl}bookstore_user/edit_user`,data,{
            headers:{
                'x-access-token' :localStorage.getItem('Token'),
            } 
        })     
 
    }

   order=(data)=>{
        console.log(localStorage.getItem('Token'));
        return axios.postMethod(`${baseUrl}bookstore_user/add/order`,data,{
            headers:{
                'x-access-token':localStorage.getItem('Token'),
            }
        });
    }

    removeCartItem=(id)=>{
        console.log(id);
        console.log(localStorage.getItem('Token'))
        return axios.deleteMethod(`${baseUrl}bookstore_user/remove_cart_item/${id}`,{
            headers:{
                'x-access-token':localStorage.getItem('Token'),
            }
        });
    }
} 