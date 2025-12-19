import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://vital-flow-backend-khaki.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
