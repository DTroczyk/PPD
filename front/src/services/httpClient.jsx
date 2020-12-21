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
    RegisterUser: (user) => httpClient.post('/register', user),
    CreateToken: (login,password) => httpClient.get(`/login?login=${login}&password=${password}`),
    GetParcels: () => httpClient.get(`/stork`),
    GetPigeonParcels: () => httpClient.get(`/pigeon/parcels`),
    SetStatus: (status) => httpClient.put(`/pigeon/setStatus`, status),
    GetStatuses: () => httpClient.get(`/pigeon/getStatus`),
    SendParcel: (parcel) => httpClient.post('/sparrow/SendParcel', parcel),
    GetParcelsTypes: ()=> httpClient.get('/sparrow/GetParcelTypes'),
    GetPigeons: () => httpClient.get(`/stork/GetPigeons`),
    SetPigeon: (pigeon) => httpClient.put('/stork/setpigeon', pigeon),
    GetWarehouses: () => httpClient.get(`/stork/GetWarehouses`),
    GetSparrow: () =>httpClient.get('/sparrow/GetSparrow'),
    FollowParcel: (id) => httpClient.get(`/sparrow/FollowParcel/${id}`),
    GetSparrowParcels: () => httpClient.get('/sparrow/GetParcels')
}

export default services;