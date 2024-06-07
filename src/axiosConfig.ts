import axios, {AxiosInstance} from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 1000,
});

export default axiosInstance;