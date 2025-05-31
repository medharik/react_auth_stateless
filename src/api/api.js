import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token =localStorage.getItem('token');
    if(token)  config.headers['Authorization'] = 'Bearer ' +token ;
    console.log('interceptor',token)
    // config.headers={
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',   
    // }
    return config;
  }, function (error) {
    console.log('interceptor error',error);
    return Promise.reject(error);
  });
  export default instance;