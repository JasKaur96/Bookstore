import axios from 'axios';

export default class AxiosService{
    
    getMethod = (url, isHeaderRequired = false) => {
        return axios.get(url, isHeaderRequired)
    }

    postMethod = (url, data,isHeaderRequired = false) => {
        console.log("Axios Service",data);
        return axios.post(url,data, isHeaderRequired)
    }

    deleteMethod =(url,isHeaderRequired = false)=>{
        return axios.delete(url,isHeaderRequired)

    }
    
    putMethod =(url,data,isHeaderRequired = false)=>{
        return axios.put(url,data,isHeaderRequired)
    }
} 