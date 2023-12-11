import { instance } from "./instanceAxios";

export const getCommentListApi = ({ post }) =>
  instance.get("/comment/list", {
    params: {
      post,
    }
  }
);

export const createCommentApi = ({ post, text }) => {
  return instance.post("/comment/create", {
    post,
    text,
  });
};

export const updateCommentApi = ({ commentId, text }) => {
  return instance.patch("/comment/update", {
    commentId,
    text,
  });
};

export const deleteCommentApi = ({ commentId }) => {
  return instance.delete("/comment/delete", {
    params: {
      commentId,
    }
  });
};

export const addLikeCommentApi = (commentId) => {
  return instance.put("/comment/like", {
    commentId,
  });
};

export const deleteLikeCommentApi = (commentId) => {
  return instance.delete("/comment/like", {
    params: {
      commentId,
    }
  });
};
