import axios from "axios";

const ecom_instance = axios.create({
    baseURL: 'https://dummyjson.com',
    
  });

 
  export default ecom_instance;