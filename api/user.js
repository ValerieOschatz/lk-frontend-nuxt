import { instance } from "./instanceAxios"

export const getUserListApi = ({ name }) =>
  instance.get("/user/list", {
    params: {
      name,
    },
  }
);
