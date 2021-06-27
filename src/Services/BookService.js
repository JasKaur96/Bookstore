import AxiosService from "./AxiosService";
import baseUrl from '../Constants/constants'
const axios = new AxiosService();

export default class BookService{
    
    getAllBooks = () => {
        console.log("Book Service");
        return axios.getMethod(baseUrl+"bookstore_user/get/book");
    }
 
    userlogin = (data) =>{
        console.log("User Login");
        return axios.postMethod(baseUrl+"bookstore_user/login",data);      
    }

} 