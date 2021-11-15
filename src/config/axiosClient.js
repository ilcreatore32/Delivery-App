import axios from "axios";

// const auth = localStorage.getItem("token")
//   ? JSON.parse(localStorage.getItem("token"))
//   : null;

const Api = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyODA0NDI0NCwicGVybWlzc2lvbiI6IkEifSwiaWF0IjoxNjM2OTQzMjM1LCJleHAiOjE2MzY5NDY4MzV9.SfW-spkbu3x7790ta_FrlntPBjlo7IyumuW5tDvlJA0",
  },
});

export default Api;
