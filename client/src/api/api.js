// client/src/api/api.js
import axios from 'axios';

// Create a new 'instance' of axios
const api = axios.create({
  // This is the base URL of your backend server
  baseURL: 'https://fullstack-blog-api-ix0o.onrender.com/api', 
});

/*
  This is the magic part.
  'Interceptors' let us run code before a request is sent.
  Here, we're checking if we have a token in localStorage.
  If we do, we add it to the 'Authorization' header.
*/
api.interceptors.request.use(
  (config) => {
    // 1. Get the user object from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      // 2. If user and token exist, add it to the header
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;