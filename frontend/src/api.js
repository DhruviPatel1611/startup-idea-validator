import axios from "axios"

const API = axios.create({
    baseURL : "https://startup-idea-validator-pke2.onrender.com/ ",
    // baseURL : "http://127.0.0.1:5000/",
})

// Attach token automatically
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token")
    if(token){
        req.headers.Authorization = token
    }
    return req
})
export default API