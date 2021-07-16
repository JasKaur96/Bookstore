import AxiosService from "./AxiosService"; 
import baseUrl from '../Constants/constants'
const axios = new AxiosService();

export default class UserService{
    
    userRegistration = (data) => {
        console.log("User Service");
        return axios.postMethod(baseUrl+"bookstore_user/registration",data);
    }

    userlogin = (data) =>{
        console.log("User Login");
        return axios.postMethod(baseUrl+"bookstore_user/login",data);      
    }

} 