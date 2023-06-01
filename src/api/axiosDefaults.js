import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://melo-api.herokuapp.com/";
// axios.defaults.baseURL = "https://8000-dodrums-portfolioprojec-9uryu6isvo4.ws-eu98.gitpod.io/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
