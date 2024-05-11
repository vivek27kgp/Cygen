
import axios from 'axios';
const axiosInstancefile = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});
export default axiosInstancefile;
