import { instance } from "./instanceAxios";

export const createPostApi = (data) => {
  return instance.post("/post/create", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
