
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
   'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for authentication and storing token in localStorage
  }
});
export default axiosInstance;
