import { instance } from "./instanceAxios";

export const createPostApi = (data) => {
  return instance.post("/post/create", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getPostListApi = ({ owner, ownerChanel }) =>
  instance.get("/post/list", {
    params: {
      owner,
      ownerChanel,
    },
  }
);