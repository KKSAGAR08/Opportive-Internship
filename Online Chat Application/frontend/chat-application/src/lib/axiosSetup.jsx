import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://opportive-internship.onrender.com",
    withCredentials:true
})