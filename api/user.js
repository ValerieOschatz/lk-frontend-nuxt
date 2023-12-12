import { instance } from "./instanceAxios"

export const getUserListApi = ({ name }) =>
  instance.get("/user/list", {
    params: {
      name,
    },
  }
);

export const getUserCardApi = ({ userId }) =>
  instance.get("/user/card", {
    params: {
      userId,
    },
  }
);
