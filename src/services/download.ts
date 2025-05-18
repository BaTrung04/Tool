import axiosInstance from "../lib/axiosBaseApi";
import { IGetInfo, IGetUser } from "../types/download";
const download = () => {
  return {
    getInfo: async (params: IGetInfo) => {
      const response = await axiosInstance.get(`/download/get-info`, {
        params,
      });
      return response.data.data;
    },
    getUser: async (params: IGetUser) => {
      const response = await axiosInstance.get(`/download/get-info`, {
        params,
      });
      return response.data.data;
    },
    postAll: async () => {
      const response = await axiosInstance.post(`/download/all`);
      return response.data.data;
    },
    getCancelJob: async (id: string) => {
      const response = await axiosInstance.get(`/download/cancel`, {
        params: { job_id: id },
      });
      return response.data.data;
    },
  };
};

export default download;
