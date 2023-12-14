import { instance } from "./instanceAxios"

export const createChanelApi = ({ name, description }) => {
  return instance.post("/chanel/create", {
    name,
    description,
  });
};
