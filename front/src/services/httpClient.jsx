import axios from 'axios';

const httpClient = axios.create({
    baseURL: "https://localhost:44350/",
    headers: {
        "Content-Type": "application/json",
    }
});

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if(token)
    {
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
}, function(error){
    // Do something with request error
    return Promise.reject(error)
})

const services = {
    CreateToken: (login,password) => httpClient.get(`/login?login=${login}&password=${password}`)
}

export default services;