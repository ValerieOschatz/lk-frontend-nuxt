import { instance } from "./instanceAxios";

export const createCommentApi = ({ post, text }) => {
  return instance.post("/comment/create", {
    post,
    text,
  });
};

export const getCommentListApi = ({ post }) =>
  instance.get("/comment/list", {
    params: {
      post,
    },
  }
);
