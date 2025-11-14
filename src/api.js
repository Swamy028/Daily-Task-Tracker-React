import axios from 'axios'

export const api=axios.create({
  //baseURL:'http://localhost:4000/api'
  baseURL:'https://daily-task-tracker-558y.onrender.com/api'
})



// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data.msg === 'jwt expired') {
      // Token expired or invalid
      localStorage.removeItem("token");

      // Optionally clear user in context
      // You can emit an event or use a callback

      window.location.href = "/login"; // Logout automatically
    }

    return Promise.reject(error);
  }
);
