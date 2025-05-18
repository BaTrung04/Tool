import axiosInstance from "../lib/axiosBaseApi";
import { ILogin } from "../types/user";
const auth = () => {
  return {
    login: async (params: ILogin) => {
      const response = await axiosInstance.post(`/auth/login`, params);
      return response.data.data;
    },

    logout: async () => {
      const response = await axiosInstance.get(`/auth/logout`);
      return response.data.data;
    },
    register: async (params: any) => {
      const response = await axiosInstance.post(`/auth/register`, params);
      return response.data.data;
    },
    refreshToken: async () => {
      const response = await axiosInstance.post(`/auth/refresh-token`);
      return response.data.data;
    },
    getDevice: async () => {
      const response = await axiosInstance.get(`/auth/device`);
      return response.data.data;
    },
    getCheckDevice: async () => {
      const response = await axiosInstance.get(`/auth/check-device`);
      return response.data.data;
    },
  };
};

export default auth;
