import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosClient.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosClient;
