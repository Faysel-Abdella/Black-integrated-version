import axios from "axios";
const customFetch = axios.create({
  baseURL: "http://3.35.139.125:3000/",
});

export default customFetch;
